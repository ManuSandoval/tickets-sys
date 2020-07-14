//var works in all the navigators, same for the function(){}
var socket = io();

//the on() is for listening
socket.on("connect", function () {
  console.log("Connected to the Server");
});

socket.on("disconnect", function () {
  console.log("Disconnect to the Server");
});

//emit() is for send information
socket.emit(
  //con socket.broadcast.emit() hago broadcast
  "sendMessage",
  {
    name: "Roberto",
    message: "Galan",
  },
  function (res) {
    console.log(res);
  }
);
//listening for information "sendMessage"
socket.on("sendMessage", function (data) {
  console.log(`Server:`, data);
});
