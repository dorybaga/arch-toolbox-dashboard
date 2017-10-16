const express = require('express');
const router = express.Router();
const { Comments, Images, Pins, Projects, Schematics, Users } = require('../../models');


router.get('/users', (req, res) => {
  Users.findAll({ attributes: ['id', 'firstName'] })
  .then( (users) => {
    return res.json(users);
  });
});

// router.get('/users/:id', (req, res) => {
//   let userId = req.params.id;
//   return Users.findById(userId, {
//     attributes: ['id', 'firstName'],
//     include: [
//       {
//         model: Messages,
//         attributes: ['body', 'createdAt'],
//         include: [
//           {
//             model: Topics,
//             attributes: ['name', 'id']
//           }
//         ]
//       }
//     ]
//   })
//   .then( (result) => {
//     res.json(result);
//   });
// });


router.post('/users', (req, res) => {
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