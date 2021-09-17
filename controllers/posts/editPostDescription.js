const getDB = require('../../Database/getDB');
const { formatDate } = require('../../helpers');

const editPostDescription = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const idReqUser = req.auth.id;
    const { idPost } = req.params;
    const { newDescription } = req.body;
    if (!newDescription) {
      const error = new Error(`Missing required information`);
      error.httpStatus = 404;
      throw error;
    }
    const [post] = await connection.query(
      `
        SELECT idUser, description FROM posts WHERE id = ?
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
        UPDATE posts SET description = ?, modifiedAt = ? WHERE id = ?
    `,
      [newDescription, formatDate(new Date()), idPost]
    );
    res.send({
      status: 'ok',
      message: `Description updated!`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editPostDescription;
