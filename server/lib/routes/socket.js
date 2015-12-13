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
  red: new mraa.Gpio(pins['GP45']),
  green: new mraa.Gpio(pins['GP44']),
  blue: new mraa.Gpio(pins['GP47']),
  yellow: new mraa.Gpio(pins['GP46'])
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

function printLedState(color, state) {
  console.log('color: ' + color + ', state: ' + state);
}

// WebSocket communications
module.exports = function (socket) {
  socket.on('hello', function() {
    console.log('hello');

    var data = {};
    for(var color in leds) {
      data[color] = leds[color].read() == 1 ? true : false;
    }

    console.log(data);
    socket.emit('init', data);
  });

  socket.on('red', function(data) {
    toggleLed(leds['red'], data.state);
    printLedState('red', data.state);

    socket.broadcast.emit('red', data);
  });

  socket.on('green', function(data) {
    toggleLed(leds['green'], data.state);
    printLedState('green', data.state);

    socket.broadcast.emit('green', data);
  });

  socket.on('blue', function(data) {
    toggleLed(leds['blue'], data.state);
    printLedState('blue', data.state);

    socket.broadcast.emit('blue', data);
  });

  socket.on('yellow', function(data) {
    toggleLed(leds['yellow'], data.state);
    printLedState('yellow', data.state);

    socket.broadcast.emit('yellow', data);
  });

  // Handle Ctrl+C event
  process.on('SIGINT', function() {
    toggleLeds(leds, false);
    socket.disconnect();
    process.exit();
  });
};
