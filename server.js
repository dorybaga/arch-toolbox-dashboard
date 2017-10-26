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

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('*', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname });
});

app.listen(PORT, () => {
  db.sequelize.sync();
  //db.sequelize.sync({force:true});
  console.log(`Server running on ${PORT}`);
});


// ALTER TABLE "Pins"
// ADD CONSTRAINT "Pins_projects_id_fkey" FOREIGN KEY ("project_id")
// REFERENCES "Projects" (id) MATCH SIMPLE
// ON DELETE CASCADE;
