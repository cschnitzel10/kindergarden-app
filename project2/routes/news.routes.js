const router = require("express").Router();
const mongoose = require("mongoose");
const News = require("../models/News.model");
const isAdmin = require("../middleware/isAdmin");
const isLoggedIn = require("../middleware/isLoggedIn");
const fileUploader = require('../config/cloudinary.config');

router.get("/createNews", isLoggedIn, (req, res) => {
    res.render("admin/create-news.hbs");
  });

  router.post("/createNews", isAdmin, isLoggedIn, fileUploader.single('admin-file'), (req, res) => {
    const { headline, content} = req.body;
    const imageUrl = req.file.path;
    News.create ({headline, content, imageUrl})
    .then(() => {
        res.redirect('/');
    }).catch(error => console.log(error))
  
    });

    module.exports = router;