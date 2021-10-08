const getDB = require('../../Database/getDB');
const { formatDate } = require('../../helpers');

const editPostSource = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const idReqUser = req.auth.id;
    const { idPost } = req.params;
    const { newSource } = req.body;
    if (!newSource) {
      const error = new Error(`Missing required information`);
      error.httpStatus = 404;
      throw error;
    }
    const [post] = await connection.query(
      `
        SELECT id, idUser, source FROM posts WHERE id = ?
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
        UPDATE posts SET source = ?, modifiedAt = ? WHERE id = ?
    `,
      [newSource, formatDate(new Date()), idPost]
    );
    res.send({
      status: 'ok',
      message: `Source updated to '${newSource}'`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editPostSource;
