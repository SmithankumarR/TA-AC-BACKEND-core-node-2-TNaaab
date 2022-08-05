// Create a basic http server which should grab data from a HTML form rendered on a specific route and display the content on a seperate page.

var http = require('http');
var qs = require('querystring');
var fs = require('fs');

function hr_1(req, res) {
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    });

    req.on('end', () => {
        if (req.method === 'GET' && req.url === '/form') {
            res.writeHead(200, { 'content-type': 'text/html' });
            fs.createReadStream('./form.html').pipe(res);
        }
        if(req.method === 'POST' && req.url === '/form'){
            let formData = qs.parse(store);
            res.setHeader('Content-Type', 'text/html');
            res.write(`<h2>${formData.name}</h2>`);
            res.write(`<h3>${formData.email}</h3>`);
            res.write(`<p>${formData.age}</p>`);
            res.end();
        }
    });
}

var server = http.createServer(hr_1);
server.listen(5678, () => {
    console.log('server listening on port 5678');
});
