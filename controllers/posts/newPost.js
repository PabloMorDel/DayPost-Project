const getDB = require('../../Database/getDB');
const { formatDate, savePhoto } = require('../../helpers');

const newPost = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { source, title, description } = req.body;

    const idReqUser = req.auth.id;

    if (!title || !source) {
      const error = new Error('Missing required information');
      error.httpStatus = 404;
      throw error;
    }
    const createdAt = formatDate(new Date());

    const [newPost] = await connection.query(
      `

            INSERT INTO posts (title, source, description, idUser, createdAt)
            VALUES (?, ?, ?, ?, ?)

        `,
      [title, source, description, idReqUser, createdAt]
    );

    console.log(newPost);
    const idPost = Object.values(newPost)[2];

    if (req.files || req.files.photo) {
      const objects = Object.values(req.files);
      if (objects.length < 2) {
        const imageName = await savePhoto(req.files.photo);
        await connection.query(
          `
         INSERT INTO photos (name, idPost, createdAt) VALUES (?, ?, ?)
                `,
          [imageName, idPost, createdAt]
        );
      } else {
        const err = new Error('You can only upload one image per post');
        err.httpStatus = 403;
        throw err;
        res.send({
          status: 'bad',
          message: `Could't create your post :(`,
        });
      }
    }
    res.send({
      status: 'ok',
      message: 'Posted successfully!',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newPost;
