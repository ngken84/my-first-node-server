import * as http from 'http';
import * as fs from 'fs';

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    const url = req.url;

    if(url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text"/><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    if(url === "/message" && req.method === 'POST') {
        fs.writeFileSync("message.txt", "DUMMY");
        res.statusCode = 302;
        res.setHeader('Location', "/");
        return res.end();
    }
    res.setHeader("Content-Type", "text/html");
    res.write('<html>');
    res.write('<head></head>');
    res.write('<body>Hello World</body>')
    res.write('</html>');
    return res.end();

    
});

server.listen(3000);

