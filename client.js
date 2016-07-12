var ws = new WebSocket('ws://localhost:3000', 'echo-protocol');

function sendMessage() {
	var message = document.getElementById('message').value;
	ws.send(message);
}

ws.addEventListener('message', function(e) {
	//the data is simply the message that we're sending back
	var msg = e.data;
	console.log(msg);

	//append the message
	document.getElementById('chatlog').innerHTML += '<br>' + msg;
})