var http = require('http');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');

function handleRequest(req, res) {
    let parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {

        if (req.method === 'GET' && pathname === '/users') {
            fs.readFile(__dirname , "/users/", (err, user) => {
                req.end(qs.parse(store).user);

            });

        } else if (req.method === 'POST' && pathname === '/users') {

            var userDir = path.join(__dirname, "users/");

            var username = JSON.parse(store).username;

            fs.open(userDir + username + ".json", "wx", (err, fd) => {
                fs.writeFile(fd, store, (err) => {

                    fs.close(fd, (err) => {
                        res.end(`${username} successfully created`);
                    });
                });
            });
        }

        else if (req.method === 'PUT' && pathname === '/users') {

            let updatedName = qs.parse(username)

            req.end(updatedName);

        } else if (req.method === 'DELETE' && pathname === '/users') {

            fs.readFile(__dirname ,"/users/", (err, user) => {
                fs.unlink()
                req.end(qs.parse(store).user);

            });
          
        } else {
            res.writeHead(404, { "content-type": "text/plain" });
            res.end('Page not found : 404')
        }


    });

}
var server = http.createServer(handleRequest);
server.listen(5678,()=> {
    console.log('listening on port 5678...');
});