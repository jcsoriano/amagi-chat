var http = require('http');
var WebSocketServer = require('websocket').server;
var server = http.createServer(function(request, response) {});

var wsServer = new WebSocketServer({
	httpServer: server
})

server.listen(3000, function() {
	console.log((new Date()) + 'Server is listening on port 3000');
});

var clients = {};
var count = 0;

wsServer.on('request', function(r) {
	var connection = r.accept('echo-protocol', r.origin);

	//specific id for this client and increment count;
	var id = count++;

	//store the connection messagethod so we can loop through and contact all clients
	clients[id] = connection;

	console.log((new Date()) + 'Connection accepted [' + id + ']');

	connection.on('message', function(message) {
		//the string message that was sent ot us
		var msgString = message.utf8Data;

		//loop through all clients
		for(var i in clients) {
			//sends a message to the client with the message
			clients[i].sendUTF(msgString);
		}
	});

	connection.on('close', function(reasonCode, description) {
		delete clients[id];
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
	});
});
