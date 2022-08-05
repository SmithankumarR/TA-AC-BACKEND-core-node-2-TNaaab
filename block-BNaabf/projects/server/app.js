console.log('./index.js');
console.log(__dirname, './index.js');

// #### server
// Create a basic http server which should grab data from a HTML form rendered on a specific route and display the content on a seperate page.

var http = require('http');
var qs = require('querystring');
// var fs = require('fs');


function hr_1(req,res) {
    if(req.method === 'GET' && req.url === '/form'){
        var store = '';
        req.on('data', (chunk) => {
         store = store + chunk;
        })
    }
    if(req.method === 'POST' && req.url === '/form'){
        req.on('end', () => {
            res.writeHead(200,{"content-type": "application/x-www-form-urlencoded"});    
            let formData = qs.parse(store);
            res.end(formData);
        })
        // fs.createWriteStream('./form.html');
    }
}

var server = http.createServer(hr_1);
server.listen(5678, () => {
    console.log('server listening on port 5678');
})