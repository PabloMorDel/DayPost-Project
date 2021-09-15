const getDB = require('../../Database/getDB');

const validateUser = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { registrationCode } = req.params;
    const [user] = await connection.query(
      `
        SELECT id FROM users WHERE registrationCode = ?
    `,
      [registrationCode]
    );
    if (user.length < 1) {
      const error = new Error(
        `There isn't any users pending to validate with that code.`
      );
      error.httpStatus = 404;
      throw error;
    }
    await connection.query(
      `
        UPDATE users SET active = true, registrationCode = NULL WHERE registrationCode = ?
    `,
      [registrationCode]
    );

    res.send({
      status: 'ok',
      message: 'User was succesfully activated!',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = validateUser;
