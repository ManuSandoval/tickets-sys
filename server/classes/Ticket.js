const fs = require("fs");

class Ticket {
  constructor(number, box) {
    this.number = number;
    this.box = box;
  }
}

class TicketControl {
  constructor() {
    this.currentTicket = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.last4Tickets = [];
    let data = require("../data/data.json");
    //if it is not a new day => reset the ticket counter
    if (this.today === data.today) {
      this.currentTicket = data.currentTicket || 0;
      this.tickets = data.tickets;
      this.last4Tickets = data.last4Tickets;
    } else {
      this.resetTicketsCounter();
    }
  }
  resetTicketsCounter() {
    this.currentTicket = 0;
    this.tickets = [];
    this.last4Tickets = [];
    console.log("System has been initialized");
    this.saveData();
  }

  nextTicket() {
    this.currentTicket += 1;
    let newTicket = new Ticket(this.currentTicket, null);
    this.tickets.push(newTicket);
    this.saveData();
    return this.currentTicket;
  }

  attendTicket(box) {
    if (this.tickets.length === 0) return `No tickets left`;

    //copy the ticket before deleting it
    this.tickets[0].box = box;
    let attendingTicket = Object.assign(new Ticket(), this.tickets[0]);

    this.tickets.shift(); //drop the first element because it will be attended

    this.last4Tickets.unshift(attendingTicket); //insert the element at the start

    if (this.last4Tickets.length > 4) {
      //Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
      this.last4Tickets.splice(-1, 1); //drop the last element
    }
    this.saveData();
    return attendingTicket;
  }

  getCurrentTicket() {
    return this.currentTicket;
  }

  getLast4Tickets() {
    return this.last4Tickets;
  }

  saveData() {
    let jsonData = {
      currentTicket: this.currentTicket,
      today: this.today,
      tickets: this.tickets,
      last4Tickets: this.last4Tickets,
    };
    let jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = { TicketControl };
