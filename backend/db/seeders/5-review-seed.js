'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: "A bit dark but overall a nice authentic experience",
        stars: 3,
      },
      {
        spotId: 1,
        userId: 3,
        review: "The nature here is insane. Convenience is super nice, I like it",
        stars: 4
      },
      {
        spotId: 2,
        userId: 2,
        review: "They didn't tell me it was haunted",
        stars: 1
      },
      {
        spotId: 2,
        userId: 3,
        review: "Extremely peaceful and lots of natural light",
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: "Really really bad management, out of water and hot water for 2 days and nobody come to fix this.",
        stars: 2
      },
      {
        spotId: 3,
        userId: 2,
        review: "Worst onsen I have ever stayed at in my life!!! water problems every now and then which completely shuts off water for whole day and what we get is just sorry for the inconveniences email from management.",
        stars: 1
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {});
  }
};