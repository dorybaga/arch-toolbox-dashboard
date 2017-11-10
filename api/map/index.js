const express = require('express');
const router = express.Router();
const { Comments, Images, Pins, Projects, Schematics, Users } = require('../../models');
const http = require('http');
const url = require('url');
const multer = require('multer');
const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;


router.get('/projects', (req, res) => {
  var id = parseInt(req.params.id);
  Projects.findAll()
  .then(project => {
    function result () {
      return project.map(proj => {
        return {
          project: {
            id: proj.id,
            title: proj.title,
            address: proj.address,
            job_number: proj.job_number,
            client_name: proj.client_name,
            creator: proj.creator,
            updatedAt: proj.updatedAt,
            createdAt: proj.createdAt
          }
        };
      });
    }
    res.json(result());
  });
});

router.delete('/projects/:id', (req, res) => {
  Projects.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  })
  .then(data => {
    console.log('Deleted');
    res.redirect('/');
  });
});

router.delete('/pin/:id', (req, res) => {
  Pins.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  })
  .then(data => {
    console.log('Deleted');
    res.redirect('/');
  });
});

router.get('/projects/:id', (req, res) => {
  var id = parseInt(req.params.id);
  Projects.findAll({
    include: [
      {
        model: Schematics,
        include: [
          {
            model: Pins,
            include: [
              { model: Images, include: [{ model: Users }] },
              { model: Comments, include: [{ model: Users }] },
              { model: Users }
            ]
          }
        ]
      }
    ]
  })
  .then(project => {
    function result() {
      return project.filter(proj => proj.id === id).map(proj => {
        var final = {};
        var obj = {};

        if (!proj.Schematic) {
          final = {
            project: {
              id: proj.id,
              title: proj.title,
              address: proj.address,
              job_number: proj.job_number,
              client_name: proj.client_name,
              creator: proj.creator,
              updatedAt: proj.updatedAt,
              createdAt: proj.createdAt
            }
          };
        } else if (!proj.Schematic.Pins) {
          final = {
            project: {
              id: proj.id,
              title: proj.title,
              address: proj.address,
              job_number: proj.job_number,
              client_name: proj.client_name,
              creator: proj.creator,
              updatedAt: proj.updatedAt,
              createdAt: proj.createdAt
            },
            schematic: {
              id: proj.Schematic.id,
              image_url: proj.Schematic.image_url,
              updatedAt: proj.Schematic.updatedAt,
              createdAt: proj.Schematic.createdAt
            }
          };
        } else {
          let allPins = proj.Schematic.Pins.map(pin => {
            var images = [];
            var comments = [];
            if (pin.Images) {
              images = pin.Images;
            }
            if (pin.Comments) {
              comments = pin.Comments;
            }

            return {
              id: pin.id,
              x: pin.x,
              y: pin.y,
              createdAt: pin.createdAt,
              updatedAt: pin.updatedAt,
              schematic_id: pin.schematic_id,
              images: images,
              comments: comments,
              user: pin.User
            };
          });
          final = {
            project: {
              id: proj.id,
              title: proj.title,
              address: proj.address,
              job_number: proj.job_number,
              client_name: proj.client_name,
              creator: proj.creator,
              updatedAt: proj.updatedAt,
              createdAt: proj.createdAt
            },
            schematic: {
              id: proj.Schematic.id,
              image_url: proj.Schematic.image_url,
              updatedAt: proj.Schematic.updatedAt,
              createdAt: proj.Schematic.createdAt
            },
            pin: allPins
          };
        }
        return final;
      });
    }
    res.json(result());
  });
});


router.get('/projects/:project_id/comments', (req, res) => {
  var project_id = parseInt(req.params.project_id);
  var pin_id = parseInt(req.params.pin_id);
  Projects.findAll({
    include: [
      {
        model: Schematics,
        include: [
          {
            model: Pins,
            include: [{ model: Comments, include: [{ model: Users }] }]
          }
        ]
      }
    ]
  })
  .then(pin => {
    function result () {
      return pin.filter(proj => proj.id === project_id).map(proj => {
        var obj = {};
        proj.Schematic.Pins.map(pin => {
          obj = {
            comments: pin.Comments
          };
        });

        return obj;
      });
    }
    res.json(result());
  });
});

router.get('/projects/:project_id/pin/:pin_id', (req, res) => {
  var project_id = parseInt(req.params.project_id);
  var pin_id = parseInt(req.params.pin_id);
  Projects.findAll({
    include: [
      {
        model: Schematics,
        include: [
          {
            model: Pins,
            include: [
              { model: Images, include: [{ model: Users }] },
              { model: Comments, include: [{ model: Users }] },
              { model: Users }
            ]
          }
        ]
      }
    ]
  })
  .then(response => {
    console.log(response);
    function result (schematic) {
      return schematic.filter(proj => proj.id === project_id).map(proj => {
        console.log(proj);
        var obj = {};
        proj.Schematic.Pins.filter(pin => pin.id === pin_id).map(pin => {
          obj = {
            id: pin.id,
            x: pin.x,
            y: pin.y,
            createdAt: pin.createdAt,
            updatedAt: pin.updatedAt,
            schematic_id: pin.schematic_id,
            images: pin.Images,
            comments: pin.Comments,
            user: pin.User
          };
        });
        return obj;
      });
    }
    res.json(result(response));
  });
});

router.put('/projects/comments/:id', (req, res) => {
  Comments.update(
    {
      body: req.body.body
    },
    {
      where: {
        id: parseInt(req.params.id)
      }
    }
  )
  .then(data => {
    console.log('complete');
  });
});


router.get('/schematics', (req, res) => {
  Schematics.findAll({
    include: [{ model: Pins }]
  }).then(schematic => {
    res.json(schematic);
  });
});

router.post('/pins', (req, res) => {
  return Pins.create({
    x: parseInt(req.body.x),
    y: parseInt(req.body.y),
    user_id: parseInt(req.body.user_id),

    schematic_id: parseInt(req.body.schematic_id),
    project_id: parseInt(req.body.project_id)
  })
  .then(pin => {
    return res.json(pin);
  })
  .catch(err => {
    console.log('Invalid Pin', { errror: err });
  });
});

// router.post('/images', (req, res) => {
//   return Images.create({
//     image_url: req.body.image_url,
//     pin_id: parseInt(req.body.pin_id),
//     user_id: parseInt(req.body.user_id)
//   })
//   .then(image => {
//     return res.json(image);
//   })
//   .catch(err => {
//     console.log(err);
//   });
// });

// router.post('/projects/:id/images', upload.single('image'), (req, res) => {

//   fotoBucket.upload(req.file, function (err, data){
//     if (err) {
//       console.log(err);
//       res.send('Something went wrong');
//     } else {
//       console.log(data);
//       var url = s3.getSignedUrl('getObject', {
//         Bucket: BUCKET_NAME,
//         Key: data.Key
//       });
//       console.log('signed url', url);
//       newImageUpload(data.Location);
//       res.redirect('/home');
//     }
//       return Images.create({
//         image_url: data.Location,
//         pin_id: parseInt(req.params.id),
//         user_id: parseInt(req.params.id)
//       });
//     });
//   });

router.route('/images')
  .get( (req, res) => {
    Images.findAll()
    .then( (images) => {
      return res.json(images);
    });
  });

router.delete('/images/:id', (req, res) => {
  Images.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    console.log('Deleted Image');
  })
  .catch(err => {
    console.log(err);
  });
});

router.post('/comments', (req, res) => {
  return Comments.create({
    body: req.body.body,
    pin_id: parseInt(req.body.pin_id),
    user_id: parseInt(req.body.user_id)
  })
    .then(body => {
      return res.json(body);
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete('/comments/:id', (req, res) => {
  Comments.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      console.log('Deleted Comment');
      res.end();
    })
    .catch(err => {
      console.log(err);
    });
});


module.exports = router;
