const aws = require('aws-sdk');
const fs = require('fs');
const mime = require('mime-types');
const env = process.env;

class S3Service {
  constructor() {
    aws.config.update({
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      region: env.AWS_REGION,
    });

    this.s3 = new aws.S3();
  }

  async getSignedReadUrl (key) {

    const cloudFront = new aws.CloudFront.Signer('cloudfront access key', '');

    return new Promise((resolve, reject) => {
      cloudFront.getSignedUrl({
        url: `cloudfront-domain${key}`,
        expires: Math.floor((new Date()).getTime() / 1000) + 1000 || 20
      }, (err, result) => {
        if (err) reject(err);

        resolve(result);
      })
    });
  }

  async uploadFile(name, s3Folder) {
    this.openFileStream(name);

    const key = s3Folder ? `${s3Folder}/${name}` : name;

    return this.s3.upload({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Body: this.fileStream,
      Key: key,
      ContentType: mime.lookup(name)
    }).promise();
  }

  async deleteFile(key) {
    return this.s3.deleteObject({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: key,
    }).promise();
  }

  async deleteFiles(keys) {
    return this.s3.deleteObjects({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Delete: {
        Objects: [...keys],
      },
    }).promise();
  }

  // Create stream to read file
  openFileStream(name) {
    this.fileStream = fs.createReadStream(`${name}`);

    // Check stream for errors
    // eslint-disable-next-line
    this.fileStream.once("error", err => { throw err });
  }
}

module.exports = new S3Service();
