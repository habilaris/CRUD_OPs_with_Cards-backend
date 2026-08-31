const express = require("express");
const userModel = require("../../models/user.model");
const router = express.Router();
const {
  createCard,
  getCards,
  updateCard,
  deleteCard,
} = require("../../controller/card.controller");

router.get("/", (req, res) => {
  res.status(200).send("Hello Admin");
});

router.get("/cards", getCards);

router.post("/create-card", createCard);

router.put("/update-card", updateCard);

router.delete("/delete-card", deleteCard);

module.exports = router;
