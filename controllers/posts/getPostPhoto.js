const getDB = require('../../Database/getDB');

const getPostPhoto = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idPost } = req.params;
    const [photoPost] = await connection.query(
      `
        SELECT * FROM photos WHERE idPost = ?
    `,
      [idPost]
    );
    if (photoPost.length < 1) {
      const error = new Error(`This post does not have a photo`);
      error.httpStatus = 404;
      throw error;
    }
    res.send({
      status: 'ok',
      message: photoPost[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getPostPhoto;
