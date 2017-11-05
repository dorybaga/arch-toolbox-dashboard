const express = require('express');
const router = express.Router();
const { Comments, Images, Pins, Projects, Schematics, Users } = require('../../models');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


const saltRound = 10;

router.route('/users')
  .post( (req, res) => {
    bcrypt.genSalt(saltRound)
      .then( (salt) => {
        bcrypt.hash(req.body.password, salt)
          .then( (hash) => {
            console.log(hash);
            Users.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
              user_role: req.body.user_role
            }).then( () => {
              console.log('Inserted new user');
              res.end();
            }).catch( (err) => {
              console.log(err);
            });
          });
      })
      .catch( (err) => {
        console.log(err);
      });
    res.redirect('/');
  });

router.route('/users')
  .get( (req, res) => {
    Users.findAll()
    .then( (users) => {
      return res.json(users);
    });
  });

router.route('/users/:id')
  .get( (req, res) => {
    // let userId = req.params.id;
    Users.findAll({
      where: {
        id: req.params.id
      }
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

router.post('/login', (req, res) => {
  return Users.findOne({ where: { email: req.body.email } })
  .then( (user) => {
    if (!user) {
      return res.json('Invalid Login');
    }
    console.log('Login Successful');
    console.log(user);
    return res.json(user);
  });
});

// Check if user is valid
function userAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    console.log('User is good');
    next();
  } else {
    console.log('User not good');
    res.redirect('/user');
  }
}

// router.route('/login')
//   .post(passport.authenticate('local', {
//     successRedirect: '/new',
//     failureRedirect: '/create'
//   }));


module.exports = router;
