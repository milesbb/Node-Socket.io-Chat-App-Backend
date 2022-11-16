import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initialConnectionHandler } from "./socket/index.js";

const eServer = express();

const port = 3001;

const hServer = createServer(eServer);

const io = new Server(hServer);

io.on("connection", initialConnectionHandler);

hServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
