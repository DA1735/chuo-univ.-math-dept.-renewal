import { testConnection, pool } from '../server/db';

async function setup() {
    const isConnected = await testConnection();
    if (!isConnected) {
        console.error("DB connection failed. Please check docker container.");
        process.exit(1);
    }

    try {
        console.log("Setting up database tables...");

        // Drop existing tables for fresh start
        await pool.query('DROP TABLE IF EXISTS staff;');
        await pool.query('DROP TABLE IF EXISTS seminars;');
        await pool.query('DROP TABLE IF EXISTS ewm;');
        await pool.query('DROP TABLE IF EXISTS encounters;');
        await pool.query('DROP TABLE IF EXISTS news;');

        // Create news table
        await pool.query(`
            CREATE TABLE news (
                id VARCHAR(255) PRIMARY KEY,
                date VARCHAR(255),
                category VARCHAR(255),
                title VARCHAR(255),
                link VARCHAR(255)
            );
        `);
        console.log("Created news table.");

        // Create encounters table
        await pool.query(`
            CREATE TABLE encounters (
                number INT PRIMARY KEY,
                title VARCHAR(255),
                date_start VARCHAR(255),
                date_end VARCHAR(255),
                venue VARCHAR(255),
                schedule JSON,
                description TEXT,
                resume_pdf VARCHAR(255),
                lecture_materials JSON
            );
        `);
        console.log("Created encounters table.");

        // Create ewm table
        await pool.query(`
            CREATE TABLE ewm (
                id INT AUTO_INCREMENT PRIMARY KEY,
                is_extra BOOLEAN DEFAULT FALSE,
                number INT,
                date VARCHAR(255),
                title TEXT,
                speaker TEXT,
                affiliation VARCHAR(255),
                time VARCHAR(255),
                place VARCHAR(255),
                abstract TEXT,
                note TEXT,
                poster VARCHAR(255),
                documents JSON
            );
        `);
        console.log("Created ewm table.");

        // Create seminars table (Unified Structure)
        await pool.query(`
            CREATE TABLE seminars (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category VARCHAR(50),
                badge VARCHAR(255),
                number INT,
                date VARCHAR(255),
                title TEXT,
                speaker TEXT,
                affiliation VARCHAR(255),
                time VARCHAR(255),
                place VARCHAR(255),
                abstract TEXT,
                note TEXT,
                poster VARCHAR(255),
                documents JSON,
                link VARCHAR(255)
            );
        `);
        console.log("Created seminars table.");

        // Create staff table
        await pool.query(`
            CREATE TABLE staff (
                id INT PRIMARY KEY,
                role VARCHAR(50),
                name_ja VARCHAR(255),
                name_en VARCHAR(255),
                position VARCHAR(255),
                fields JSON,
                email VARCHAR(255),
                photo VARCHAR(255),
                personal_page VARCHAR(255),
                lab_page VARCHAR(255),
                notes TEXT
            );
        `);
        console.log("Created staff table.");

        console.log("Setup completed successfully.");
    } catch (err) {
        console.error("Error setting up tables:", err);
    } finally {
        pool.end();
    }
}

setup();
