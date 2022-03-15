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
      const newDate = item.date.toString().substring(0, 15);
      item.date = newDate;
      return item;
    });
}

router.get('/', (req, res, next) =>{
  res.redirect('/auth/login')
})

/* GET home page */
router.get("/parent", isLoggedIn, (req, res, next) => {
  let historyOfTests = [];
  let newsArticles = [];
  News.find()
    .then((newsFromDb) => {
      newsArticles = newsFromDb;
      return User.findOne({ id: req.session.currentUser._id })
      .populate({
        path: "children",
        populate: { path: "test" },
      });
    })
    .then((foundUser) => {
      let filteredNewsArticles;
      foundUser.children.forEach((child) => {
        filteredNewsArticles = newsArticles.filter(news => news.group == child.group);
        let childName = child.name;
        let childGroup = child.group;
        console.log(child.test)
        child.test.sort((a, b) => b.dateTaken - a.dateTaken);
        child.test.forEach((test) => {
          historyOfTests.push({
            name: childName,
            group: childGroup,
            test: test.testName,
            disease: test.diseaseName,
            date: test.dateTaken,
            result: test.result,
          });
        });
      });
      const filteredHistory = getDaysAgoData(historyOfTests, 7);
      res.render("parent/index", { user: foundUser, historyOfTests: filteredHistory, news: filteredNewsArticles });
    });
});

module.exports = router;
