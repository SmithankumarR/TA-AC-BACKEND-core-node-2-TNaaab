//  #### Capture data on server
var http = require('http');
var qs = require('querystring');

function handleRequest(req, res) {
    if (req.method === 'POST' && req.url === '/json') {
        var store = '';
        req.on('data', (chunk) => {
            store = store + chunk;
        })
        req.on('end', () => {
            res.writeHead(201, { 'Content-Type': 'application/json' });

            res.end(store, req.statusCode);
        })

    }
}

var server = http.createServer(handleRequest);
server.listen(4500, () => {
    console.log('listening on port 4500');
})
//  Follow above steps with form data from postman instead of json data.

function hr_2(req, res) {
    if (req.method === 'POST' && req.url === '/form') {
        var store = '';
        req.on('data', (chunk) => {
            store = store + chunk;
        })
        req.on('end', () => {
            res.writeHead(201, { 'Content-Type': 'application/x-www-form-urlencoded' });
            let parsedData = qs.parse(store);

            res.end(store, req.statusCode, parsedData);
        })

    }

}

var server_2 = http.createServer(hr_2);
server_2.listen(5000, () => {
    console.log('listening on port 5000');
})

// Create server which can handle both json/form data without specifying which format of data is being received.
function hr_3(req, res) {
    let dataFormate = req.headers['content-type'];
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    })
    if (dataFormate === 'application/json') {
        req.on('end', () => {
            res.end(store);
        })

    }
    if(dataFormate === 'application/x-www-form-urlencoded') {
        req.on('end', () => {
            let parsedData = qs.parse(store);

            res.end(JSON.stringify(parsedData));
        })
    
    }

}

var server_3 = http.createServer(hr_3);
server_3.listen(9000, () => {
    console.log('listening on port 9000');
})

//create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.

function hr_4(req, res) {
    let dataFormate = req.headers['content-type'];
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    })
    if (dataFormate === 'application/json' || dataFormate === 'application/x-www-form-urlencoded' ) {
        req.on('end', () => {
            res.writeHead(200, {"content-type": "text/html"});
            res.end(store);
        })

    }

}

var server_4 = http.createServer(hr_4);
server_4.listen(7000, () => {
    console.log('listening on port 7000');
})


//create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.

function hr_5(req, res) {
    let dataFormate = req.headers['content-type'];
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    })
    if (dataFormate === 'application/json' || dataFormate === 'application/x-www-form-urlencoded' ) {
        req.on('end', () => {
            res.writeHead(200, {"content-type": "text/html"});
            let parsedData = (qs.store);
            console.log(JSON.stringify(parsedData));
        })
    }

}

var server_5 = http.createServer(hr_5);
server_5.listen(8000, () => {
    console.log('listening on port 8000');
})