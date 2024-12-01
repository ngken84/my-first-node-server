import { IncomingMessage, ServerResponse } from "http";
import * as fs from 'fs';

export const requestHandler = (req : IncomingMessage, res: ServerResponse) => {
    const url = req.url;

    if(url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    if(url === "/message" && req.method === 'POST') {
        const body : Uint8Array[] = [];
        req.on('data', (chunk : Uint8Array) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            fs.writeFile("message.txt", parsedBody.split("=")[1], (err) => {
                res.statusCode = 302;
                res.setHeader('Location', "/");
                return res.end();
            });
        });
    }
    res.setHeader("Content-Type", "text/html");
    res.write('<html>');
    res.write('<head></head>');
    res.write('<body>Hello World</body>')
    res.write('</html>');
    return res.end();
}

