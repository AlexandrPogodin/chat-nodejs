const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const port = 3000;

server.listen(port);
console.log(`Server has been started on localhost:${port}`);

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

users = [];
connections = [];

io.sockets.on("connection", socket => {
  console.log("Connect");
  connections.push(socket);

  socket.on("disconnect", data => {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnect");
  });

  socket.on("send msg", data => {
    io.sockets.emit("add msg", { name: data.name, msg: data.msg });
  });
});
