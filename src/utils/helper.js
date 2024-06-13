let { MongoClient } = require('mongodb');

const connectDB = async (connectionUrl = 'mongodb://localhost:27017/') => {
  return await MongoClient.connect(connectionUrl);
};

const validateUser = (requestBody) => {
  const { userName, name, address, phoneNumber, emailId } = requestBody;

  if (
    typeof userName === 'string' ||
    typeof name === 'string' ||
    typeof address.street === 'string' ||
    typeof address.city === 'string' ||
    typeof address.state === 'string' ||
    typeof address.zip === 'number' ||
    typeof phoneNumber === 'number' ||
    typeof emailId === 'string'
  ) {
    return {
      status: true,
      requestValue: requestBody,
    };
  }

  return {
    status: false,
  };
};

module.exports = {
  connectDB,
  validateUser,
};
