const express = require("express");
const router = express.Router();
const { logIn, signUp } = require("../controller/auth.controller.js");

// kebab-case is the best practice according to Gemini for URL routes so I will use that
// It also says that it is more SEO friend because search engines of treat "-" between words as two sepra

router.post("/signup", signUp);

router.post("/login", logIn);

module.exports = router;
