const express = require('express');
const router = express.Router();
const { Comments, Images, Pins, Projects, Schematics, Users } = require('../../models');


router.post('/projects', (req, res) => {
  return Projects.create({
    title: req.body.title,
    address: req.body.address,
    client_name: req.body.client_name,
    job_number: parseInt(req.body.job_number),
  }).then( (project) => {
      res.json(project.dataValues);
   })
  .catch( (err) => {
    console.log(err);
  });
});

router.post('/schematics', (req, res) => {
  return Schematics.create({
    image_url: req.body.image_url,
    project_id: parseInt(req.body.project_id)
  })
  .then( (schematic) => {
    return res.json(schematic);
  })
  .catch( (err) => {
    console.log(err);
  });
});

module.exports = router;