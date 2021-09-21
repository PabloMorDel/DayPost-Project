const getDB = require('../../Database/getDB');

const listPosts = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { search, order, direction } = req.query;

        const validOrderOptions = ['topic', 'createdAt', 'likes', 'title'];

        const validDirectionOptions = ['DESC', 'ASC'];

        const orderBy = validOrderOptions.includes(order) ? order : 'likes';

        const orderDirection = validDirectionOptions.includes(direction)
            ? direction
            : 'DESC';

        let posts;

        if (search) {
            [posts] = await connection.query(
                `
            SELECT posts.id, posts.idUser, posts.title, posts.source, posts.description, posts.topic, posts.createdAt, posts.modifiedAt, COUNT(posts_likes.likes) AS likes
            FROM posts
            LEFT JOIN likes AS posts_likes ON (posts.id = posts_likes.idPost)
            WHERE posts.title LIKE ? OR posts.topic LIKE ?
            GROUP BY posts.id
            ORDER BY ${orderBy} ${orderDirection}
            `,
                [`%${search}%`, `%${search}%`]
            );
        } else {
            [posts] = await connection.query(
                `
             SELECT posts.id, posts.idUser, posts.title, posts.source, posts.description, posts.topic, posts.createdAt, posts.modifiedAt, COUNT(posts_likes.likes) AS postsLikes
             FROM posts
             LEFT JOIN likes AS posts_likes ON (posts.id = posts_likes.idPost)
             GROUP BY posts.id
             ORDER BY ${orderBy} ${orderDirection}
            `
            );
        }

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
