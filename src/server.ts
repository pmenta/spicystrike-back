import { httpServer } from './http';
import './webSocket.ts';

httpServer.listen(3000, () => console.log('Server is running on port 3000'));
