const express = require('express');
const session = require('express-session');
const sequelize = require('sequelize');
const bp = require('body-parser');
const methodOverride = require('method-override');

const app = express();

const db = require('./models');
const { Comments, Images, Pins, Projects, Schematics, Users } = require('./models');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bp.urlencoded());
app.use(bp.json());
app.use('/api', require('./api/index.js'));

app.get('*', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname });
});



app.get("/dashboard", (req,res) => {
   Projects.findAll({
    include: [
      {model: Schematics,
        include: [{ model: Pins,
          include: [{ model: Images},{ model: Comments}]
         }]
      }
    ]
   })
   .then(project => {
      function result(){
        return  project.map(proj => {
          var obj = {};
          proj.Schematic.Pins.map(pin => {
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
              comments: pin.Comments
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

app.get("/schematics", (req,res) => {
   Schematics.findAll({
    include: [{model: Pins}]
   })
      .then(schematic => {
        res.json(schematic);
      });
});

app.post("/projects", (req, res) => {
  Projects.create({
    title: req.body.title,
    address: req.body.address,
    client_name: req.body.client_name,
    job_number: req.body.job_number,
  }).then((project) => {
      res.json(project.dataValues);
   })
  .catch((err) => {
    console.log(err);
  });
});

app.post('/users', (req, res) => {
  Users.create({
   firstName: req.body.firstName,
   lastName: req.body.lastName,
   email: req.body.email,
   password: req.body.password,
   user_role: req.body.user_role
 })
  .then( (user) => {
    return res.json(user);
  });
});




app.post('/schematics', (req, res) => {
  return Schematics.create({
    image_url: req.body.image_url,
    project_id: req.body.project_id
  })
  .then( (schematic) => {
    return res.json(schematic);
  });
});

app.post('/pins', (req, res) => {
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

app.post('/images', (req, res) => {
  return Images.create({
    image_url: req.body.image_url,
    pin_id: req.body.pin_id
  })
  .then( (image) => {
    return res.json(image);
  });
});

app.post('/comments', (req, res) => {
  return Comments.create({
    body: req.body.body,
    pin_id: req.body.pin_id

  })
  .then( (body) => {
    return res.json(body);
  });
});


app.listen(PORT, () => {
  db.sequelize.sync();
  // db.sequelize.sync({force:true});
  console.log(`Server running on ${PORT}`);
});
