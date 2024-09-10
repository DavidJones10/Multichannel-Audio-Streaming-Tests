const WebSocket = require('ws');
const Microphone = require('node-microphone');

require('dotenv').config();

// Microphone setup for capturing audio from both channels
const mic = new Microphone({
  rate: 16000,   // Sampling rate
  channels: 2,   // 2 channels (stereo)
  device: process.env.INPUT_DEVICE,  // Device name from .env
});

// Channel 1 WebSocket client
const wsChannel1 = new WebSocket(process.env.CHANNEL1_SERVER);

// Channel 2 WebSocket client
const wsChannel2 = new WebSocket(process.env.CHANNEL2_SERVER);

// Start microphone stream
const micStream = mic.startRecording();

// Handle microphone audio data (assumes interleaved stereo)
micStream.on('data', (data) => {
  // Split data into two channels
  const channel1Data = [];
  const channel2Data = [];

  for (let i = 0; i < data.length; i += 4) {
    // Assuming 16-bit PCM, interleaved stereo
    channel1Data.push(data.readInt16LE(i));
    channel2Data.push(data.readInt16LE(i + 2));
  }

  // Send channel 1 data to server 1
  if (wsChannel1.readyState === WebSocket.OPEN) {
    wsChannel1.send(Buffer.from(new Int16Array(channel1Data).buffer));
  }

  // Send channel 2 data to server 2
  if (wsChannel2.readyState === WebSocket.OPEN) {
    wsChannel2.send(Buffer.from(new Int16Array(channel2Data).buffer));
  }
});

// Handle WebSocket errors
wsChannel1.on('error', (err) => console.error('Channel 1 Error:', err));
wsChannel2.on('error', (err) => console.error('Channel 2 Error:', err));
