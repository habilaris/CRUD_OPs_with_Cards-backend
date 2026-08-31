const adminRouter = require("./routes/admin.routes.js");
const authRouter = require("./routes/auth.routes.js");
const express = require("express");
const cors = require("cors");
const userModel = require("../src/models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("./config/env.js");
// const swaggerUi = require("swaggxer-ui-express");
// const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res
    .status(200)
    .send('This is an api for "CRUD Operation with Cards"  pseudo project!');
});

app.get("/health", (req, res) => {
  res.status(200).send({
    success: true,
    desc: 'This is an api for "CRUD Operation with Cards"  pseudo project!',
    message: "Server is up and running!",
  });
});

app.use("/api/auth", authRouter);

app.use("/api/admin", adminRouter);

/**
 * 404 Handler
 * Every request that does not match any route will be handled by this middleware.
 */
app.use((req, res) => {
  res.send(`There is no route at: ${req.method} ${req.originalUrl} `);
});

module.exports = app;
