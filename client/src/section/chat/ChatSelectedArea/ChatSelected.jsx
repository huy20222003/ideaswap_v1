// components/ChatSelected.js
import { Box } from '@mui/material';
import { useEffect, useCallback, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import {
  useConversation,
  useAuth,
  useMessage,
  useSocket,
} from '../../../hooks/context';
import ChatHeader from './ChatHeader';
import EmojiPicker from './EmojiPicker';
import MessageInput from './MessageInput';
import ChatArea from './ChatArea';

//-----------------------------------------------

const ChatSelected = () => {
  const { t } = useTranslation(['chat']);
  const {
    authState: { user },
  } = useAuth();
  const { _id } = useParams();
  const {
    conversationState: { conversation },
    handleGetOneConversations,
  } = useConversation();
  const { socket, onlineUsers } = useSocket();
  const {
    messageState: { messages },
    handleGetMessageByConversationId,
  } = useMessage();

  const [loading, setLoading] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageType, setMessageType] = useState('text');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  const messagesEndRef = useRef(null);

  const fetchConversation = useCallback(async () => {
    await handleGetOneConversations(_id);
  }, [_id, handleGetOneConversations]);

  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  const memoizedHandleGetMessageByConversationId = useCallback(async () => {
    if (conversation?._id) {
      await handleGetMessageByConversationId(conversation._id);
    }
  }, [handleGetMessageByConversationId, conversation?._id]);

  useEffect(() => {
    memoizedHandleGetMessageByConversationId();
  }, [memoizedHandleGetMessageByConversationId]);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (!socket || !conversation?._id) return;

    socket.emit('joinConversation', conversation._id);

    const handleMessageReceived = (message) => {
      setLocalMessages((prevMessages) => [...prevMessages, message]);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    socket.on('message', handleMessageReceived);

    return () => {
      socket.off('message', handleMessageReceived);
    };
  }, [socket, conversation?._id]);

  const isUserOnline = (userId) => onlineUsers.includes(userId);

  const otherMember = conversation?.members?.find(
    (member) => member?._id !== user?._id
  );

  const validationSchema = yup.object({
    message: yup.string().when('messageType', {
      is: 'text',
      then: yup.string().required(t('Required')),
    }),
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        if (socket && conversation?._id) {
          const content = messageType === 'text' ? values.message : imageBase64;
          socket.emit('sendMessage', {
            conversationID: conversation._id,
            content,
            type: messageType,
          });
        }
        resetForm();
        setMessageType('text');
        setImageBase64(null);
        setSelectedImage(null); // Clear the selected image after sending
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleToggleEmojiPicker = (event) => {
    setShowEmojiPicker((prevState) => !prevState);
    setAnchorEl(event.currentTarget);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setMessageType('file');
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <ChatHeader otherMember={otherMember} isUserOnline={isUserOnline} />
      <EmojiPicker
        open={showEmojiPicker}
        anchorEl={anchorEl}
        onClose={() => setShowEmojiPicker(false)}
        onEmojiSelect={(e) =>
          formik.setFieldValue('message', formik.values.message + e.native)
        }
      />
      <ChatArea localMessages={localMessages} user={user} conversation={conversation} />
      <MessageInput
        formik={formik}
        handleToggleEmojiPicker={handleToggleEmojiPicker}
        handleImageChange={handleImageChange}
        selectedImage={selectedImage}
        imageBase64={imageBase64}
        setSelectedImage={setSelectedImage}
        setImageBase64={setImageBase64}
        setMessageType={setMessageType}
        loading={loading}
      />
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatSelected;
