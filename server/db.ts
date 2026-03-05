import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3308', 10),
    user: process.env.DB_USER || 'chuo',
    password: process.env.DB_PASSWORD || 'chuopass',
    database: process.env.DB_NAME || 'chuo_math',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

export const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to the database.');
        connection.release();
        return true;
    } catch (err) {
        console.error('Database connection failed:', err);
        return false;
    }
};
