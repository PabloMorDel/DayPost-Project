require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();
const { PORT } = process.env;

//Logger
app.use(morgan('dev'));

//Deserializer raw body

app.use(express.json());
//Deserializer form-data

app.use(fileUpload());

/*
#######################
#### MIDDLEWARES ######
#######################
 */

const { userExists, postExists } = require('./middlewares');

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
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
