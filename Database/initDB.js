require('dotenv').config();

const getDB = require('./getDB.js');
const { formatDate } = require('../helpers.js');

async function main() {
  let connection;
  try {
    connection = await getDB();
    await connection.query('DROP TABLE IF EXISTS likes;');
    await connection.query('DROP TABLE IF EXISTS photos;');
    await connection.query('DROP TABLE IF EXISTS posts;');
    await connection.query('DROP TABLE IF EXISTS users;');
    await connection.query('DROP TABLE IF EXISTS comments;');
    console.log('Deleted tables');

    //Users table
    await connection.query(`
        CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(512) NOT NULL,
            accName VARCHAR(100) DEFAULT "J.Doe",
            userName VARCHAR(100) NOT NULL,
            biography TEXT,
            active BOOLEAN DEFAULT false,
            deleted BOOLEAN DEFAULT false,
            role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
            registrationCode VARCHAR(100),
            recoverCode VARCHAR(100),
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME
        )
    `);
    //Posts table
    await connection.query(`
        CREATE TABLE posts (
            id INT PRIMARY KEY AUTO_INCREMENT,
            idUser INT NOT NULL,
            place VARCHAR(100) NOT NULL,
            description TEXT,
            source VARCHAR(100) NOT NULL,
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME
        )
    `);
    //Photos table
    await connection.query(`
        CREATE TABLE photos (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            idPost INT NOT NULL,
            createdAt DATETIME NOT NULL
        )
    `);
    //Likes table
    await connection.query(`
        CREATE TABLE likes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            idUser INT NOT NULL,
            idPost INT NOT NULL
        )
    `);
    //Comments table
    await connection.query(`
        CREATE TABLE comments (
            id INT PRIMARY KEY AUTO_INCREMENT,
            idUser INT NOT NULL,
            idPost INT NOT NULL,
            content TEXT,
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME
        )
    `);
    console.log('Created tables');
    //Create admin user
    await connection.query(`
    INSERT INTO users(email, password, active, accName, userName, biography, role, createdAt)
    VALUES (
        "pablomd137@gmail.com",
        SHA2("12345", 512),
        true,
        "GOD",
        "PabloAdmin",
        "GOD",
        "admin",
        "${formatDate(new Date())}"
    )`);
  } catch (error) {
    console.log(error.message);
    process.exit(0);
  } finally {
    if (connection) connection.release();
    process.exit(0);
  }
}
main();
