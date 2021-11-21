'use strict'


const faker = require('faker')
const io = require('socket.io-client');
const host = 'http://localhost:3000';
const supportConnection = io.connect(host);

supportConnection.on('closedTicketTalabat', payLoad => {
console.log(`Thank you for your patience your problem is solved ${payLoad.orderId} `);
supportConnection.emit('closedTicketTalabatReceived', payLoad)
})

setInterval(() => {
    let request =
    {
        company: 'Talabat',
        orderId: faker.datatype.uuid(),
        customer: faker.name.findName(),
        description: faker.commerce.productDescription(),
        contactInfo: faker.phone.phoneNumber(),
        time: new Date().toLocaleString()
    };

    console.log('Ticket is Opened: I have A problem To Be Solved');
    supportConnection.emit('openTickets', request);

}, 5000);