const deletePost = require('./deletePost');
const editPostDescription = require('./editPostDescription');
const editPostSource = require('./editPostSource');
const editPostTitle = require('./editPostTitle');
const getPost = require('./getPost');
const newPost = require('./newPost');

module.exports = {
  newPost,
  getPost,
  deletePost,
  editPostTitle,
  editPostDescription,
  editPostSource,
};
