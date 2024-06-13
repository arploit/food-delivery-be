const { connectDB } = require('../../utils/helper');

const Login = async (request, response) => {
  let { userName, password } = request.body;
  try {
    // debugger;
    const client = await connectDB();
    const Users = client.db('Person').collection('Users');
    const userNameQuery = { userName: request.body.userName };
    //   const userPassword = { password: request.body.password };

    let isUserNameExist = await Users.find(userNameQuery).toArray();
    if (
      isUserNameExist.length === 1 &&
      isUserNameExist[0].userName === userName &&
      isUserNameExist[0].password === password
    ) {
      response.status(200).json({ message: 'Login Successfull' });
      return;
    }
    response.status(400).json({ message: 'Wrong Password Please verify!' });
  } catch (e) {
    response.status(400).json({ message: 'Error while Login Please wait' });
    console.log('Login Error', e);
  }
};

module.exports = Login;
