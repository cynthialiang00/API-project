'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '484 Wild Cherry Terrace',
        city: 'Sunnyvale',
        state: 'California',
        country: 'United States',
        lat: 35.67,
        lng: 110.99,
        name: '484 Wild Cherry Townhouse',
        description: 'New townhouse walkable distance to Costco, Lawrence Station',
        price: 2000
      },
      {
        ownerId: 2,
        address: '97 Esfahan Dr',
        city: 'San Jose',
        state: 'California',
        country: 'United States',
        lat: 37.29, 
        lng: 120.85,
        name: '97 Esfahan Dr Townhouse',
        description: 'Townhouse in beautiful neighborhood next to communications hills',
        price: 800
      },
      {
        ownerId: 3,
        address: '312 Gates Dr',
        city: 'Milpitas',
        state: 'California',
        country: 'United States',
        lat: 40.41,
        lng: 131.89,
        name: 'Eleanor Apartment for Rent',
        description: 'Newly built in 2021, modern luxury apartments',
        price: 3000
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {});
  }
};
