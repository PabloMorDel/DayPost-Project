const getDB = require('../../Database/getDB');

const editUserBiography = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idUser } = req.params;
    const { biography } = req.body;
    console.log(biography);
    const idReqUser = req.auth.id;
    const [user] = await connection.query(
      `
        SELECT id, biography FROM users WHERE id =?
    `,
      [idUser]
    );
    if (Number(idUser) !== idReqUser && idReqUser !== 1) {
      const error = new Error(`You have no permissions to modify that user`);
      error.httpStatus = 403;
      throw error;
    }
    await connection.query(
      `
        UPDATE users SET biography = ? WHERE id = ?
    `,
      [biography, idUser]
    );
    res.send({
      status: 'ok',
      message: 'Biography updated!',
      biography,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUserBiography;
