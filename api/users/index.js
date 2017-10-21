const express = require('express');
const router = express.Router();
const { Comments, Images, Pins, Projects, Schematics, Users } = require('../../models');

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');

// const saltRound = 10;

// // Create/add new user to database
// router.route('/signup')
//   .post( (req, res) => {
//     bcrypt.genSalt(saltRound)
//       .then( (salt) => {
//         bcrypt.hash(req.body.password, salt)
//           .then( (hash) => {
//             console.log(hash);
//             User.create({
//               email: req.body.email,
//               password: hash
//             }).then( () => {
//               console.log('Inserted new user');
//               res.end();
//             }).catch( (err) => {
//               console.log(err);
//             });
//           });
//       })
//       .catch( (err) => {
//         console.log(err);
//       });
//     res.redirect('/');
//   });


router.get('/users', (req, res) => {
  Users.findAll()
  .then( (users) => {
    return res.json(users);
  });
});

router.route('/users/:id')
  .get( (req, res) => {
    let userId = req.params.id;
    Users.findById(userId, {
      attributes: ['id', 'firstName', 'lastName'],
      include: [
        {
          model: Projects,
          attributes: ['title', 'address']
        }
      ]
    })
    .then( (result) => {
      res.json(result);
    });
  })
  .delete( (req, res) => {
    Users.destroy({
      where: {
        id: req.params.id
      }
    })
    .then( (data) => {
      console.log('Deleted User');
      res.end();
    })
    .catch( (err) => {
      console.log(err);
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
