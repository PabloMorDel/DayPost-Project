const getDB = require('../../Database/getDB');
const { deletePhoto } = require('../../helpers');

const deletePost = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const idReqUser = req.auth.id;
    const { idPost } = req.params;
    const [post] = await connection.query(
      `
        SELECT title FROM posts WHERE id = ?
    `,
      [idPost]
    );
    if (Number(post[0].idUser) !== idReqUser && idReqUser !== 1) {
      const error = new Error(`You have no permissions to modify that post`);
      error.httpStatus = 403;
      throw error;
    }
    await connection.query(
      `
        DELETE FROM posts WHERE id = ?
    `,
      [idPost]
    );
    const [photoPost] = await connection.query(
      `
        SELECT id, name FROM photos WHERE idPost = ?
    `,
      [idPost]
    );
    if (photoPost.length > 0) {
      await connection.query(
        `
            DELETE FROM photos WHERE id = ?
        `,
        [photoPost[0].id]
      );
      await deletePhoto(photoPost[0].name);
    }
    res.send({
      status: 'ok',
      message: `The post '${post[0].title}' was succesfully deleted`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePost;
