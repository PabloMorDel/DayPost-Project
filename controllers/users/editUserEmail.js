const getDB = require('../../Database/getDB');
const {
  validate,
  formatDate,
  generateRandomString,
  sendMail,
} = require('../../helpers');
const emailSchema = require('../../schemas/emailSchema');

const editUserEmail = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idUser } = req.params;
    const { email } = req.body;
    const idReqUser = req.auth.id;
    await validate(emailSchema, req.body);
    const [user] = await connection.query(
      `
      SELECT id, email FROM users WHERE id = ?
    `,
      [idUser]
    );
    if (Number(idUser) !== idReqUser && idReqUser !== 1) {
      const error = new Error(`You have no permissions to modify that user`);
      error.httpStatus = 403;
      throw error;
    }
    const [emailIsUsed] = await connection.query(
      `
      SELECT id, email FROM users WHERE email = ?
    `,
      [email]
    );
    if (emailIsUsed.length > 0) {
      const error = new Error('This email is already in use');
      error.httpStatus = 400;
      throw error;
    }
    if (email === user[0].email) {
      const error = new Error(
        'Your new email have to be different from the old one!'
      );
      error.httpStatus = 400;
      throw error;
    }
    const registrationCode = generateRandomString(20);
    await connection.query(
      `
      UPDATE users SET active = false, registrationCode = ? WHERE id = ?
    `,
      [registrationCode, idUser]
    );

    const emailBody = `Validate your new DayPost email here: ${process.env.PUBLIC_HOST}/users/validate/${registrationCode} `;

    await sendMail({
      to: email,
      subject: 'New DayPost email',
      body: emailBody,
    });

    await connection.query(
      `
      UPDATE users SET email = ?, modifiedAt = ? WHERE id =?
    `,
      [email, formatDate(new Date()), idUser]
    );
    res.send({
      status: 'ok',
      message: `Your new email is: ${email}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUserEmail;
