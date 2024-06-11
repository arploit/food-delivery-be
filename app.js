let express = require('express');
let server = express();
const router = express.Router();
const { throws } = require('assert');
let { MongoClient } = require('mongodb');
let bodyParser = require('body-parser');

const Signup = require('./src/routes/Login/Signup');
let port = 3000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// let client = new MongoClient('mongodb://localhost:27017/');

let url = 'mongodb://localhost:27017/Person';

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  let dbo = db.db('Persons');
  dbo.createCollection('Users', (err, res) => {
    if (err) throw err;
    console.log('Collection Created');
    db.close();
  });
  //   db.close();
});

server.get('/', (req, res) => {
  res.send('Hello world');
});

server.use('/', router);

router.post('/signup', Signup);
server.listen(port, (e) => {
  console.log('connection succesfull on port:', port);
});

exports.server = server;
