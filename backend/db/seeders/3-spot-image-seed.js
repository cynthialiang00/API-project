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
        url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6e487c2a-00a9-462e-b2b6-462a7dfb8125/dee0k33-ec632282-aec6-43ab-b754-7d3b32f4ab72.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZlNDg3YzJhLTAwYTktNDYyZS1iMmI2LTQ2MmE3ZGZiODEyNVwvZGVlMGszMy1lYzYzMjI4Mi1hZWM2LTQzYWItYjc1NC03ZDNiMzJmNGFiNzIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.abVzl7ltiZM_Wu1x41klIwF3yUsHv6FYVJL8eaFHQ2A",
        preview: false
      },
      {
        spotId: 1,
        url: "https://th-thumbnailer.cdn-si-edu.com/qwdFU8TzPixEtFzRLC2V_Ezr2tw=/fit-in/1600x0/https%3A%2F%2Ftf-cmsv2-smithsonianmag-media.s3.amazonaws.com%2Ffiler%2Fd5%2F24%2Fd5243019-e0fc-4b3c-8cdb-48e22f38bff2%2Fistock-183380744.jpg",
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
