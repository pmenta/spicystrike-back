import dotenv from 'dotenv';
import { httpServer } from '@/http';
import '@/webSocket';

dotenv.config();

httpServer.listen(process.env.PORT || 3000, () => console.log(`Server is running on port ${process.env.PORT || 3000}`));
