import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

db.getConnection((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

export default db;
