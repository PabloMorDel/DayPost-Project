const getDB = require('../../Database/getDB');
const { deletePhoto, savePhoto, formatDate } = require('../../helpers');

const editAvatar = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        connection = await getDB();
        const { idUser } = req.params;
        const idReqUser = req.auth.id;

        if (!req.files.avatar) {
            const error = new Error('Mising avatar');
            error.httpStatus = 400;
            throw error;
        }

        const [user] = await connection.query(
            `SELECT avatar FROM users WHERE id = ?`,
            [idUser]
        );

        const modifiedAt = formatDate(new Date());

        if (req.files && req.files.avatar) {
            if (user[0].avatar) await deletePhoto(user[0].avatar);

            const avatarName = await savePhoto(req.files.avatar);

            await connection.query(
                `UPDATE users SET avatar = ?, modifiedAt = ? WHERE id = ?`,
                [avatarName, modifiedAt, idUser]
            );
        }
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editAvatar;
