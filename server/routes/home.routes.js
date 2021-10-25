const { Router } = require("express");
const { checkUser } = require("../helpers/jwt.helper");

const router = Router();

router.get("/", checkUser, (req, res) => {
  res.json({ currentPage: "home-page"});
});

module.exports = router;