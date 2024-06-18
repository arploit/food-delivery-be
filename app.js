let express = require('express');
let server = express();
const router = express.Router();
let { MongoClient } = require('mongodb');
let bodyParser = require('body-parser');

const { Signup, Login } = require('./src/routes/Login/index');
const { Upload } = require('./src/routes/Food/index');

let port = 3000;

debugger;
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// let client = new MongoClient('mongodb://localhost:27017/');

let url = 'mongodb://localhost:27017/Person';

debugger;
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

server.use(router);

// region Routes
router.post('/signup', Signup);
router.post('/login', Login);
router.post('/food/upload', Upload);

server.get('/', (req, res) => {
  res.send('Hello world');
});

server.listen(port, (e) => {
  console.log('connection succesfull on port:', port);
});

// exports.server = server;
