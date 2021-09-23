const getDB = require('../../Database/getDB');

const likePost = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idPost } = req.params;
    const idReqUser = req.auth.id;
    const [likes] = await connection.query(
      `
        SELECT id, idUser, idPost FROM likes WHERE idPost = ?
    `,
      [idPost]
    );

    for (const like of likes) {
      if (idReqUser === like.idUser) {
        const error = new Error(`You cannot like the same post twice`);
        error.httpStatus = 403;
        throw error;
      }
    }
    await connection.query(
      `
        INSERT INTO likes (idUser, idPost)
        VALUES (?, ?)
    `,
      [idReqUser, idPost]
    );
    res.send({
      status: 'ok',
      message: 'Liked!',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = likePost;
