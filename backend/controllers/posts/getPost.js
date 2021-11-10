const getDB = require('../../Database/getDB');

const getPost = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    // const idReqUser = req.auth.id;
    const { idPost } = req.params;
    //MODIFICAR CUANDO INTRODUZCAMOS LIKES
    const [post] = await connection.query(
      `
        SELECT posts.id, posts.title, posts.description, posts.source, posts.topic, posts.idUser, posts.createdAt, COUNT(*) AS likes
        FROM posts
        LEFT JOIN likes ON (likes.idPost = posts.id)
        WHERE posts.id = ?
        GROUP BY posts.id
    `,
      [idPost]
    );
    console.log(post);
    if (post.length < 1) {
      const error = new Error(`Couldn't find that post.`);
      error.httpStatus = 404;
      throw error;
    }
    const [postPhoto] = await connection.query(
      `
        SELECT * FROM photos WHERE idPost = ?
      `,
      [post[0].id]
    );
    console.log(postPhoto);
    const postBody = {
      title: post[0].title,
      source: post[0].source,
      description: post[0].description,
      idUser: post[0].idUser,
      createdAt: post[0].createdAt,
      likes: post[0].likes,
      photo: postPhoto,
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
