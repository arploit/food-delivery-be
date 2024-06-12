const { validateUser } = require('../../utils/helper');
let { MongoClient } = require('mongodb');

let url = 'mongodb://localhost:27017/';

const dbName = 'Person';
const Signup = async (request, response) => {
  try {
    const client = await MongoClient.connect(url);
    const users = client.db(dbName).collection('Users');
    const query = { ...request.body };
    const result = await users.find(query).toArray();
    console.log('result', result, result.length);
    if (result.length) {
      console.log('inside if');
      response.sendStatus(400).send('User Already exist');
      return;
    }

    const isUserValid = validateUser(request.body);

    if (isUserValid.status) {
      users.insert({ ...request.body });
      response.send('Signup Successfull');
    } else {
      response.sendStatus(400).json({ message: 'Unable to Signup' });
    }
  } catch (e) {
    response.send(e);
  }
};

module.exports = Signup;
