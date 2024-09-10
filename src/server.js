const WebSocket = require('ws');
const Speaker = require('speaker');

// Channel 1 Server
const wssChannel1 = new WebSocket.Server({ port: 8081 });

// Channel 2 Server
const wssChannel2 = new WebSocket.Server({ port: 8082 });

// Speaker for Channel 1 playback
const speakerChannel1 = new Speaker({
  channels: 1,        // Mono
  bitDepth: 16,       // 16-bit PCM
  sampleRate: 16000,  // Sampling rate
});

// Speaker for Channel 2 playback
const speakerChannel2 = new Speaker({
  channels: 1,        // Mono
  bitDepth: 16,
  sampleRate: 16000,
});

// Handle connections on Channel 1
wssChannel1.on('connection', (ws) => {
  console.log('Channel 1: Client connected');
  
  ws.on('message', (data) => {
    // Play back audio on Channel 1
    speakerChannel1.write(data);
  });

  ws.on('close', () => {
    console.log('Channel 1: Client disconnected');
  });
});

// Handle connections on Channel 2
wssChannel2.on('connection', (ws) => {
  console.log('Channel 2: Client connected');
  
  ws.on('message', (data) => {
    // Play back audio on Channel 2
    speakerChannel2.write(data);
  });

  ws.on('close', () => {
    console.log('Channel 2: Client disconnected');
  });
});

console.log('Server running: Channel 1 on ws://localhost:8081, Channel 2 on ws://localhost:8082');
