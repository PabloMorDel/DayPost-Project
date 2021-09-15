const { format } = require('date-fns');
const crypto = require('crypto');
const { ensureDir } = require('fs-extra');
const { unlink } = require('fs');
const path = require('path');
const sharp = require('sharp');
const uploadsDir = path.join(__dirname, process.env.UPLOADS_DIRECTORY);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

//Saving and deleting photos(Avatars/portraits)

async function savePhoto(image) {
  await ensureDir(uploadsDir);
  const sharpImage = sharp(image.data);
  const imageInfo = await sharpImage.metadata();
  const { format } = imageInfo;
  if (
    format !== 'png' &&
    format !== 'jpg' &&
    format !== 'jpeg' &&
    format !== 'gif'
  ) {
    const error = new Error('Image file format is not supported');
    error.httpStatus = 403;
    throw error;
  }
  const IMAGE_MAX_WIDTH = 1000;
  if (imageInfo.width > IMAGE_MAX_WIDTH) {
    sharpImage.resize(IMAGE_MAX_WIDTH);
  }
  const imageString = generateRandomString(20);
  const imageName = `${imageString}.jpg`;
  const imagePath = path.join(uploadsDir, imageName);
  await sharpImage.toFile(imagePath);
  return imageName;
}
async function deletePhoto(imageName) {
  await ensureDir(uploadsDir);
  const imagePath = path.join(uploadsDir, imageName);
  await unlink(imagePath);
}

async function sendMail({ to, subject, body }) {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM,
    subject,
    text: body,
    html: `
      <div>
        <h1>${subject}</h1>
        <p>${body}</p>
      </div>
    `,
  };
  await sgMail.send(msg);
}

module.exports = {
  formatDate,
  generateRandomValue,
  validate,
  generateRandomString,
  savePhoto,
  deletePhoto,
  sendMail,
};
