const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router();
const {
  createCard,
  getCards,
  updateCard,
  deleteCard,
} = require("../controller/crud");

router.get("/", (req, res) => {
  res.status(200).send("Hello Admin");
});

router.get("/cards");

router.post("/create-card");

router.put("/update-card");

router.delete("/delete-card");

module.exports = router;
