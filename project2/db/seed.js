const mongoose = require("mongoose");
const User = require("../models/User.model");

const seedDb = () => {
  User.deleteMany({})
    .then(() => {
      return User.create({
        username: "testUsername",
        password: "testPassword",
        role: "Parent",
      });
    })
    .then((userInDb) => console.log(`========== 👥 created user in database called: ${userInDb.username} ==========`))
    .catch((err) => console.log(err));
};

module.exports = seedDb;
