var mraa = require('mraa');

// Map GPIO block pins to MRAA pin numbers
// Reference: https://learn.sparkfun.com/tutorials/installing-libmraa-on-ubilinux-for-edison
var pins = {
  GP44: 31,
  GP45: 45,
  GP46: 32,
  GP47: 46
};

// Initialize LED controls
var leds = {
  R: new mraa.Gpio(pins['GP45']),
  G: new mraa.Gpio(pins['GP44']),
  B: new mraa.Gpio(pins['GP47']),
  Y: new mraa.Gpio(pins['GP46'])
};

// Set direction of LED controls to out
for(var color in leds) {
  leds[color].dir(mraa.DIR_OUT);
}

function toggleLed(led, state) {
  led.write(state ? 1 : 0);
}

function toggleLeds(leds, state) {
  for(var color in leds) {
    leds[color].write(state ? 1 : 0);
  }
}

// WebSocket communications
module.exports = function (socket) {
  socket.on('red', function(data) {
    toggleLed(leds['R'], data.state);
  });

  socket.on('green', function(data) {
    toggleLed(leds['G'], data.state);
  });

  socket.on('blue', function(data) {
    toggleLed(leds['B'], data.state);
  });

  socket.on('yellow', function(data) {
    toggleLed(leds['Y'], data.state);
  });

  // Handle Ctrl+C event
  process.on('SIGINT', function() {
    toggleLeds(leds, false);
    socket.disconnect();
    process.exit();
  });
};
