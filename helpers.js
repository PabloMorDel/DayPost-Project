const { format } = require('date-fns');
const crypto = require('crypto');

function formatDate(date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

function generateRandomValue(min, max) {
  Math.floor(Math.random() * (max - min) + min);
}

function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex');
}

//Schema validator

async function validate(schema, data) {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    error.httpStatus = 400;
    throw error;
  }
}

module.exports = {
  formatDate,
  generateRandomValue,
  validate,
  generateRandomString,
};
