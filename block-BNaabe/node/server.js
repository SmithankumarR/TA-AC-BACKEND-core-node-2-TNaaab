// #### Path
var http = require('http');
var fs = require('fs');
var Path = require('path');

function handleRequest(req, res) {
    let currentPath = (__filename );
    console.log(currentPath);

    let abPath = (__dirname + '/app.js');
    console.log(JSON.stringify(abPath));

    fs.createReadStream('../node/index.html').pipe(res);

    var indexPath = Path.join(__dirname,  '/index.html');
    console.log(indexPath);
}

var server = http.createServer(handleRequest);
server.listen(4559, () => {
    console.log('listening on port 4559');
})


