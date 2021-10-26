const { Router } = require("express");
const { checkUser } = require("../helpers/jwt.helper");

const router = Router();

router.get("/profile", checkUser, (req, res) => {
  const userInfo = req.userInfo;
  const isAuth = req.isAuth;
  res.status(200).json({ currentPage: "profile-page", userInfo, isAuth });
});

module.exports = router;