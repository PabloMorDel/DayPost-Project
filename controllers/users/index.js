const newUser = require('./newUser');
const loginUser = require('./loginUser');
const getUser = require('./getUser');
const deleteUser = require('./deleteUser');
const validateUser = require('./validateUser');
const editUserEmail = require('./editUserEmail');
const editUserBiography = require('./editUserBiography');
const editUserAccName = require('./editUserAccName');

module.exports = {
  newUser,
  loginUser,
  getUser,
  deleteUser,
  validateUser,
  editUserEmail,
  editUserBiography,
  editUserAccName,
};
