const onlineUsers = new Map();

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    // User comes online
    socket.on('userOnline', (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit('onlineUsers', Array.from(onlineUsers.keys()));
    });

    // Join conversation room
    socket.on('joinConversation', (conversationId) => {
      socket.join(conversationId);
    });

    // Send message (real-time)
    socket.on('sendMessage', (data) => {
      // data: { conversationId, message }
      socket.to(data.conversationId).emit('newMessage', data.message);
    });

    // Deal proposal response
    socket.on('dealResponse', (data) => {
      // data: { conversationId, status, message }
      socket.to(data.conversationId).emit('dealUpdated', data);
    });

    // Typing indicator
    socket.on('typing', (data) => {
      socket.to(data.conversationId).emit('userTyping', { userId: data.userId });
    });

    socket.on('stopTyping', (data) => {
      socket.to(data.conversationId).emit('userStoppedTyping', { userId: data.userId });
    });

    // Disconnect
    socket.on('disconnect', () => {
      onlineUsers.forEach((socketId, userId) => {
        if (socketId === socket.id) onlineUsers.delete(userId);
      });
      io.emit('onlineUsers', Array.from(onlineUsers.keys()));
      console.log(`❌ Socket disconnected: ${socket.id}`);
    });
  });
};
