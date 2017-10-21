const express = require('express');
const router = express.Router();
const { Comments, Images, Pins, Projects, Schematics, Users } = require('../../models');

router.get('/projects', (req,res) => {
   var id = parseInt(req.params.id);
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

        return {
           project:{
                id: proj.id,
                title: proj.title,
                address: proj.address,
                job_number: proj.job_number,
                client_name: proj.client_name,
                creator:proj.creator,
                updatedAt: proj.updatedAt,
                createdAt: proj.createdAt
           }
          };
        });
      }
    res.json(result());
  });
});

router.get('/projects/:id', (req,res) => {
   var id = parseInt(req.params.id);
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
        return  project.filter(proj => proj.id === id).map( (proj) => {
          var final ={};
          var obj = {};

          if(!proj.Schematic){
            final = {
               project:{
                    id: proj.id,
                    title: proj.title,
                    address: proj.address,
                    job_number: proj.job_number,
                    client_name: proj.client_name,
                    creator:proj.creator,
                    updatedAt: proj.updatedAt,
                    createdAt: proj.createdAt
               }
             };
          }
          else if(!proj.Schematic.Pins){
              final = {
                project:{
                    id: proj.id,
                    title: proj.title,
                    address: proj.address,
                    job_number: proj.job_number,
                    client_name: proj.client_name,
                    creator:proj.creator,
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

          }
          else{
            proj.Schematic.Pins.map( (pin) => {
               var images = [];
               var comments = [];
               if(pin.Images){
                images = pin.Images;
               }
               if(pin.Comments){
                comments = pin.Comments;
               }

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
                images: images,
                comments: comments,
                user: pin.User
              };
            }) ;
             final = {
               project:{
                    id: proj.id,
                    title: proj.title,
                    address: proj.address,
                    job_number: proj.job_number,
                    client_name: proj.client_name,
                    creator:proj.creator,
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
          }

        return final;
        });
      }
    res.json(result());
  });
});


router.get('/projects/:project_id/gallery', (req,res) => {
   var project_id = parseInt(req.params.project_id);
   var pin_id = parseInt(req.params.pin_id);
   Projects.findAll({
    include: [
      {model: Schematics,
        include: [{ model: Pins,
          include: [{ model: Images, include: [{ model: Users}]}]
         }]
      }
    ]
   })
  .then( (pin) => {
   function result () {
      return  pin.filter(proj => proj.id === project_id).map( (proj) => {
        var obj = {};
        proj.Schematic.Pins.map( (pin) => {
           obj = {
              images: pin.Images,
            };
        });

      return obj;
      });
    }
  res.json(result());
 });
});

router.get('/projects/:project_id/comments', (req,res) => {
   var project_id = parseInt(req.params.project_id);
   var pin_id = parseInt(req.params.pin_id);
   Projects.findAll({
    include: [
      {model: Schematics,
        include: [{ model: Pins,
          include: [{ model: Comments, include: [{ model: Users}]}]
         }]
      }
    ]
   })
  .then( (pin) => {
   function result () {
      return  pin.filter(proj => proj.id === project_id).map( (proj) => {
        var obj = {};
        proj.Schematic.Pins.map( (pin) => {
           obj = {
              comments: pin.Comments,
            };
        });

      return obj;
      });
    }
  res.json(result());
 });
});


router.get('/projects/:project_id/pin/:pin_id', (req,res) => {
   var project_id = parseInt(req.params.project_id);
   var pin_id = parseInt(req.params.pin_id);
   Projects.findAll({
    include: [
      {model: Schematics,
        include: [{ model: Pins,
          include: [{ model: Images, include: [{ model: Users}]},{ model: Comments, include: [{ model: Users}]}, {model: Users}]
         }]
      }
    ]
   })
  .then( (pin) => {
   function result () {
        return  pin.filter(proj => proj.id === project_id).map( (proj) => {

          var obj = {};
          proj.Schematic.Pins.filter(pin => pin.id === pin_id).map( (pin) => {


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
          });

        return obj;
        });
      }
    res.json(result());
  });
});

router.put("/projects/:id/gallery", (req,res) => {
  Projects.update(req.title,
  {
    where: {
      id: parseInt(req.params.id)
    }
  });
  res.end();
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

// router.get('/projects/:id', (req,res) => {
//    var id = parseInt(req.params.id);
//    Projects.findAll({
//     include: [
//       {model: Schematics,
//         include: [{ model: Pins,
//           include: [{ model: Images, include: [{ model: Users}]},{ model: Comments, include: [{ model: Users}]}, {model: Users}]
//          }]
//       }
//     ]
//    })
//    .then( (project) => {
//     function result () {
//       return  project.filter(proj => proj.id === id).map( (proj) => {
//          var pin = {};
//           proj.Schematic.Pins.map((pin) => {
//                pin = {
//                   id: pin.id,
//                   x: pin.x,
//                   y: pin.y,
//                   isActive: pin.isActive,
//                   width: pin.width,
//                   height: pin.height,
//                   isPositionOutside: pin.isPositionOutside,
//                   isMouseDetected: pin.isMouseDetected,
//                   isTouchDetected: pin.isTouchDetected,
//                   createdAt: pin.createdAt,
//                   updatedAt: pin.updatedAt,
//                   schematic_id: pin.schematic_id,
//                   images: pin.Images,
//                   comments: pin.Comments,
//                   user: pin.User
//                };
//             });

//         var project = {};
//         var schematic ={};


//         if(!proj.id){
//           project = {};
//         }else{
//          project = {
//             id: proj.id,
//             title: proj.title,
//             address: proj.address,
//             job_number: proj.job_number,
//             client_name: proj.client_name,
//             creator:proj.creator,
//             updatedAt: proj.updatedAt,
//             createdAt: proj.createdAt
//          };
//         }

//         if(!proj.Schematic.id){
//           schematic ={};
//         }else{
//          schematic =  {
//             id: proj.Schematic.id,
//             image_url: proj.Schematic.image_url,
//             updatedAt: proj.Schematic.updatedAt,
//             createdAt: proj.Schematic.createdAt
//          };
//         }

//         // if(!proj.id){
//         //     pin = {};
//         // }

//       return {
//          project: project,
//          schematic: schematic,
//          pin: pin
//         };
//       });
//      }
//    res.json(result());
//   });
// });