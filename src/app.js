require('dotenv').config();
const capture = require('./audioCapture');
const playback = require('./audioPlayback');

// Start capturing audio from different channels and send to servers
capture.start();

// Start receiving audio and playback on corresponding channels
playback.start();

// Optionally, start headless Chromium for WebRTC handling
//require('./chromium');
process.stdin.resume(); 