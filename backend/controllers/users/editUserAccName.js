const getDB = require('../../Database/getDB');

const editUserAccName = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idUser } = req.params;
    const idReqUser = req.auth.id;
    const { accName } = req.body;
    console.log(accName);
    const [user] = await connection.query(
      `
        SELECT id, accName FROM users WHERE id = ?
    `,
      [idUser]
    );
    if (Number(idUser) !== idReqUser && idReqUser !== 1) {
      const error = new Error(`You have no permissions to modify that user`);
      error.httpStatus = 403;
      throw error;
    }
    if (accName === user[0].accName) {
      const error = new Error(
        'Is not a change if you put the same name once again!'
      );
      error.httpStatus = 403;
      throw error;
    }
    await connection.query(
      `
        UPDATE users SET accName = ? WHERE id = ?
    `,
      [accName, idUser]
    );
    res.send({
      stauts: 'ok',
      message: `Account Name updated, hello there ${accName}!`,
      accName,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUserAccName;
