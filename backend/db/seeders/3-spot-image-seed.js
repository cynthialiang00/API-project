'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://ssl.cdn-redfin.com/photo/8/bigphoto/497/ML81231497_3.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "random1-url.com/random.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "random2-url.com/random.png",
        preview: true
      },
      {
        spotId: 2,
        url: "https://ssl.cdn-redfin.com/photo/8/mbphoto/443/genMid.ML81317443_8.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://images1.apartments.com/i2/QmhzIO8KRRL9DWZmiMgE4Wl0QksnOuuhlEqxhCb_GGc/117/eleanor-milpitas-ca-building-photo.jpg?p=1",
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {});
  }
};
