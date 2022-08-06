var http = require('http');
var fs = require('fs');
var url = require('url');

var usersPath = __dirname + '/users/';

function handleRequest(req, res) {
    let parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        // create user 
        if (req.url === '/users' && req.method === 'POST') {
            var username = JSON.parse(store).username;

            fs.open(usersPath + username + '.json', 'wx', (err, fd) => {
                if (err) throw err;
                fs.writeFile(fd, store, (err) => {
                    if (err) return console.log(err);
                    fs.close(fd, () => {
                      return  res.end(`${username}  Created successfully `);
                    });
                })
            })

        } //read User Operation 
         if(pathname === '/users' && req.method === 'GET') {
            var username = parsedUrl.query.username;

            fs.readFile(usersPath + username + '.json', (err, content) => {
                if (err) return console.log(err);
                res.setHeader('Content-Type', 'application/json');
              return  res.end(content);
            })

        } 
        // update user
        if(pathname === '/users' && req.method === 'PUT'){
            var username = parsedUrl.query.username;
            fs.open(usersPath + username + '.json', 'r+', (err,fd) => {
                if(err) return console.error(err);

                fs.ftruncate(fd,(err) => {
                    if(err) return console.error(err);
                    fs.writeFile(fd,store,(err) => {
                    if(err) return console.error(err);
                        fs.close(fd,()=> {
                           return res.end(`${username} updated suscessfully`)
                        })
                    })
                })
            })

        }
        // delete operation
        if(pathname === '/users' && req.method === 'DELETE') {
            var username = parsedUrl.query.username;

            fs.unlink(usersPath + username + '.json',(err) => {
                if(err) return console.error(err);
               return res.end(`${username} deleted suscessfully`)
            })
            
        }
        
            res.writeHead(404, { "content-type": "text/plain" });
            res.end('Page not found')
    


    });

}
var server = http.createServer(handleRequest);
server.listen(5678, () => {
    console.log('listening on port 5678...');
});