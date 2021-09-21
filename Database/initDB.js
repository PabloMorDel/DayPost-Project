require('dotenv').config();
const faker = require('faker');
const getDB = require('./getDB.js');
const { formatDate, generateRandomValue } = require('../helpers.js');
const { lorem } = require('faker');

async function main() {
    let connection;
    try {
        connection = await getDB();
        await connection.query('DROP TABLE IF EXISTS likes;');
        await connection.query('DROP TABLE IF EXISTS photos;');
        await connection.query('DROP TABLE IF EXISTS comments;');
        await connection.query('DROP TABLE IF EXISTS posts;');
        await connection.query('DROP TABLE IF EXISTS users;');
        console.log('Deleted tables');

        //Users table
        await connection.query(`
        CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(512) NOT NULL,
            accName VARCHAR(100) DEFAULT "J.Doe",
            userName VARCHAR(100) NOT NULL UNIQUE,
            avatar VARCHAR(100),
            portrait VARCHAR(100),
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
            FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(100) NOT NULL,
            description TEXT,
            source VARCHAR(100) NOT NULL,
            topic VARCHAR(50) NOT NULL,
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
            FOREIGN KEY (idPost) REFERENCES posts(id) ON DELETE CASCADE,
            createdAt DATETIME NOT NULL
        )
    `);
        //Likes table
        await connection.query(`
        CREATE TABLE likes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            idUser INT NOT NULL,
            FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
            idPost INT NOT NULL,
            FOREIGN KEY (idPost) REFERENCES posts(id) ON DELETE CASCADE
        )
    `);
        //Comments table
        await connection.query(`
        CREATE TABLE comments (
            id INT PRIMARY KEY AUTO_INCREMENT,
            idUser INT NOT NULL,
            FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
            idPost INT NOT NULL,
            FOREIGN KEY (idPost) REFERENCES posts(id) ON DELETE CASCADE,
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
        SHA2("123456789", 512),
        true,
        "GOD",
        "PabloAdmin",
        "GOD",
        "admin",
        "${formatDate(new Date())}"
    )`);
        //Creating random users
        const USERS = 20;

        for (let i = 0; i < USERS; i++) {
            const email = faker.internet.email();
            const password = faker.internet.password();
            const userName = faker.internet.userName();
            const biography = faker.lorem.paragraph();
            await connection.query(
                `
      INSERT INTO users (email, password, userName, biography, active, createdAt)
      VALUES (?, ?, ?, ?, true, ?)
      `,
                [email, password, userName, biography, formatDate(new Date())]
            );
        }
        const POSTS = 50;

        for (let i = 0; i < POSTS; i++) {
            const title = faker.lorem.words(5);
            const source = faker.internet.url();
            const description = faker.lorem.paragraph(5);
            const createdAt = formatDate(new Date());
            const idUser = generateRandomValue(1, USERS + 1);
            const topic = faker.random.word();
            await connection.query(
                `
        INSERT INTO posts (title, source, description, idUser, topic, createdAt)
        VALUES(?, ?, ?, ?, ?, ?)
      `,
                [title, source, description, idUser, topic, createdAt]
            );
        }

        const LIKES = 1000;

        for (let i = 0; i < LIKES; i++) {
            const idUser = generateRandomValue(1, USERS + 1);
            const idPost = generateRandomValue(1, POSTS + 1);
            await connection.query(
                `
        INSERT INTO likes (idUser, idPost)
        VALUES(?, ?)`,
                [idUser, idPost]
            );
        }

        const COMMENTS = 200;

        for (let i = 0; i < COMMENTS; i++) {
            const content = faker.lorem.paragraph(2);
            const idUser = generateRandomValue(1, USERS + 1);
            const idPost = generateRandomValue(1, POSTS + 1);
            const createdAt = formatDate(new Date());
            await connection.query(
                `
        INSERT INTO comments (content, idUser, idPost, createdAt)
        VALUES(?, ?, ?, ?)`,
                [content, idUser, idPost, createdAt]
            );
        }

        console.log('New info has been added');
    } catch (error) {
        console.log(error.message);
        process.exit(0);
    } finally {
        if (connection) connection.release();
        process.exit(0);
    }
}
main();
