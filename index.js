const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.sockets.on('connection', (socket) => {
    console.log('Успешное соединение');
    connections.push(socket);

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Отключились');
    });

    socket.on('send msg', (data) => {
        io.sockets.emit('add msg', { msg: data });
    });
});