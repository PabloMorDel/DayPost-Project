const getDB = require('../../Database/getDB');

const getPost = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const idReqUser = req.auth.id;
    const { idPost } = req.params;
    //MODIFICAR CUANDO INTRODUZCAMOS LIKES
    const [post] = await connection.query(
      `
        SELECT * FROM posts WHERE id = ?
    `,
      [idPost]
    );

    if (post.length < 1) {
      const error = new Error(`Couldn't find that post.`);
      error.httpStatus = 404;
      throw error;
    }
    const postBody = {
      title: post[0].title,
      source: post[0].source,
      description: post[0].description,
      idUser: post[0].idUser,
      createdAt: post[0].createdAt,
    };
    res.send({
      status: 'ok',
      message: postBody,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getPost;
