const WebSocket = require('ws');
const Speaker = require('speaker');
let channel1Buffer = []
let channel2Buffer = []

function writeToSpeaker(buffer, speaker){
  if (buffer.length > 0){
    const chunk = buffer.shift();
    speaker.write(chunk);
  }else{
    const silence = Buffer.alloc(4096);
    speaker.write(silence)
  }
}

// Channel 1 Server
const wssChannel1 = new WebSocket.Server({ port: 8081 });

// Channel 2 Server
const wssChannel2 = new WebSocket.Server({ port: 8082 });

// Speaker for Channel 1 playback
const speakerChannel1 = new Speaker({
  channels: 1,        // Mono
  bitDepth: 16,       // 16-bit PCM
  sampleRate: process.env.SAMPLE_RATE,  // Sampling rate
});

// Speaker for Channel 2 playback
const speakerChannel2 = new Speaker({
  channels: 1,        // Mono
  bitDepth: 16,
  sampleRate: process.env.SAMPLE_RATE,
});

// Handle connections on Channel 1
wssChannel1.on('connection', (ws) => {
  console.log('Channel 1: Client connected');
  
  ws.on('message', (data) => {
    // Play back audio on Channel 1
    channel1Buffer.push(data);
  });

  ws.on('close', () => {
    console.log('Channel 1: Client disconnected');
  });
  setInterval(() => writeToSpeaker(channel1Buffer, speakerChannel1), 20);
});

// Handle connections on Channel 2
wssChannel2.on('connection', (ws) => {
  console.log('Channel 2: Client connected');
  
  ws.on('message', (data) => {
    // Play back audio on Channel 2
    channel2Buffer.push(data);
  });

  ws.on('close', () => {
    console.log('Channel 2: Client disconnected');
  });
  setInterval(() => writeToSpeaker(channel2Buffer, speakerChannel2), 20);
});

console.log('Server running: Channel 1 on ws://localhost:8081, Channel 2 on ws://localhost:8082');
