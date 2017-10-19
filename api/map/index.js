const express = require('express');
const router = express.Router();
const { Comments, Images, Pins, Projects, Schematics, Users } = require('../../models');

<<<<<<< HEAD
module.exports = router;
=======
router.get('/projects', (req,res) => {
   Projects.findAll({
    include: [
      {model: Schematics,
        include: [{ model: Pins,
          include: [{ model: Images},{ model: Comments}]
         }]
      }
    ]
   })
      .then( (project) => {
        function result(){
          return  project.map( (proj) => {

            return {
              project:{
                  id: proj.id,
                  title: proj.title,
                  address: proj.address,
                  job_number: proj.job_number,
                  client_name: proj.client_name,
                  updatedAt: proj.updatedAt,
                  createdAt: proj.createdAt
             },
             schematic: {
                  id: proj.Schematic.id,
                  image_url: proj.Schematic.image_url,
                  updatedAt: proj.Schematic.updatedAt,
                  createdAt: proj.Schematic.createdAt
             },
             pin: {
                id: proj.Schematic.Pins
             }

            };
          });


        }
        res.json(result());
      });
});

router.get('/schematics', (req,res) => {
   Schematics.findAll({
    include: [{model: Pins}]
   })
      .then( (schematic) => {
        res.json(schematic);
      });
});

router.post('/projects', (req, res) => {
  Projects.create({
    title: req.body.title,
    address: req.body.address,
    client_name: req.body.client_name,
    job_number: req.body.job_number,
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
    project_id: req.body.project_id
  })
  .then( (schematic) => {
    return res.json(schematic);
  });
});

router.post('/pins', (req, res) => {
  return Pins.create({
    x: req.body.x,
    y: req.body.y,
    isActive: req.body.isActive,
    width: req.body.width,
    height: req.body.height,
    isPositionOutside: req.body.isPositionOutside,
    isMouseDetected: req.body.isMouseDetected,
    isTouchDetected: req.body.isTouchDetected,
    schematic_id: req.body.schematic_id
  })
  .then( (pin) => {
    return res.json(pin);
  })
  .catch( (err) => {
    console.log(err);
  });

});

router.post('/images', (req, res) => {
  return Images.create({
    image_url: req.body.image_url,
    pin_id: req.body.pin_id
  })
  .then( (image) => {
    return res.json(image);
  });
});

router.post('/comments', (req, res) => {
  return Comments.create({
    body: req.body.body,
    pin_id: req.body.pin_id

  })
  .then( (body) => {
    return res.json(body);
  });
});


module.exports = router;
>>>>>>> 7dde58df88c88be96b17cea4b95807c5b967bd2a
