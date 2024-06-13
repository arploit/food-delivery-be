const { validateUser } = require('../../utils/helper');
let { MongoClient } = require('mongodb');

let url = 'mongodb://localhost:27017/';

const dbName = 'Person';
const Signup = async (request, response) => {
  try {
    const client = await MongoClient.connect(url);
    const users = client.db(dbName).collection('Users');
    const isUserExistQuery = {
      userName: request.body.userName,
      emailId: request.body.emailId,
    };
    const result = await users.find(isUserExistQuery).toArray();
    console.log('result', result);
    if (result.length) {
      response.status(400).send('User Already exist');
      return;
    }

    const isUserValid = validateUser(request.body);

    if (isUserValid.status) {
      users.insertOne({ ...request.body });
      response.send('Signup Successfull');
    } else {
      response.status(400).json({ message: 'Unable to Signup' });
    }
  } catch (e) {
    response.send(e);
  }
};

module.exports = Signup;
