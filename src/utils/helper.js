let { MongoClient } = require('mongodb');

const connectDB = async (connectionUrl) => {
  return await MongoClient.connect(url);
};

const validateUser = (requestBody) => {
  const { userName, name, address, phoneNumber } = requestBody;

  if (
    typeof userName === 'string' ||
    typeof name === 'string' ||
    typeof address.street === 'string' ||
    typeof address.city === 'string' ||
    typeof address.state === 'string' ||
    typeof address.zip === 'number' ||
    typeof phoneNumber === 'number'
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
