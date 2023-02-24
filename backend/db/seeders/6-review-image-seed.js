'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "review-1.com/image1.jpg"
      },
      {
        reviewId: 1,
        url: "review-1.com/image2.jpg"
      },
      {
        reviewId: 2,
        url: "review-2.com/image1.jpg"
      },
      {
        reviewId: 2,
        url: "review-2.com/image2.jpg"
      },
      {
        reviewId: 3,
        url: "review-3.com/image1.jpg"
      },
      {
        reviewId: 3,
        url: "review-3.com/image2.jpg"
      },
      {
        reviewId: 4,
        url: "review-4.com/image1.jpg"
      },
      {
        reviewId: 4,
        url: "review-4.com/image2.jpg"
      },
      {
        reviewId: 5,
        url: "review-5.com/image1.jpg"
      },
      {
        reviewId: 5,
        url: "review-5.com/image2.jpg"
      },
      {
        reviewId: 6,
        url: "review-6.com/image1.jpg"
      },
      {
        reviewId: 6,
        url: "review-6.com/image2.jpg"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options, {});
  }
}
