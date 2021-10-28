const getDB = require('../../Database/getDB');
const jwt = require('jsonwebtoken');
const { validate } = require('uuid');
const emailSchema = require('../../schemas/emailSchema');
const passSchema = require('../../schemas/passSchema');

const loginUser = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { email, password } = req.body;
    await validate(emailSchema, req.body);
    await validate(passSchema, req.body);
    if (!email || !password) {
      const error = new Error('Missing email or password');
      error.httpStatus = 404;
      throw error;
    }
    const [user] = await connection.query(
      `
        SELECT id, role, active FROM users WHERE email = ? AND password = SHA2(?, 512)
    `,
      [email, password]
    );
    console.log([user]);
    if (user.length < 1) {
      const error = new Error(
        'User does not exist (invalid email or password)'
      );
      error.httpStatus = 404;
      throw error;
    }
    if (!user[0].active) {
      const error = new Error('User needs to be validated, check your email!');
      error.httpStatus = 401;
      throw error;
    }
    const tokenInfo = {
      id: user[0].id,
      role: user[0].role,
    };
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: '60d',
    });
    res.send({
      status: 'ok',
      message: 'Logged in!',
      token,
      id: user[0].id,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = loginUser;
