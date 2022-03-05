const mongoose = require("mongoose");
const User = require("../models/User.model");
const Child = require("../models/Child.model");

const seedDb = () => {
  User.deleteMany({})
    .then(() => {
      return Child.deleteMany({});
    })
    .then(() => {
      return Child.create({
        group: "7",
        name: "Frieda",
        test: [],
      });
    })
    .then((childInDb) => {
      return User.create({
        username: "testUsername",
        password: "testPassword",
        roles: "Parent",
        children: childInDb.id,
      });
    })
    .then((userInDb) => console.log(`========== 👥 created user in database called: ${userInDb} ==========`))
    .catch((err) => console.log(err));
};

module.exports = seedDb;
