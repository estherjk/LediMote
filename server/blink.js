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

/// Blink LEDs on and off every 1 second

var state = true;

function blink() {
  toggleLeds(leds, state);
  state = !state;
  setTimeout(blink, 1000);
}

function toggleLeds(leds, state) {
  for(var color in leds) {
    leds[color].write(state ? 1: 0);
  }
}

// Call blink
blink();

// Handle Ctrl+C event
process.on('SIGINT', function() {
  toggleLeds(leds, false);
  process.exit();
});
