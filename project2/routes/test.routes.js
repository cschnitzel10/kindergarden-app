const router = require("express").Router();
const Test = require("../models/Test.model");

/* GET TESTS */
router.get("/", (req, res, next) => {
  Test.find().then((tests) => {
    res.send(tests);
  });
});

/* POST NEW TEST */
router.post("/new", (req, res, next) => {
  const { diseaseName, testName, dateTaken, result, testTaker } = req.body;
  if (!diseaseName || !testName || !dateTaken || !result  || !testTaker) {
    res.send("missing parameters");
  } else {
     res.send(`${result} test submitted for ${diseaseName}`) 
  }
//   Test.find().then((tests) => {
//     res.send(tests);
//   });
});

module.exports = router;
