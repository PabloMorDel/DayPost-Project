const getDB = require('../../Database/getDB');

const getUser = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idUser } = req.params;
    const idReqUser = req.auth.id;
    // console.log(idUser, idReqUser);
    const [user] = await connection.query(
      `
        SELECT id, userName, accName, biography, avatar, portrait, createdAt, active FROM users WHERE id = ?
    `,
      [idUser]
    );
    let userInfo = {
      name: user[0].userName,
      account: user[0].accName,
      biography: user[0].biography,
      avatar: user[0].avatar,
      portrait: user[0].portrait,
    };
    //idUser typeof === string, we have to force it being a number
    if (Number(idUser) === idReqUser) {
      (userInfo.email = user[0].email),
        (userInfo.active = user[0].active),
        (userInfo.createdAt = user[0].createdAt);
    }
    res.send({
      status: 'ok',
      message: userInfo,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUser;
