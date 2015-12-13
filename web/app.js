// MODIFY THIS WITH THE APPROPRIATE URL
var socket = io.connect('http://myedison.local:8080');

// Checkbox elements
var checkboxes = {
  red: $('#checkbox-red'),
  green: $('#checkbox-green'),
  blue: $('#checkbox-blue'),
  yellow: $('#checkbox-yellow')
}

// Use Bootstrap Switch to style checkboxes
for(var color in checkboxes) {
  checkboxes[color].bootstrapSwitch();
}

/// Send state of checkboxes to server via WebSockets

socket.on('connect', function() {
  socket.emit('hello');
});

socket.on('init', function(data) {
  for(var color in data) {
    checkboxes[color].bootstrapSwitch('state', data[color]);
  }
});

socket.on('red', function(data) {
  checkboxes['red'].bootstrapSwitch('state', data.state);
});

socket.on('green', function(data) {
  checkboxes['green'].bootstrapSwitch('state', data.state);
});

socket.on('blue', function(data) {
  checkboxes['blue'].bootstrapSwitch('state', data.state);
});

socket.on('yellow', function(data) {
  checkboxes['yellow'].bootstrapSwitch('state', data.state);
});

checkboxes['red'].on('switchChange.bootstrapSwitch', function(event, state) {
  socket.emit('red', { state: state });
});

checkboxes['green'].on('switchChange.bootstrapSwitch', function(event, state) {
  socket.emit('green', { state: state });
});

checkboxes['blue'].on('switchChange.bootstrapSwitch', function(event, state) {
  socket.emit('blue', { state: state });
});

checkboxes['yellow'].on('switchChange.bootstrapSwitch', function(event, state) {
  socket.emit('yellow', { state: state });
});
