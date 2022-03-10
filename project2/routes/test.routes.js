const router = require("express").Router();
const Child = require("../models/Child.model");
const Test = require("../models/Test.model");
const User = require("../models/User.model");

/* GET TESTS */
router.get("/", (req, res, next) => {
  Test.find().then((tests) => {
    res.send(tests);
  });
});

router.get("/new", (req, res, next) => {
  const diseases = Test.schema.path("diseaseName").enumValues;
  User.findOne({ id: req.session.currentUser._id })
    .populate("children")
    .then((foundUser) => {
      res.render("parent/newTest", { user: foundUser, diseases, layout: false });
    });
});

/* POST NEW TEST */
router.post("/new", (req, res, next) => {
  const { diseaseName, testName, dateTaken, result, testTaker } = req.body;
  console.log(diseaseName, testName, dateTaken, result, testTaker);
  if (!diseaseName || !testName || !dateTaken || !result || !testTaker) {
    return res.render("parent/newTest", { errorMessage: "Please complete all" });
  }
  Test.create({
    diseaseName,
    testName,
    dateTaken,
    result,
    testTaker
  }).then(testInDb => {
    return Child.findOneAndUpdate({ id: testInDb.testTaker }, { $push: { test: testInDb }  }, { new: true });

  }).then(updatedChild => {
      console.log(updatedChild)
      res.redirect('/parent')
  }).catch(err => console.log(err))
});

module.exports = router;
