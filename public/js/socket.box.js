var socket = io();
var searchParams = new URLSearchParams(window.location.search);
var label = $("small");

socket.on("connect", function () {
  console.log("Connected to the server");
});

socket.on("disconnect", function () {
  console.log("Server connection lost");
});

if (!searchParams.has("box")) {
  window.location = "index.html";
  throw new Error("The box is necessary");
}

var box = searchParams.get("box");
$("h1").text("Box: " + box);

$("button").on("click", function () {
  socket.emit("attendTicket", { box }, function (res) {
    if (res === "No tickets left") {
      label.text(res);
      alert(res);
      return;
    }
    label.text(`Ticket ${res.number}`);
  });
});
