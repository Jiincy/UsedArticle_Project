const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`);
        ws.send(`Server: ${message}`);
    });

    ws.send('Connected to WebSocket server');
});

console.log('WebSocket server is running on ws://localhost:8787');
