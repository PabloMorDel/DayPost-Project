const getDB = require('../../Database/getDB');
const { formatDate } = require('../../helpers');
const addPostComment = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    console.log(req.body);
    const { comment } = req.body;
    const { idPost } = req.params;
    const idReqUser = req.auth.id;
    console.log(comment);
    await connection.query(
      `
        INSERT INTO comments (idPost, idUser, content, createdAt)
        VALUES (?, ?, ?, ?)
    `,
      [idPost, idReqUser, comment, formatDate(new Date())]
    );
    const [comments] = await connection.query(
      `
        SELECT * FROM comments WHERE idPost = ?
    `,
      [idPost]
    );
    res.send({
      status: 'ok',
      message: comments,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addPostComment;
