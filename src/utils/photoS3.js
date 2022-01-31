const Aws = require("aws-sdk");

const s3 = new Aws.S3();

const uploadPhotoPost = async (buffer, photo) => {
  const awsUpload = await s3
    .upload(
      {
        Bucket: process.env.S3_BUCKET,
        Key: `${Date.now()}-${photo.originalname}`,
        Body: buffer,
        ACL: "public-read",
        ContentType: "image/jpg image/png",
      },
      (err) => {
        if (err) {
          console.log("Error", err);
        }
      }
    )
    .promise();
  return awsUpload;
};

const deletePhoto = async (key) => {
  s3.deleteObject({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  })
    .promise()
    .then(() => {})
    .catch((err) => {});
};

module.exports = { uploadPhotoPost, deletePhoto };
