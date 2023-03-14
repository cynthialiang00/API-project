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
        url: "https://i.pinimg.com/564x/32/13/d6/3213d6aece7942cbf5dffa38d752895c.jpg",
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
        url: "https://visitkinosaki.com/travel-professionals/wp-content/uploads/2018/06/kinosaki-sakura01.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://images.ctfassets.net/2uxxifu5nzlv/img_0389_1/0fd2900bb536a7bb3478ef78c4483fdd/img_0389_Takaragawa_Onsen_Osenkaku_1_CL.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/293256648.jpg?k=df77b5c25f4586f07340202f9e78ca2af77bb814be5cb833ed232b14921d6072&o=&hp=1",
        preview: true
      },
      {
        spotId: 5,
        url: "https://visit.arima-onsen.com/wp/wp-content/uploads/2015/02/021-1420x750.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://meguri-japan.com/mgr/wp-content/uploads/2021/08/2a3f5bca0cc630a08b41cf7bfe353fa1.jpg",
        preview:true
      },
      {
        spotId: 7,
        url: "https://www.alexrockinjapan.com/wp-content/uploads/2022/03/Ito-Onsen-Famous-Onsen-Towns-Near-Tokyo-Japan.jpg?ezimgfmt=ng%3Awebp%2Fngcb3%2Frs%3Adevice%2Frscb3-1",
        preview: true
      },
      {
        spotId: 8,
        url: "https://cdn.zekkei-japan.jp/images/spots/c27eeedff4c1f01575ab38f061818ce7.jpg",
        preview: true
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {});
  }
};
