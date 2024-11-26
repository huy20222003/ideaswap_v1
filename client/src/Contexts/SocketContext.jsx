import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../hooks/context';

// const SOCKET_ENDPOINT = 'https://ideaswap-server.onrender.com'; // Socket.IO server URL
const SOCKET_ENDPOINT = 'http://localhost:3000'; // Socket.IO server URL

export const SocketContext = createContext();

export const SocketProvider = (prop) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useAuth().authState;

  useEffect(() => {
    if (user) {
      // Tạo socket client và cấu hình CORS
      const socketIo = io(SOCKET_ENDPOINT, {
        transports: ['websocket'], // Chỉ sử dụng transport websocket để tránh vấn đề CORS
        withCredentials: true, // Gửi cookies khi cần thiết
        extraHeaders: {
          'Access-Control-Allow-Origin': window.location.origin, // Thiết lập origin tại client side
        },
        query: { userId: user._id },
      });

      // Lắng nghe sự kiện từ server trả về danh sách người dùng online
      socketIo.on('onlineUsers', (users) => {
        setOnlineUsers(users);
      });

      setSocket(socketIo);

      // Cleanup function khi component bị unmount để ngắt kết nối
      return () => {
        socketIo.disconnect();
      };
    }
  }, [user]);

  const socketData = {
    socket,
    onlineUsers,
  };

  return (
    <SocketContext.Provider value={socketData}>
      {prop.children}
    </SocketContext.Provider>
  );
};
