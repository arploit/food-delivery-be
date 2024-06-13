let { MongoClient } = require('mongodb');

const connectDB = async (connectionUrl) => {
  return await MongoClient.connect(url);
};

const validateUser = (requestBody) => {
  console.log(requestBody);
  const { userName, name, address, phoneNumber } = requestBody;

  if (
    typeof userName === String ||
    typeof name === String ||
    typeof address.street === String ||
    typeof address.city === String ||
    typeof address.state === String ||
    typeof address.zip === Int32Array ||
    typeof phoneNumber === Int32Array
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
