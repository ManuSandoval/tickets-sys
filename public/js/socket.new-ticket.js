var socket = io();
var ticketLabel = $("#lblNuevoTicket"); //use # for direct reference

socket.on("connect", function () {
  console.log("Connected to the server");
});

socket.on("disconnect", function () {
  console.log("Server connection lost");
});

socket.on("currentTicket", function (currentTicket) {
  ticketLabel.text(`Ticket: ${currentTicket.ticket}`);
});

$("button").on("click", function () {
  socket.emit("nextTicket", function (nextTicket) {
    ticketLabel.text(`Ticket: ${nextTicket}`);
  });
});
