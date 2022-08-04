var http = require('http');
var qs = require('qs');
function handleRequest(req, res) {

    let dataFormate = req.headers['content-type'];
    var store = '';

    req.on('data', (chunk) => {

        store = store + chunk;

    })

    req.on('end', () => {
        if (dataFormate === 'application/json') {
            res.end(store);

        }
        if (dataFormate === 'application/x-www-form-urlencoded') {
            var parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));

        }
    });

}
var server = http.createServer(handleRequest);

server.listen(7000, () => {
    console.log('listening onn port 7000');
}
)