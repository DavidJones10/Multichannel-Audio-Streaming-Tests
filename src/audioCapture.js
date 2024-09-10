const Microphone = require('node-microphone');
const WebSocket = require('ws');

function start() {
  const mic = new Microphone();

  // Channel 1
  const channel1Input = mic.startRecording();
  //const channel1Input = mic.startRecording({ device: process.env.CHANNEL1_INPUT_DEVICE });
  const wsChannel1 = new WebSocket(process.env.CHANNEL1_SERVER);
  
  wsChannel1.on('open', () => {
    channel1Input.on('data', (data) => {
      wsChannel1.send(data);
    });
  });

  // Channel 2

  //const channel2Input = mic.startRecording({ device: process.env.CHANNEL2_INPUT_DEVICE });
  const wsChannel2 = new WebSocket(process.env.CHANNEL2_SERVER);

  wsChannel2.on('open', () => {
    channel1Input.on('data', (data) => {//channel2Input
      wsChannel2.send(data);
    });
  });
}

module.exports = { start };