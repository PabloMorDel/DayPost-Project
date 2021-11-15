const jwt = require('jsonwebtoken');

const authorized = async (req, res, next) => {
  let connection;
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      const error = new Error('Missing authorization header');
      error.httpStatus = 401;
      throw error;
    }
    let tokenInfo;
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (_) {
      console.log(authorization);
      const error = new Error('Invalid token');
      error.httpStatus = 401;
      throw error;
    }
    req.auth = tokenInfo;
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = authorized;
