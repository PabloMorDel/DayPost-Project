const { validate, formatDate } = require('../../helpers');
const passSchema = require('../../schemas/passSchema');
const getDB = require('../../Database/getDB');

const editUserPass = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idUser } = req.params;
    const idReqUser = req.auth.id;
    const { currentPass, newPass } = req.body;
    // await validate(passSchema, req.body); --> no funsiona
    if (Number(idUser) !== idReqUser && idReqUser !== 1) {
      const error = new Error(`You have no permissions to modify that user`);
      error.httpStatus = 403;
      throw error;
    }
    const [user] = await connection.query(
      `
        SELECT id FROM users WHERE id = ? AND password = SHA2(?, 512)
    `,
      [idUser, currentPass]
    );
    console.log(idUser, currentPass);

    if (user.length < 1) {
      const error = new Error('Invalid password');
      error.httpStatus = 400;
      throw error;
    }
    await connection.query(
      `
        UPDATE users SET password = SHA2(?, 512), modifiedAt = ? WHERE id = ?
    `,
      [newPass, formatDate(new Date()), idUser]
    );

    res.send({
      status: 'ok',
      message: 'Password updated succesfully.',
      password,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUserPass;
