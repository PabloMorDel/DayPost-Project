require('dotenv').config();
const app = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const entryExists = require('./middlewares/entryExists');
const app = express();
const { PORT } = process.env;
