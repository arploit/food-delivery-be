const { connectDB } = require('../../utils/helper');

const getFood = async (request, response) => {
  try {
    const { hotel } = request.query;
    if (hotel && hotel.length) {
      const client = await connectDB();
      const currentHotel = client.db('hotel').collection(hotel);
      let result = await currentHotel.find().toArray();
      if (result.length) {
        response.status(202).json({ menuItems: result });
      } else throw new Error('No Result found!');
    } else throw new Error('Hotel Name not found. Try Again!');
  } catch (error) {
    console.log('error', error);
    response.status(404).json({
      messageBody: error.message.length
        ? error.message
        : 'There is a error. Please try again later',
    });
  }
};

module.exports = getFood;
