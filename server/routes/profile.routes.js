const { Router } = require("express");
const { checkUser } = require("../helpers/jwt.helper");

const router = Router();

router.get("/profile", checkUser, (req, res) => {
  const userInfo = req.userInfo;
  const isAuth = req.isAuth;
  
  if (userInfo && isAuth) {
    res.status(200).json({ currentPage: "profile-page", userInfo, isAuth });
  }
  
  if (!isAuth) {
    res.status(401).json({ isAuth });
  }
});

module.exports = router;