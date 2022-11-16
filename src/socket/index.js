let onlineUsers = [];

export const initialConnectionHandler = (client) => {
  client.emit("welcome", { message: `Welcome to the chat ${client.id}!` });

  client.on("setUsername", (payload) => {
    let userIndex = onlineUsers.findIndex(
      (user) =>
        user.socketId === client.id || user.username === payload.username
    );
    if (userIndex === -1) {
      onlineUsers.push({ username: payload.username, socketId: client.id });
      client.emit("loggedIn", onlineUsers);
      client.broadcast.emit("newConnection", onlineUsers);
    }
  });

  client.on("sendMessage", (message) => {
    client.broadcast.emit("sentMessage", message);
  });

  client.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => client.id !== user.socketId);
    client.broadcast.emit("newConnection", onlineUsers);
  });
};
