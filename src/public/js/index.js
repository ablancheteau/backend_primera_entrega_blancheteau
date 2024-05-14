import { io } from "socket.io-client";
const socketClient = io();

socketClient.on('saludoDesdeBack', (message) => {
    console.log(message);
    socketClient.emit('respuestaDesdeFront', 'Muchas gracias');
});

socketClient.on('products', (arrayProducts) => {
    let infoProducts = '';
    arrayProducts.forEach((prod) => {
        infoProducts += `${prod.name} - $${prod.price} </br>`;
    });
    products.innerHTML = infoProducts;
});

socketClient.on('message', (message) => {
    console.log(message);
});
socketClient.on('message', (message) => {
    console.log(message);
});
