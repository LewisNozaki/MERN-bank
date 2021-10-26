const { Router } = require("express");
const { checkUser } = require("../helpers/jwt.helper");

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ currentPage: "home-page" });
});

module.exports = router;