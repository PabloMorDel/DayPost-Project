const newUser = require('./newUser');
const loginUser = require('./loginUser');
const getUser = require('./getUser');
const deleteUser = require('./deleteUser');
const validateUser = require('./validateUser');
const editUserEmail = require('./editUserEmail');
const editUserBiography = require('./editUserBiography');
const editUserAccName = require('./editUserAccName');
const editUserPass = require('./editUserPass');
const recoverUserPass = require('./recoverUserPass');
const resetUserPass = require('./resetUserPass');
const getPostPhoto = require('../posts/getPostPhoto');
const editUserAvatar = require('./editUserAvatar');
const editUserPortrait = require('./editUserPortrait');

module.exports = {
  newUser,
  loginUser,
  getUser,
  deleteUser,
  validateUser,
  editUserEmail,
  editUserBiography,
  editUserAccName,
  editUserPass,
  recoverUserPass,
  resetUserPass,
  getPostPhoto,
  editUserAvatar,
  editUserPortrait,
};
