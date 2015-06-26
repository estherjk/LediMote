// MODIFY THIS WITH THE APPROPRIATE URL
var socket = io.connect('http://myedison.local:8080');

// Checkbox elements
var checkboxes = {
  R: $('#checkbox-red'),
  G: $('#checkbox-green'),
  B: $('#checkbox-blue'),
  Y: $('#checkbox-yellow')
}

// Use Bootstrap Switch to style checkboxes
for(var color in checkboxes) {
  checkboxes[color].bootstrapSwitch();
}

/// Send state of checkboxes to server via WebSockets

checkboxes['R'].on('switchChange.bootstrapSwitch', function(event, state) {
  socket.emit('red', { state: state });
});

checkboxes['G'].on('switchChange.bootstrapSwitch', function(event, state) {
  socket.emit('green', { state: state });
});


checkboxes['B'].on('switchChange.bootstrapSwitch', function(event, state) {
  socket.emit('blue', { state: state });
});


checkboxes['Y'].on('switchChange.bootstrapSwitch', function(event, state) {
  socket.emit('yellow', { state: state });
});
