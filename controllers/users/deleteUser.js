const getDB = require('../../Database/getDB');
const { deletePhoto, formatDate } = require('../../helpers');

const deleteUser = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idUser } = req.params;
    const idReqUser = req.auth.id;
    const [user] = await connection.query(
      `
        SELECT id, avatar, deleted FROM users WHERE id = ?
    `,
      [idUser]
    );
    console.log(idUser, idReqUser, typeof idUser, typeof idReqUser);
    //Assuming admin can delete user // testing.
    if (Number(idUser) !== idReqUser && idReqUser !== 1) {
      const error = new Error('You are not authorized to do that.');
      error.httpStatus = 403;
      throw error;
    }
    if (user[0].avatar) {
      await deletePhoto(user[0].avatar);
    }
    if (user[0].portrait) {
      await deletePhoto(user[0].portrait);
    }

    //Not replacing old password with a random new one.
    await connection.query(
      `
        UPDATE users SET accName = "J.Doe", avatar = NULL, portrait = NULL, active = 0, deleted = 1, modifiedAt = ? WHERE id = ?
    `,
      [formatDate(new Date()), idUser]
    );
    res.send({
      status: 'ok',
      message: 'Succesfully deleted user',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteUser;
