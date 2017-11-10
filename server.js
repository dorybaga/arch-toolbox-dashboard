const express = require('express');
const session = require('express-session');
const sequelize = require('sequelize');
const bp = require('body-parser');
const methodOverride = require('method-override');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const RedisStore = require('connect-redis')(session);
const CONFIG = require('./config/config.json');


const bcrypt = require('bcrypt');

const app = express();

const db = require('./models');
const {
  Comments,
  Images,
  Pins,
  Projects,
  Schematics,
  Users,
  UserProjectJoin
} = require('./models');

const PORT = process.env.PORT || 3000;


app.use(express.static('public'));
app.use(bp.urlencoded());
app.use(bp.json());
app.use('/api', require('./api/index.js'));

// Redis Sessions
app.use(session ({
  store: new RedisStore(),
  secret: CONFIG.SESSION_SECRET,
  name: 'foundation_session',
  cookie: {
    maxAge: 1000000,
  },
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport
passport.use(
  new LocalStrategy(function(email, password, done) {
    Users.findOne({
      where: {
        email: email
      }
    })
      .then(user => {
        if (user !== null) {
          bcrypt
            .compare(password, user.password)
            .then(result => {
              if (result) {
                console.log('Username and password correct!');
                console.log(user);
                return done(null, user);
              } else {
                console.log('Password does not match');
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('User not found!');
        }
      })
      .catch(err => {
        console.log(err);
        return done(null, false, { message: 'Incorrect Username' });
      });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
  Users.findOne({
    where: {
      id: userId
    }
  })
    .then(user => {
      return done(null, {
        id: user.id,
        email: user.email
      });
    })
    .catch(err => {
      done(err, user);
    });
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('*', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname });
});

app.listen(PORT, () => {
  db.sequelize.sync();
  // db.sequelize.sync({force:true});

  console.log(`Server running on ${PORT}`);
});
