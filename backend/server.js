require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const { PORT } = process.env;

//Logger
app.use(morgan('dev'));

//Deserializer raw body

app.use(express.json());
//Deserializer form-data

app.use(fileUpload());
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
/*
#######################
#### MIDDLEWARES ######
#######################
 */

const userExists = require('./middlewares/userExists');
const postExists = require('./middlewares/postExists');
const authorized = require('./middlewares/authorized');
/*
##############################
#### ENDPOINTS USUARIOS ######
##############################
 */

//Imports
const {
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
  editUserAvatar,
  editUserPortrait,
} = require('./controllers/users');

app.post('/users', newUser);
app.post('/users/login', loginUser);
app.get('/users/:idUser', authorized, userExists, getUser);
app.delete('/users/:idUser', authorized, userExists, deleteUser);
app.get('/users/validate/:registrationCode', validateUser);
app.put('/users/email/:idUser', authorized, userExists, editUserEmail);
app.put('/users/biography/:idUser', authorized, userExists, editUserBiography);
app.put('/users/accName/:idUser', authorized, userExists, editUserAccName);
app.put('/users/password/:idUser', authorized, editUserPass);
app.put('/users/recover/password', recoverUserPass);
app.put('/users/reset/password', resetUserPass);
app.put('/users/avatar/:idUser', authorized, userExists, editUserAvatar);
app.put('/users/portrait/:idUser', authorized, userExists, editUserPortrait);

/*
###########################
#### ENDPOINTS POSTS ######
###########################
 */

//Imports
const {
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
  likePost,
} = require('./controllers/posts');
app.post('/posts/new', authorized, newPost);
app.get('/posts/:idPost', postExists, getPost);
app.delete('/posts/:idPost', authorized, postExists, deletePost);
app.put('/posts/title/:idPost', authorized, postExists, editPostTitle);
app.put(
  '/posts/description/:idPost',
  authorized,
  postExists,
  editPostDescription
);
app.put('/posts/source/:idPost', authorized, postExists, editPostSource);
app.post('/posts/images/:idPost', authorized, postExists, addPostPhoto);
app.get('/posts/photo/:idPost', authorized, postExists, getPostPhoto);
app.delete('/images/:idPost', authorized, postExists, deletePostPhoto);
app.get('/posts', listPosts);
app.get('/search/posts', listPosts);
app.post('/posts/like/:idPost', authorized, postExists, likePost);
//Errors
app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(error.httpStatus || 500);
  res.send({
    status: 'error',
    message: error.message,
  });
});
app.use((req, res) => {
  res.status(404);
  res.send({
    status: 'error',
    message: 'Ruta no encontrada',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
