const express = require("express");
const socketIO = require("socket.io");
//socket doesn't work with express, but it works with http server integrated in node
const http = require("http");

const path = require("path");

const app = express();
//since express, behind, uses http commands, and since the instructions are so similar,
//it can be passed to the http for create the server
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//initialize the socket. Is the backend communication
module.exports.io = socketIO(server);
require("./sockets/socket");

server.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Server on port ${port}`);
});
