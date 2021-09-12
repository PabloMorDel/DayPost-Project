const { format } = require('date-fns');

function formatDate(date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

function generateRandomValue(min, max) {
  Math.floor(Math.random() * (max - min) + min);
}

module.exports = { formatDate, generateRandomValue };
