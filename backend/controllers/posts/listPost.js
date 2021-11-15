const getDB = require('../../Database/getDB');
const { formatDate } = require('../../helpers');
const listPosts = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { order, direction, topic, title } = req.query;

    const validOrderOptions = ['topic', 'createdAt', 'likes', 'title'];

    const validDirectionOptions = ['DESC', 'ASC'];

    const orderBy = validOrderOptions.includes(order) ? order : 'likes';

    const orderDirection = validDirectionOptions.includes(direction)
      ? direction
      : 'DESC';

    let posts;

    if (topic || title) {
      [posts] = await connection.query(
        `
        SELECT posts.id, posts.title, posts.description, posts.source, posts.topic, posts.idUser, COUNT(*) AS likes
        FROM posts
        LEFT JOIN likes ON (likes.idPost = posts.id)
        WHERE posts.topic LIKE ? OR posts.title LIKE ?
        GROUP BY posts.id
        ORDER BY ${orderBy} ${orderDirection}
            `,
        [`%${topic}%`, `%${title}%`]
      );
    } else if (order || direction) {
      [posts] = await connection.query(
        `
        SELECT posts.id, posts.title, posts.description, posts.source, posts.topic, posts.idUser, COUNT(*) AS likes, photos.name AS photo
        FROM posts
        LEFT JOIN likes ON (likes.idPost = posts.id)
        LEFT JOIN photos ON (photos.idPost = posts.id)
        GROUP BY posts.id, photo
        ORDER BY posts.${orderBy} ${orderDirection}
            `
      );
    } else {
      [posts] = await connection.query(
        `
        SELECT posts.id, posts.title, posts.description, posts.source, posts.topic, posts.idUser, COUNT(*) AS likes, photos.name AS photo
        FROM posts
        LEFT JOIN likes ON (likes.idPost = posts.id)
        LEFT JOIN photos ON (photos.idPost = posts.id)
        GROUP BY posts.id, photo
        ORDER BY ${orderBy} ${orderDirection}
            `
      );
    }
    console.log(orderBy, orderDirection);
    res.send({
      status: 'ok',
      posts,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listPosts;
