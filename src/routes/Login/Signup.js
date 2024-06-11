const { connectDB, validateUser } = require('../../utils/helper');

let url = 'mongodb://localhost:27017/';

const dbName = 'Person';
const signup = async (request, response) => {
  try {
    const client = await connectDB(url);
    db = client.db(dbName);
    const users = db.collection('Users');

    const query = { ...request.body };
    const result = await users.find(query).toArray();
    if (result.length) {
      response.send('User Already exist');
    }

    const isUserValid = validateUser(request.body);

    if (isUserValid.status) {
      users.insert({ ...request.body });
      response.send('Signup Successfull');
    } else {
      response.sendStatus(403);
      response.json('Unable to Signup');
    }
  } catch (e) {
    response.send(e);
  }
};

module.exports = signup;
