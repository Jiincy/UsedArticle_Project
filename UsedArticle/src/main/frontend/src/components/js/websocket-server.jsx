const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8787 });

wss.on('connection', (ws, req) => {
    const userId = req.url.split('/').pop();
    console.log(`User connected: ${userId}`);

    ws.on('message', (message) => {
        console.log(`Received message from ${userId}: ${message}`);
        ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
        console.log(`User disconnected: ${userId}`);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error}`);
    });
});


console.log('WebSocket server running on ws://localhost:8787');
