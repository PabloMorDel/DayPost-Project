const getDB = require('../../Database/getDB');

const getPostComments = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idPost } = req.params;
    const [postComments] = await connection.query(
      `
        SELECT * FROM comments WHERE idPost = ?
    `,
      [idPost]
    );
    if (postComments.length < 1) {
      const error = new Error(`This post does not have comments`);
      error.httpStatus = 404;
      throw error;
    }
    console.log(postComments);
    res.send({
      status: 'ok',
      message: postComments,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getPostComments;
