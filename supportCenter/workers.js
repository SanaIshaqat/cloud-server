'use strict'

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const supportConnection = io.connect(host);

supportConnection.emit('getAll');


supportConnection.on(`openTicketsTalabat`, (payLoad) => {

    console.log(`Received openTicket from Talabat ${payLoad.orderId}`);
    supportConnection.emit('receivedOpenTicket', payLoad)
    
    setTimeout(() => {
        console.log(`Ticket is Closed From Talabat: Problem is Solved!: ${payLoad.orderId}`);
        supportConnection.emit('closedTicketTalabat', payLoad)
    }, 2000)

})

supportConnection.on(`openTicketsKareemBox`, (payLoad) => {

    console.log(`Received openTicket from KareemBox ${payLoad.orderId}`);
    supportConnection.emit('receivedOpenTicket', payLoad)    
    setTimeout(() => {
        console.log(`Ticket is Closed From KareemBox: Problem is Solved!: ${payLoad.orderId}`);
        supportConnection.emit('closedTicketKareemBox', payLoad)
    }, 2000)

})