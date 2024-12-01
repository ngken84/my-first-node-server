import * as http from 'http';

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
});

server.listen(3000);

