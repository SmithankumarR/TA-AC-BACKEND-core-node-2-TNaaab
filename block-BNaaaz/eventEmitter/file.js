var http = require('http');
var port = 4000;
var fs = require('fs');

function handleRequest(req, res) {
    // console.log(__dirname)
    fs.createReadStream(__dirname + '/readme.txt').pipe(res);
}
var server = http.createServer(handleRequest);

server.listen(port);