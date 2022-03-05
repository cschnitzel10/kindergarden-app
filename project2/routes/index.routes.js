const router = require("express").Router();

/* GET home page */
router.get("/parent", (req, res, next) => {
  res.render("parent/index");
});

module.exports = router;
