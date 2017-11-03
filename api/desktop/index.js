const express = require('express');
const router = express.Router();
const { Comments, Images, Pins, Projects, Schematics, Users, UserProjectJoin } = require('../../models');


router.post('/projects', (req, res) => {
  return Projects.create({
    title: req.body.title,
    address: req.body.address,
    client_name: req.body.client_name,
    job_number: parseInt(req.body.job_number),
    creator: req.body.creator
  })
  .then( (project) => {
      res.json(project.dataValues);
   })
  .catch( (err) => {
    console.log(err);
  });
});

router.delete('/projects/:id', (req, res) => {
  Projects.destroy({
    where: {
      id: req.params.id
    }
  })
  .then( (data) => {
    console.log('Deleted Project');
    res.end();
  })
  .catch( (err) => {
    console.log(err);
  });
});

router.post('/projects/:id/schematics', (req, res) => {
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

router.delete('/projects/:id/schematics/:id', (req, res) => {
  Schematics.destroy({
    where: {
      id: req.params.id
    },
    include: [{ model: Pins }]
  })
  .then( (data) => {
    console.log('Deleted Schematic');
    res.end();
  })
  .catch( (err) => {
    console.log(err);
  });
});

router.post('/projects/:id/members', (req, res) => {
  return UserProjectJoin.create({
    project_id: req.params.project_id,
    user_id: req.params.user_id
  })
  .then( (joint) => {
    return res.json(joint);
  })
  .catch( (err) => {
    console.log(err);
  });
});

module.exports = router;