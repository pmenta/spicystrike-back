import { createConnection } from 'typeorm';

createConnection().then(() => console.log('Connection established'));
