const getDB = require('../../Database/getDB');
const { formatDate } = require('../../helpers');

const editPostTitle = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idPost } = req.params;
    const { newTitle } = req.body;
    const idReqUser = req.auth.id;
    if (!newTitle) {
      const error = new Error(`Missing required information`);
      error.httpStatus = 404;
      throw error;
    }

    const [post] = await connection.query(
      `
        SELECT id, idUser, title FROM posts WHERE id = ?
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
        UPDATE posts SET title = ?, modifiedAt = ? WHERE id = ?
    `,
      [newTitle, formatDate(new Date()), idPost]
    );
    res.send({
      status: 'ok',
      message: `Post title updated to '${newTitle}'`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editPostTitle;
