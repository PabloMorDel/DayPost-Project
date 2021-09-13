const getDB = require('../../Database/getDB');
const emailSchema = require('../../schemas/emailSchema');
const passSchema = require('../../schemas/passSchema');
const { validate } = require('../../helpers');
const userNameSchema = require('../../schemas/userNameSchema');

const { formatDate, generateRandomString } = require('../../helpers');

const newUser = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    console.log(req.body);
    const { email, password, userName } = req.body;
    await validate(emailSchema, req.body);
    await validate(passSchema, req.body);
    await validate(userNameSchema, req.body);
    const [user] = await connection.query(
      `
        SELECT id FROM users WHERE email = ? OR userName = ?
    `,
      [email, userName]
    );
    console.log(user);
    if (user.length > 0) {
      const error = new Error('There is an user using this email already');
      error.httpStatus = 409;
      throw error;
    }
    const registrationCode = generateRandomString(20);

    await connection.query(
      `
        INSERT INTO users(email, password, userName, registrationCode, createdAt)
        VALUES(?, SHA2(?, 512), ?, ?, ?)
    `,
      [email, password, userName, registrationCode, formatDate(new Date())]
    );
    // !!!!!!! CAMBIAR MENSAJE PARA REFERIR LA VALIDACION DE EMAIL
    res.send({
      status: 'Ok',
      message: 'User created',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { newUser };
