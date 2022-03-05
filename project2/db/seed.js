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
      return Test.deleteMany({});
    })
    .then(() => {
      return Child.create({
        group: "7",
        name: "Frieda",
        test: [],
      });
    })
    .then((childInDb) => {
      return Test.create({
        diseaseName: "COVID",
        testName: "Blue Test",
        dateTaken: Date.now(),
        result: false,
        testTaker: childInDb.id,
      });
    })
    .then((testInDb) => {
      return Child.findOneAndUpdate({ id: testInDb.testTaker }, { $push: { test: testInDb }  }, { new: true });
    })
    .then((foundChild) => {
      return User.create({
        username: "testUsername",
        password: "testPassword",
        roles: "Parent",
        children: foundChild.id,
      });
    })
    .then(() => console.log('DB SEEDED'))
    .catch((err) => console.log(err));
};

module.exports = seedDb;
