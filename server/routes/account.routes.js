const { Router } = require("express");
const { account_post } = require("../controllers/account.controllers");

const router = Router();

router.post("/account/open", account_post);

module.exports = router;