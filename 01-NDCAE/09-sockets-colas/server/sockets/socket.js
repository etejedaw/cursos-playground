const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('siguienteTicket', (data, callback) => {
        let nextTicket = ticketControl.nextTicket();
        console.log(nextTicket);
        callback(nextTicket);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getLastTicket(),
        lastFour: ticketControl.getlastFour()
    });

    client.on('attendTicket', (data, callback) => {
        if(!data.desktop) return callback({ok: false});
        let attendTicket = ticketControl.attendTicket(data.desktop);
        callback(attendTicket);
        client.broadcast.emit('lastFour', {
            lastFour: ticketControl.getlastFour()
        });
    });

});