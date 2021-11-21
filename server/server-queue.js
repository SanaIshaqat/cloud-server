'use strict'

const PORT = 3000;

const supportCenter = require('socket.io')(PORT);

const messageQueue = {
    openTickets: {},
    closedTickets: {}
}

supportCenter.on('connection', (socket) => {

    socket.on('openTickets', payLoad => {
        if (payLoad.company === 'KareemBox') {
            messageQueue.openTickets[payLoad.orderId] = payLoad;
            console.log({
                event: 'openTickets from KareemBox company',
                payLoad: payLoad.orderId
            });
            supportCenter.emit(`openTicketsKareemBox`, payLoad)
        } else {
            messageQueue.openTickets[payLoad.orderId] = payLoad;
            console.log({
                event: 'openTickets from Talabat company',
                payLoad: payLoad.orderId
            });
            supportCenter.emit(`openTicketsTalabat`, payLoad)
        }
    })

    socket.on('receivedOpenTicket', payLoad => {
        console.log('Open Ticket Saved in queue until worker confirms receiving it', messageQueue.openTickets[payLoad.orderId].orderId);
        delete messageQueue.openTickets[payLoad.orderId]
        console.log('Open Ticket received and is being processed by workers, and is Now Deleted from queue', messageQueue.openTickets[payLoad.orderId]);
    })

    socket.on('closedTicketTalabat', payLoad => {
        messageQueue.closedTickets[payLoad.orderId] = payLoad;
        console.log({
            event: 'closed Tickets from Talabat',
            payLoad: payLoad.orderId
        });
        supportCenter.emit('closedTicketTalabat', payLoad);
    })

    socket.on('closedTicketKareemBox', payLoad => {
        messageQueue.closedTickets[payLoad.orderId] = payLoad;
        console.log({
            event: 'closed Tickets from KareemBox',
            payLoad: payLoad.orderId
        });
        supportCenter.emit('closedTicketKareemBox', payLoad);
    })

    socket.on('closedTicketTalabatReceived', payLoad => {
        console.log('closed ticket list ++++++++', messageQueue.closedTickets[payLoad.orderId].orderId);
        Object.keys(messageQueue.closedTickets).forEach(id => {
            console.log(`${messageQueue.closedTickets[id].orderId} ${messageQueue.closedTickets[id].company}`);
        })
    })

    socket.on('closedTicketKareemBoxReceived', payLoad => {
        console.log('closed ticket list ++++++++', messageQueue.closedTickets[payLoad.orderId].orderId);
        Object.keys(messageQueue.closedTickets).forEach(id => {
            console.log(`${messageQueue.closedTickets[id].orderId} ${messageQueue.closedTickets[id].company}`);
        })
    })

    socket.on('getAll', ()=>{
        Object.keys(messageQueue.openTickets).forEach(id =>{
            if (messageQueue.openTickets[id].company === 'Talabat') {                
                socket.emit('openTicketsTalabat', messageQueue.openTickets[id] )
            }else {
                socket.emit('openTicketsKareemBox', messageQueue.openTickets[id] )
            }
        })
    })

})