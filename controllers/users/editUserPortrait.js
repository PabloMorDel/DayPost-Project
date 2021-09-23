const getDB = require('../../Database/getDB');
const { deletePhoto, savePhoto, formatDate } = require('../../helpers');

const editUserPortrait = async (req, res, next) => {
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
    if (!req.files.portrait) {
      const error = new Error('Mising portrait');
      error.httpStatus = 400;
      throw error;
    }

    const [user] = await connection.query(
      `SELECT id, portrait FROM users WHERE id = ?`,
      [idUser]
    );

    const modifiedAt = formatDate(new Date());

    if (req.files && req.files.portrait) {
      if (user[0].portrait) {
        await deletePhoto(user[0].portrait);

        const portraitName = await savePhoto(req.files.portrait);

        await connection.query(
          `UPDATE users SET portrait = ?, modifiedAt = ? WHERE id = ?`,
          [portraitName, modifiedAt, idUser]
        );
      } else {
        const portraitName = await savePhoto(req.files.portrait);
        await connection.query(
          `
            UPDATE users SET portrait = ?, modifiedAt = ? WHERE id = ?
        `,
          [portraitName, modifiedAt, idUser]
        );
      }
    }
    res.send({
      status: 'ok',
      message: 'Portrait updated!',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUserPortrait;
