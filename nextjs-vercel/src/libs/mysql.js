import mysql from 'serverless-mysql';

export const conn = mysql({
  config: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'prueba',
    port: process.env.DB_PORT || 3306,
  },
});
