const express = require('express');
const router = express.Router();
const { Comments, Images, Pins, Projects, Schematics, Users } = require('../../models');


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
    },
    include: [
      {model: Schematics,
        include: [{ model: Pins,
          include: [{ model: Images, include: [{ model: Users }]}, { model: Comments, include: [{ model: Users }]}, { model: Users }]
         }]
      }
    ]
  })
  .then( (data) => {
    console.log('Deleted Project');
    res.end();
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

router.delete('/schematics/:id', (req, res) => {
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

module.exports = router;