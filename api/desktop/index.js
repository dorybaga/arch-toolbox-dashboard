const express = require("express");
const router = express.Router();
const {
  Comments,
  Images,
  Pins,
  Projects,
  Schematics,
  Users
} = require("../../models");
const http = require("http");
const url = require("url");
const multer = require("multer");
const PORT = process.env.PORT || 3000;

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const { BUCKET_NAME } = require("../../config/config.json");
const fotoBucket = require("../../helpers/aws-foto-bucket.js");

const app = express();
const upload = multer();

const server = http.createServer(app);
app.use(express.static(__dirname + "/public"));

let cachedImages = [];

function loadImages(err, data) {
  console.log(data);
  data.Contents
    .map(image => {
      return Object.assign(image, {
        LastModified: image.LastModified.toString()
      });
    })
    .sort((a, b) => {
      return new Date(a.LastModified) - new Date(b.LastModified);
    })
    .forEach(image => {
      console.log("IMAGE##", image);
      cachedImages.push(
        `https://foundation-devleague.s3-us-west-2.amazonaws.com/${image.Key}`
      );
    });
}

router.post("/projects", (req, res) => {
  return Projects.create({
    title: req.body.title,
    address: req.body.address,
    client_name: req.body.client_name,
    job_number: parseInt(req.body.job_number),
    creator: req.body.creator
  })
    .then(project => {
      res.json(project.dataValues);
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete("/projects/:id", (req, res) => {
  Projects.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      console.log("Deleted Project");
      res.end();
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/projects/:id/schematics", upload.single("image"), (req, res) => {
  fotoBucket.upload(req.file, function(err, data) {
    if (err) {
      console.log(err);
      res.json({ statusCode: 500, message: "schematic error" });
    } else {
      console.log(data);
      var url = s3.getSignedUrl("getObject", {
        Bucket: BUCKET_NAME,
        Key: data.Key
      });
      console.log("signed url", url);
      newImageUpload(data.Location);
      res.json({ statusCode: 200, message: "schematic uploaded" });
    }
    return Schematics.create({
      image_url: data.Location,
      project_id: parseInt(req.params.id)
    });
  });
});

router.delete("/projects/:id/schematics/:id", (req, res) => {
  Schematics.destroy({
    where: {
      id: req.params.id
    },
    include: [{ model: Pins }]
  })
    .then(data => {
      console.log("Deleted Schematic");
      res.end();
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/projects/:id/images", upload.single("image"), (req, res) => {
  fotoBucket.upload(req.file, function(err, data) {
    if (err) {
      console.log(err);
      res.json({ statusCode: 500, message: "error uploading photo" });
    } else {
      var url = s3.getSignedUrl("getObject", {
        Bucket: BUCKET_NAME,
        Key: data.Key
      });
      res.json({ statusCode: 200, message: "photo uploaded" });
    }
    return Images.create({
      image_url: data.Location,
      pin_id: parseInt(req.body.pin_id),
      user_id: parseInt(req.body.user_id)
    });
  });
});

module.exports = router;
