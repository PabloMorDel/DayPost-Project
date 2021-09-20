const getDB = require('../../Database/getDB');
const { deletePhoto, savePhoto, formatDate } = require('../../helpers');

const addPostPhoto = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idPost } = req.params;
    let imageName;
    if (!req.files || !req.files.photo) {
      const error = new Error(`Image not found`);
      error.httpStatus = 404;
      throw error;
    }
    const [photoPost] = await connection.query(
      `
        SELECT id, name FROM photos WHERE idPost = ?
    `,
      [idPost]
    );
    if ((req.files || req.files.photo) && photoPost.length > 0) {
      await deletePhoto(photoPost[0].name);
      imageName = await savePhoto(req.files.photo);
      await connection.query(
        `
            UPDATE photos SET name = ? WHERE idPost = ?
            `,
        [imageName, idPost]
      );
      res.send({
        status: 'ok',
        message: 'Photo uploaded!',
      });
    } else {
      imageName = await savePhoto(req.files.photo);
      await connection.query(
        `
            INSERT INTO photos (name, idPost, createdAt)
            VALUES (?, ?, ?)
            `,
        [imageName, idPost, formatDate(new Date())]
      );
      await connection.query(
        `
            UPDATE posts SET modifiedAt = ? WHERE id = ?
      `,
        [formatDate(new Date()), idPost]
      );
      res.send({
        status: 'ok',
        message: 'Photo uploaded!',
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addPostPhoto;
