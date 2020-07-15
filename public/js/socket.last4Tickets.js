var socket = io();

socket.on("last4Tickets", function (res) {
  try {
    $("#lblTicket1").text(`Ticket:   ${res.last4Tickets[0].number}`);
    $("#lblTicket2").text(`Ticket:   ${res.last4Tickets[1].number}`);
    $("#lblTicket3").text(`Ticket:   ${res.last4Tickets[2].number}`);
    $("#lblTicket4").text(`Ticket:   ${res.last4Tickets[3].number}`);
    $("#lblBox1").text(`Box:   ${res.last4Tickets[0].box}`);
    $("#lblBox2").text(`Box:   ${res.last4Tickets[1].box}`);
    $("#lblBox3").text(`Box:   ${res.last4Tickets[2].box}`);
    $("#lblBox4").text(`Box:   ${res.last4Tickets[2].box}`);
  } catch (error) {}
  var audio = new Audio("audio/new-ticket.mp3");
  audio.play();
});

socket.on("connect", function () {
  console.log("Connected to the server");
});

socket.on("disconnect", function () {
  console.log("Server connection lost");
});
