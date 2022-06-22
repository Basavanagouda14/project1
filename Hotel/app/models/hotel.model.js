module.exports = (sequelize, Sequelize) => {
    const Hotel = sequelize.define("hotel", {
      hotel_name: {
        type: Sequelize.STRING
      },
      hotel_address: {
        type: Sequelize.STRING
      },
      Rooms_available: {
        type: Sequelize.STRING
      }
    });
  
    return Hotel;
  };
  