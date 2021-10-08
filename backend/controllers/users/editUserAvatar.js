const getDB = require('../../Database/getDB');
const { deletePhoto, savePhoto, formatDate } = require('../../helpers');

const editUserAvatar = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idUser } = req.params;
    const idReqUser = req.auth.id;
    if (Number(idUser) !== idReqUser && idReqUser !== 1) {
      const error = new Error(`You have no permissions to modify that user`);
      error.httpStatus = 403;
      throw error;
    }
    if (!req.files.avatar) {
      const error = new Error('Mising avatar');
      error.httpStatus = 400;
      throw error;
    }

    const [user] = await connection.query(
      `SELECT id, avatar FROM users WHERE id = ?`,
      [idUser]
    );

    const modifiedAt = formatDate(new Date());

    if (req.files && req.files.avatar) {
      if (user[0].avatar) {
        await deletePhoto(user[0].avatar);

        const avatarName = await savePhoto(req.files.avatar);

        await connection.query(
          `UPDATE users SET avatar = ?, modifiedAt = ? WHERE id = ?`,
          [avatarName, modifiedAt, idUser]
        );
      } else {
        const avatarName = await savePhoto(req.files.avatar);
        await connection.query(
          `
            UPDATE users SET avatar = ?, modifiedAt = ? WHERE id = ?
        `,
          [avatarName, modifiedAt, idUser]
        );
      }
    }
    res.send({
      status: 'ok',
      message: 'Avatar updated!',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUserAvatar;
