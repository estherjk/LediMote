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
