const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--use-fake-ui-for-media-stream', '--no-sandbox'],
  });

  const page = await browser.newPage();

  // Example: Access a WebRTC server or app
  await page.goto(process.env.CHANNEL1_WEBRTC_URL);

  // Start WebRTC connection for channel 1
  await page.evaluate(() => {
    const peerConnection = new RTCPeerConnection();
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      peerConnection.addTrack(stream.getAudioTracks()[0]);
    });
  });

  // Handle WebRTC for channel 2 similarly if needed...
})();