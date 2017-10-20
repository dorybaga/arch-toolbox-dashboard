const express = require('express');
const router = express.Router();
const { Comments, Images, Pins, Projects, Schematics, Users } = require('../../models');


router.get('/users', (req, res) => {
  Users.findAll()
  .then( (users) => {
    return res.json(users);
  });
});

router.get('/users/:id', (req, res) => {
  let userId = req.params.id;
  Users.findById(userId, {
    attributes: ['id', 'firstName', 'lastName'],
    include: [
      {
        model: Projects,
        attributes: ['title', 'address'],
      }
    ]
  })
  .then( (result) => {
    res.json(result);
  });
});


router.post('/users', (req, res) => {
  return Users.create({
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


router.post('/login', (req, res) => {
  return Users.findOne({ where: { email: req.body.email } })
  .then( (user) => {
    if (!user) {
      return res.json('Invalid Login');
    }
    return res.json(user);
  });
});


module.exports = router;