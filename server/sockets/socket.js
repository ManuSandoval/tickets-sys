const { io } = require("../server");

const { TicketControl } = require("../classes/Ticket");
let ticketControl = new TicketControl();

//to know when a client is connected to the server
io.on("connection", (client) => {
  client.on("nextTicket", (cb) => {
    let nextTicket = ticketControl.nextTicket();
    cb(nextTicket);
  });

  client.emit("currentTicket", { ticket: ticketControl.getCurrentTicket() });

  client.emit("last4Tickets", {
    last4Tickets: ticketControl.getLast4Tickets(),
  });

  client.on("attendTicket", (data, cb) => {
    if (!data.box)
      return cb({ error: true, message: "The box number is necessary" });
    let attendingTicket = ticketControl.attendTicket(data.box);
    cb(attendingTicket);
    client.broadcast.emit("last4Tickets", {
      last4Tickets: ticketControl.getLast4Tickets(),
    });
    //update the last4Tickets for all clients
  });
});
