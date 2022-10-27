module.exports = {
  type: 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB,
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/entities/*.ts'],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/entities',
  },
};
