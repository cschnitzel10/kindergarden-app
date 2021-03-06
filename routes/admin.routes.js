const router = require("express").Router();
const mongoose = require("mongoose");
const News = require("../models/News.model");
const isAdmin = require("../middleware/isAdmin");
const isLoggedIn = require("../middleware/isLoggedIn");
const fileUploader = require("../config/cloudinary.config");
const Test = require("../models/Test.model");
//CREATE NEWS on /admin/create-news

router.get("/create-news", isLoggedIn, (req, res) => {
  res.render("admin/create-news.hbs");
}); 

router.post("/create-news", isLoggedIn, fileUploader.single("admin-file"), (req, res) => { 
  const { headline, content, group } = req.body;  
  const imageUrl = req.file?.path;   
  console.log(imageUrl); 
  News.create({ headline, content, group, imageUrl }) 
    .then((newNews) => { 
      console.log(newNews); 
      res.redirect("/admin"); 
    }) 
    .catch((error) => console.log(error)); 
}); 
 
// GET NEWS and TESTRESULTS on /admin

router.get("/", (req, res) => {

  let news;
 
 if (req.query) {

 } 

  News.find() 
    .then((newsFromDB) => { 
      news = newsFromDB; 
      newsFromDB.sort((a, b) => b.createdAt - a.createdAt); 
      return Test.find().populate("testTaker"); 
    })
    .then((filt) => { 
      const testsFromDb = filt.filter((test) => test.testTaker.group == req.query.group); 
      testsFromDb.sort((a, b) => b.dateTaken - a.dateTaken); 
      res.render("admin/index.hbs", { 
        news, 
        testsFromDb, 
        user: req.session.currentUser, 
      });
    })
    .catch((error) => console.error(error));
});

router.get("/", (req, res) => {
  const query = req.query

});

module.exports = router;


