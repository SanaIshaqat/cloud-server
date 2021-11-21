'use strict'


const faker = require('faker')
const io = require('socket.io-client');
const host = 'http://localhost:3000';
const supportConnection = io.connect(host);

supportConnection.on('closedTicketKareemBox', payLoad => {
console.log(`Thank you for your patience your problem is solved ${payLoad.orderId} `);
supportConnection.emit('closedTicketKareemBoxReceived', payLoad)
})

setInterval(() => {
    let request =
    {
        company: 'KareemBox',
        orderId: faker.datatype.uuid(),
        customer: faker.name.findName(),
        description: faker.commerce.productDescription(),
        contactInfo: faker.phone.phoneNumber(),
        time: new Date().toLocaleString()
    };
    console.log('Ticket is Opened: I have A problem To Be Solved');
    supportConnection.emit('openTickets', request);

}, 10000);