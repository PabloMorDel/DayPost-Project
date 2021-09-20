const getDB = require('../../Database/getDB');
const { deletePhoto } = require('../../helpers');

const deletePostPhoto = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idPost } = req.params;
    const [photo] = await connection.query(
      `
        SELECT id, name FROM photos WHERE idPost = ?
    `,
      [idPost]
    );
    if (photo.length < 1) {
      const error = new Error(`Couldn't find any photo`);
      error.httpStatus = 404;
      throw error;
    }
    await deletePhoto(photo[0].name);
    await connection.query(
      `
        DELETE FROM photos WHERE idPost = ?
    `,
      [idPost]
    );
    res.send({
      status: 'ok',
      message: 'Photo deleted',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePostPhoto;
