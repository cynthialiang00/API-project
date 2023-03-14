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
        address: '999-4333 Ginzanshinhata',
        city: 'Obanazawa',
        state: 'Yamagata',
        country: 'Japan',
        lat: 38.573010044007745,
        lng: 140.52973227558422,
        name: 'Ginzanso',
        description: 'Located in the Ginzan Onsen district, the property provides guests with access to a hot spring bath.',
        price: 231
      },
      {
        ownerId: 2,
        address: 'Kinosakicho Yushima',
        city: 'Toyooka',
        state: 'Hyogo',
        country: 'Japan',
        lat: 35.65235433322414,
        lng: 134.80909400350833,
        name: 'Kinosaki Onsen',
        description: 'Quaint resort town in a mountain valley with 7 public hot springs, ryokan inns & Onsenji Temple.',
        price: 300
      },
      {
        ownerId: 3,
        address: 'Fujiwara',
        city: 'Minakami',
        state: 'Gunma',
        country: 'Japan',
        lat: 36.84864816846293,
        lng: 139.04983818943683,
        name: 'Takaragawa Onsen Osenkaku',
        description: "The world class large capacity open spa is located on Osenkaku and upstream of Tonaegawa.It follows the stream of Takaraga into the beautiful lodging inside the great nature",
        price: 197
      },
      {
        ownerId: 1,
        address: 'Shima',
        city: 'Nakanojo',
        state: 'Gunma',
        country: 'Japan',
        lat: 36.675398503887244,
        lng: 138.7851217153442,
        name: 'Shima Onsen Kashiwaya Ryokan',
        description: "Shima Onsen Kashiwaya Ryokan is a Japanese style small inn with tattoo friendly private onsen, Japanese Cuisine.",
        price: 299
      },
      {
        ownerId: 2,
        address: 'Arimacho, Kita Ward',
        city: 'Kobe',
        state: 'Hyogo',
        country: 'Japan',
        lat: 34.79983778565903,
        lng: 135.24943805133918,
        name: 'Arima Onsen',
        description: 'With more than 1000 years history, Arima Onsen has become an unique hot spring retreat place in Japan.',
        price: 231
      },
      {
        ownerId: 3,
        address: 'Tsurunoyu Onsen, Nyūtō Onsen Village',
        city: 'Semboku',
        state: 'Akita',
        country: 'Japan',
        lat: 39.80586465427658,
        lng: 140.78113384498124,
        name: 'Tsuru no yu',
        description: 'Tsurunoyu Onsen features four baths, each with water with a different composition.',
        price: 168
      },
      {
        ownerId: 1,
        address: '12-13 Higashimatsubaracho',
        city: 'Ito',
        state: 'Shizuoka',
        country: 'Japan',
        lat: 34.972538072174395,
        lng: 139.09724865396745,
        name: 'Ito Onsen',
        description: "Ito Onsen's healing waters and scenic beachside views make it a popular weekend escape from Tokyo.",
        price: 47
      },
      {
        ownerId: 2,
        address: 'Kurokawa Sakura-dori',
        city: 'Minami-oguni-machi',
        state: 'Kumamoto',
        country: 'Japan',
        lat: 33.076436217712384,
        lng: 131.147472704781,
        name: 'Kurokawa Onsen',
        description: "A Cozy Spa Resort Surrounded by Beautiful Nature.Peaceful sounds of nature and traditional hospitality.Enjoy the ultimate relaxation",
        price: 150
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {});
  }
};
