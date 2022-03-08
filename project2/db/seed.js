const mongoose = require("mongoose");
const User = require("../models/User.model");
const Child = require("../models/Child.model");
const Test = require("../models/Test.model");
const { test } = require("mocha");

const seedDb = () => {
  let dBTests;
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
      return Test.insertMany([
        {
          diseaseName: "COVID",
          testName: "Blue Test",
          dateTaken: Date.now(),
          result: false,
          testTaker: childInDb.id,
        },
        {
          diseaseName: "COVID",
          testName: "Blue Test",
          dateTaken: Date.now(),
          result: false,
          testTaker: childInDb.id,
        },
        {
          diseaseName: "COVID",
          testName: "Blue Test",
          dateTaken: Date.now(),
          result: false,
          testTaker: childInDb.id,
        },
        {
          diseaseName: "COVID",
          testName: "Blue Test",
          dateTaken: Date.now(),
          result: false,
          testTaker: childInDb.id,
        },
        {
          diseaseName: "COVID",
          testName: "Blue Test",
          dateTaken: "2022-03-05T18:42:25.282Z",
          result: false,
          testTaker: childInDb.id,
        }
      ]);
    })
    .then((testsInDb) => {
      dBTests = testsInDb;
      return Child.findById(testsInDb[0].testTaker);
    })
    .then((foundChild) => {
      dBTests.forEach(test => {
        foundChild.test.push(test)
      })
      return foundChild.save()
    })
    .then(savedChild => {
      return User.create({
        username: "testUsername",
        password: "testPassword",
        roles: "Parent",
        children: savedChild.id,
      });
    })
    .then((createdUser) => {
      return User.create({
        username: "admin",
        password: "admin",
        roles: "Admin",
      });
    })
    .then(() => console.log("DB SEEDED"))
    .catch((err) => console.log(err));
};

module.exports = seedDb;
