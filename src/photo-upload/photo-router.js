require('dotenv').config();
const aws = require('aws-sdk');
const express = require('express');



const photoRouter = express.Router()



photoRouter
.route('/upload')
.get((req, res) => {
  const s3 = new aws.S3();
  const bucket_name = process.env.BUCKET_NAME
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${bucket_name}.s3.amazonaws.com/${fileName}`
    };
    //res.write(JSON.stringify(returnData));
    res.json({returnData})
    res.end();
  });
});

photoRouter
.route('/get-image')
.get((req, res) => {
  const s3 = new aws.S3();
  const bucket_name = process.env.BUCKET_NAME
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Expires: 60,
  };
  s3.getSignedUrl('getObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${bucket_name}.s3.amazonaws.com/${fileName}`
    };
    //res.write(JSON.stringify(returnData));
    res.json({returnData})
    res.end();
  });
});

  module.exports = photoRouter;