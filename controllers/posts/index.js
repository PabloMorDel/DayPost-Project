const addPostPhoto = require('./addPostPhoto');
const deletePost = require('./deletePost');
const deletePostPhoto = require('./deletePostPhoto');
const editPostDescription = require('./editPostDescription');
const editPostSource = require('./editPostSource');
const editPostTitle = require('./editPostTitle');
const getPost = require('./getPost');
const getPostPhoto = require('./getPostPhoto');
const newPost = require('./newPost');
const listPosts = require('./listPost');

module.exports = {
    newPost,
    getPost,
    deletePost,
    editPostTitle,
    editPostDescription,
    editPostSource,
    addPostPhoto,
    getPostPhoto,
    deletePostPhoto,
    listPosts,
};
