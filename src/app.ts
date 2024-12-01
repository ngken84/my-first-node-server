import * as http from 'http';
import { requestHandler } from './routes';

const server = http.createServer(requestHandler);

server.listen(3000);

