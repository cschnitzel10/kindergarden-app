const mongoose = require("mongoose");
const User = require("../models/User.model");
const Child = require("../models/Child.model");
const Test = require("../models/Test.model");

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
    .then(childInDb => {
      return Test.create({
          diseaseName: "COVID",
          testName: "Blue Test",
          dateTaken: Date.now(),
          result: true,
          testTaker: childInDb.id
      })
    })
    .then((testInDb) => {
      return Child.findOneAndUpdate({ id: testInDb.testTaker }, { test: testInDb }, { new: true })
    })
    .then(foundChild => {
      return User.create({
        username: 'testUsername',
        password: 'testPassword',
        roles: 'Parent',
        children: foundChild.id
      })
    })
    .then((userInDb) => console.log(`========== 👥 created user in database called: ${userInDb} ==========`))
    .catch((err) => console.log(err));
};

module.exports = seedDb;
