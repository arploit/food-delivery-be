const { connectDB } = require('../../utils/helper');

let hotelDB = 'hotel';

const Upload = async (request, response) => {
  try {
    debugger;
    const { hotelName, menuItems = [] } = request.body;
    if (hotelName.length) {
      const client = await connectDB();
      const hotel = client.db(hotelDB).collection(hotelName);
      if (menuItems instanceof Array && menuItems.length > 0) {
        await hotel.insertMany(menuItems);
        response.status(200).send('Upload Successfull');
      } else throw new Error();
    } else
      throw new Error(
        'Hotel Name Was not found, Please update your Hotel Name First'
      );
  } catch (e) {
    response.status(400).json({
      messageBody: e, //.length ? e : 'Something Went Wrong Please try again',
    });
  }
};

module.exports = Upload;
