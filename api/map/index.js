const express = require('express');
const router = express.Router();
const { Comments, Images, Pins, Projects, Schematics, Users } = require('../../models');


router.get('/projects', (req,res) => {
   Projects.findAll({
    include: [
      {model: Schematics,
        include: [{ model: Pins,
          include: [{ model: Images, include: [{ model: Users}]},{ model: Comments, include: [{ model: Users}]}, {model: Users}]
         }]
      }
    ]
   })
   .then( (project) => {
      function result () {
        return  project.map( (proj) => {

          var obj = {};
          proj.Schematic.Pins.map( (pin) => {
             console.log(Object.keys(pin));

           obj = {
              id: pin.id,
              x: pin.x,
              y: pin.y,
              isActive: pin.isActive,
              width: pin.width,
              height: pin.height,
              isPositionOutside: pin.isPositionOutside,
              isMouseDetected: pin.isMouseDetected,
              isTouchDetected: pin.isTouchDetected,
              createdAt: pin.createdAt,
              updatedAt: pin.updatedAt,
              schematic_id: pin.schematic_id,
              images: pin.Images,
              comments: pin.Comments,
              user: pin.User
            };
          }) ;

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
           pin: obj
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

router.post('/pins', (req, res) => {
  return Pins.create({
    x: parseInt(req.body.x),
    y: parseInt(req.body.y),
    isActive: req.body.isActive,
    width: parseInt(req.body.width),
    height: parseInt(req.body.height),
    isPositionOutside: req.body.isPositionOutside,
    isMouseDetected: req.body.isMouseDetected,
    isTouchDetected: req.body.isTouchDetected,
    user_id: parseInt(req.body.user_id),
    schematic_id: parseInt(req.body.schematic_id)
  })
  .then( (pin) => {
    return res.json(pin);
  })
  .catch( (err) => {
    console.log('Invalid Pin');
  });

});

router.post('/images', (req, res) => {
  return Images.create({
    image_url: req.body.image_url,
    pin_id: parseInt(req.body.pin_id),
    user_id: parseInt(req.body.user_id)
  })
  .then( (image) => {
    return res.json(image);
  })
  .catch( (err) => {
    console.log(err);
  });
});

router.post('/comments', (req, res) => {
  return Comments.create({
    body: req.body.body,
    pin_id: parseInt(req.body.pin_id),
    user_id: parseInt(req.body.user_id)
  })
  .then( (body) => {
    return res.json(body);
  })
  .catch( (err) => {
    console.log(err);
  });
});


module.exports = router;

