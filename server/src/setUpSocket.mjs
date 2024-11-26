import { Server } from 'socket.io';
import Conversations from './app/models/Conversations.mjs';
import Users from './app/models/Users.mjs';
import Messages from './app/models/Messages.mjs';
import Notification from './app/models/Notifications.mjs';
import cloudinary from './config/cloudinary/index.mjs';

const setUpSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:5173',
        'https://ideaswap.netlify.app/dashboard/app',
      ],
      methods: ['GET', 'POST'],
    },
  });

  const userSocketMap = new Map();
  const userConversationMap = new Map(); // Map to store the current conversation of each user
  let onlineUsers = [];

  const disconnect = (socket) => {
    console.log(`User disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        onlineUsers = onlineUsers.filter((id) => id !== userId);
        userConversationMap.delete(userId);
        break;
      }
    }
    console.log('Online users:', onlineUsers);
    io.emit('onlineUsers', onlineUsers);
  };

  const getSocketIdByUserId = (userId) => {
    return userSocketMap.get(userId);
  };

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      if (!onlineUsers.includes(userId)) {
        userSocketMap.set(userId, socket.id);
        onlineUsers.push(userId);
        console.log(`A user connected: ${userId} with socketId: ${socket.id}`);
      } else {
        console.log(`User ${userId} is already online`);
      }

      console.log('Online users:', onlineUsers);
      io.emit('onlineUsers', onlineUsers);
    } else {
      console.log('ID not provided');
    }

    socket.on('joinConversation', (conversationId) => {
      const previousConversationId = userConversationMap.get(userId);
      if (previousConversationId) {
        socket.leave(previousConversationId);
        console.log(
          `User ${userId} left conversation: ${previousConversationId}`
        );
      }

      socket.join(conversationId);
      userConversationMap.set(userId, conversationId);
      console.log(`User ${userId} joined conversation: ${conversationId}`);
    });

    socket.on('sendMessage', async (data) => {
      try {
        const { conversationID, content, type } = data;
        const senderID = userId;

        let fileUrl = '';
        let messageContent = '';

        if (type === 'file') {
          const uploadResult = await cloudinary.uploader.upload(content, {
            upload_preset: process.env.UPLOAD_PRESET,
          });
          fileUrl = uploadResult.secure_url;
        }

        if (type === 'text') {
          messageContent = content;
        }

        const newMessage = new Messages({
          conversationID,
          content: type === 'text' ? messageContent : '',
          fileUrl: type === 'file' ? fileUrl : '',
          senderID,
          type,
        });
        await newMessage.save();

        const message = await Messages.findById(newMessage._id).populate({
          path: 'senderID',
          select: 'firstName lastName avatar',
        });
        if (!message) {
          throw new Error('Message not found after saving');
        }

        io.to(conversationID).emit('message', message);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    socket.on('updateConversationWallpaper', async (data) => {
      try {
        const { conversationId, wallpaperBase64 } = data;

        const uploadResult = await cloudinary.uploader.upload(wallpaperBase64, {
          upload_preset: process.env.UPLOAD_PRESET,
        });

        const wallpaperUrl = uploadResult.secure_url;

        const updatedConversation = await Conversations.findByIdAndUpdate(
          conversationId,
          { wallpaperUrl },
          { new: true }
        );

        if (!updatedConversation) {
          throw new Error('Conversation not found');
        }

        const updatedMembers = await Promise.all(
          updatedConversation.members.map(async (member) => {
            const userInfo = await Users.findById(member.userId, {
              _id: 1,
              firstName: 1,
              lastName: 1,
              username: 1,
              roleID: 1,
              avatar: 1,
              description: 1,
            }).lean();
            return {
              ...userInfo,
              nickName: member.nickName,
            };
          })
        );

        const lastMessage = await Messages.findOne({
          conversationID: updatedConversation._id,
        })
          .sort({ createdAt: -1 })
          .lean();

        const newConversation = {
          ...updatedConversation.toObject(),
          members: updatedMembers,
          lastMessage,
        };

        io.to(conversationId).emit(
          'conversationWallpaperUpdated',
          newConversation
        );
      } catch (error) {
        console.error('Error updating conversation wallpaper:', error);
      }
    });

    socket.on('sendNotification', async (data) => {
      const {
        description,
        imageUrl,
        userIDs,
        actorID,
        referenceType,
        referenceID,
      } = data;
      const newNotification = await Notification.create({
        description,
        imageUrl,
        userIDs,
        actorID,
        referenceType,
        referenceID,
      });

      await newNotification.save();

      // Send notification to all specified users
      userIDs.forEach((userId) => {
        const socketId = getSocketIdByUserId(userId);
        if (socketId) {
          io.to(socketId).emit('recivedNotification', newNotification);
        }
      });
    });

    socket.on('disconnect', () => disconnect(socket));
  });

  return io;
};

export default setUpSocket;
