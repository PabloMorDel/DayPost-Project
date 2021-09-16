const getDB = require('../../Database/getDB');
const { formatDate } = require('../../helpers');

const resetUserPass = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { recoverCode, newPass } = req.body;
    if (!recoverCode || !newPass) {
      const error = new Error('Missing required information');
      error.httpStatus = 404;
      throw error;
    }
    const [user] = await connection.query(
      `
        SELECT id FROM users WHERE recoverCode = ?
    `,
      [recoverCode]
    );
    if (user.length < 1) {
      const error = new Error(`There isn't any user with that recover code`);
      error.httpStatus = 404;
      throw error;
    }
    await connection.query(
      `
        UPDATE users SET password = SHA2(?, 512), recoverCode = NULL, modifiedAt = ? WHERE id = ?
    `,
      [newPass, formatDate(new Date()), user[0].id]
    );
    res.send({
      stauts: 'ok',
      message: 'Password updated',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = resetUserPass;
