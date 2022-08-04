var http = require('http');


function handleRequest(req,res){
    if(req.method === 'POST' && req.url === '/'){
        var store = ''
        req.on('data', (chunk) =>{
            store += chunk;
        })
    
        req.on('end', () =>{
        console.log(store);
        })
    res.writeHead( 202, { "content-type": "text.plain" });
    res.end(store);
   }
}

var server = http.createServer(handleRequest);

server.listen(3456, () => {
    console.log('listening on port 3456');
})