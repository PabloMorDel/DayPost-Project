const getDB = require('../../Database/getDB');
const { generateRandomString, sendMail } = require('../../helpers');

const recoverUserPass = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { email } = req.body;
    if (!email) {
      const error = new Error('Missing required information');
      error.httpStatus = 404;
      throw error;
    }
    const [user] = await connection.query(
      `
        SELECT id FROM users WHERE email = ?
    `,
      [email]
    );
    if (user.length < 1) {
      const error = new Error(`Couldn't find any user with that email`);
      error.httpStatus = 404;
      throw error;
    }
    const recoverCode = generateRandomString(20);
    const emailBody = `<p>You required a password change for your account in DayPost.
    Your recover code is: ${recoverCode}</p> <br>
    <p> If you didn't ask for a change in your password, ignore this email. </p>
    `;
    await sendMail({
      to: email,
      subject: 'Password change',
      body: emailBody,
    });
    await connection.query(`UPDATE users SET recoverCode = ? WHERE email = ?`, [
      recoverCode,
      email,
    ]);
    res.send({
      status: 'ok',
      message: 'Email send, check your inbox to continue!',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = recoverUserPass;
