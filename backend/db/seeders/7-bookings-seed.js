'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        startDate: new Date("2023-06-14"),
        endDate: new Date("2023-06-20"),
      },
      {
        spotId: 1,
        userId: 2,
        startDate: new Date("2023-06-05"),
        endDate: new Date("2023-06-07"),
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date("2023-07-08"),
        endDate: new Date("2023-07-10"),
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date("2023-06-14"),
        endDate: new Date("2023-06-18"),
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date("2023-06-19"),
        endDate: new Date("2023-06-24"),
      },
      {
        spotId: 3,
        userId: 2,
        startDate: new Date("2023-07-04"),
        endDate: new Date("2023-07-06"),
      },
      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, {});
  }
};