const router = require("express").Router();
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const News = require("../models/News.model");

function getDaysAgoData(data, daysAgo) {
  let t = new Date();
  let d = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate() - daysAgo));
  return data
    .filter((item) => item.date >= d)
    .map((item) => {
      const newDate = item.date.toString().substring(0, 10);
      item.date = newDate;
      return item;
    });
}

/* GET home page */
router.get("/parent", isLoggedIn, (req, res, next) => {
  let historyOfTests = [];
  let newsArticles = [];
  News.find()
    .then((newsFromDb) => {
      newsArticles = newsFromDb;
      return User.findOne({ id: req.session.user._id })
      .populate({
        path: "children",
        populate: { path: "test" },
      });
    })
    .then((foundUser) => {
      console.log('foundUser:', foundUser)
      foundUser.children.forEach((child) => {
        let childName = child.name;
        let childGroup = child.group;
        child.test.forEach((test) => {
          // const parseDate = test.dateTaken.toString().substring(0, 10)
          historyOfTests.push({
            name: childName,
            group: childGroup,
            test: test.diseaseName,
            date: test.dateTaken,
            result: test.result,
          });
        });
      });
      const filteredHistory = getDaysAgoData(historyOfTests, 7);
      res.render("parent/index", { user: foundUser, historyOfTests: filteredHistory, news: newsArticles });
    });
});

module.exports = router;
