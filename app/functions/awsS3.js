const AWS = require('aws-sdk');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

AWS.config.credentials.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.credentials.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
AWS.config.region = process.env.AWS_REGION;
const s3 = new AWS.S3({ apiVersion: '2006-03-01', signatureVersion: 'v4' });

const params = {
  Bucket: process.env.AWS_S3_BUCKET_NAME
};

async function upload(file) {
  const fileExtention = path.extname(file.originalname);
  const fileName = path.basename(file.originalname);
  const key = `${fileName}-${uuidv4()}${fileExtention}`;

  const uploadParamsThumb = { Bucket: process.env.AWS_S3_BUCKET_NAME, Key: key, Body: file.buffer };
  try {
    return await new Promise((resolve, reject) => {
      s3.upload(uploadParamsThumb, function (err, data) {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        if (data) {
          resolve(data);
        }
      });
    });
  } catch (e) {
    console.error(e);
  }
}

async function remove(key) {
  s3.deleteObject({ ...params, Key: key }, (err) => {
    if (err) console.error(err, err.stack);
  });
}

module.exports = {
  upload,
  remove,
};
