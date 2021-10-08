const getDB = require('../Database/getDB');

const postExists = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idPost } = req.params;
    const [post] = await connection.query(
      `
        SELECT id FROM posts WHERE id = ?
    `,
      [idPost]
    );
    if (post.length < 1) {
      const error = new Error(`Couldn't find that post`);
      error.httpStatus = 404;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = postExists;
