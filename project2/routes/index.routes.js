const router = require("express").Router();
const User = require('../models/User.model')
const isLoggedIn = require('../middleware/isLoggedIn')

/* GET home page */
router.get("/parent", isLoggedIn, (req, res, next) => {
  console.log('====>', req.session.user._id);
  let historyOfTests = [];
  User.findOne({ id: req.session.user._id })
    .populate({
      path: 'children',
      populate: { path: 'test' }
    })
    .then((foundUser) => {
      foundUser.children.forEach(child => {
        let childName = child.name
        let childGroup = child.group
        child.test.forEach(test => {
          const parseDate = test.dateTaken.toString().substring(0, 10)
          historyOfTests.push({
            name: childName,
            group: childGroup,
            test: test.diseaseName,
            date: parseDate,
            result: test.result
          })
        })
      })
      res.render("parent/index", { user: foundUser, historyOfTests });
    });
  });

// /* GET home page */
// router.get("/parent", (req, res, next) => {
//   res.render("parent/index");
// });



module.exports = router;
