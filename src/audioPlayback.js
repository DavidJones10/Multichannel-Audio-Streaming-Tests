const WebSocket = require('ws');
const Speaker = require('speaker');

function start() {
  // Channel 1
  const wsChannel1 = new WebSocket(process.env.CHANNEL1_SERVER);
  wsChannel1.on('message', (data) => {
    const speaker1 = new Speaker({
      channels: 1,
      sampleRate: SAMPLE_RATE,
      //device: process.env.CHANNEL1_OUTPUT_DEVICE,
    });
    speaker1.write(data);
  });

  // Channel 2
  const wsChannel2 = new WebSocket(process.env.CHANNEL2_SERVER);
  wsChannel2.on('message', (data) => {
    const speaker2 = new Speaker({
      channels: 1,
      sampleRate: SAMPLE_RATE,
      //device: process.env.CHANNEL2_OUTPUT_DEVICE,
    });
    speaker2.write(data);
  });
}

module.exports = { start };
