import { httpServer } from './http';
import './webSocket.ts';
import dotenv from 'dotenv';

dotenv.config();

httpServer.listen(process.env.PORT || 3000, () => console.log('Server is running on port 3000'));
