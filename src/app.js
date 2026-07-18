const adminRouter = require("./routes/admin.routes");
const express = require("express");
const cors = require("cors");
const userModel = require("../src/models/user.model");
const bcrypt = require("bcryptjs");
// const swaggerUi = require("swagger-ui-express");
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

app.post("/signup", async (req, res) => {
  let { firstName, lastName, username, email, password, age, role } = req.body;
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    !age ||
    !role
  ) {
    return res.status(400).send({ message: "All fields are required!" });
  }
  // username validation
  if (username.length < 3) {
    return res
      .status(400)
      .send({ message: "Username must be at least 3 characters long!" });
  }
  // email validation
  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return res
      .status(400)
      .send({ message: "Please fill a valid email address!" });
  }
  // password validation
  if (password.length < 6) {
    return res
      .status(400)
      .send({ message: "Password must be at least 6 characters long!" });
  }
  // age validation
  if (age <= 0) {
    return res.status(400).send({ message: "Age must be a positive number!" });
  }

  username = username.trim();
  firstName = firstName.trim();
  lastName = lastName.trim();

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  // console.log("complete object:", {
  //   name: `${firstName} ${lastName}`,
  //   username,
  //   email,
  //   password: hashedPassword,
  //   age,
  //   role,
  // });

  try {
    const newUser = new userModel({
      name: `${firstName} ${lastName}`,
      username,
      email,
      password: hashedPassword,
      age,
      role,
    });
    await newUser.save();

    res.status(200).send({ message: "User signed up successfully!" });
  } catch (error) {
    return res.status(500).send({
      message: "Error occurred while signing up user!",
      error: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  // email validation
  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return res
      .status(400)
      .send({ message: "Please enter a valid email address!" });
  }
  try {
    const user = await userModel.findOne({ email });
    console.log(user);
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (email !== user.email || !isPasswordSame) {
      res.status(401).send({ message: "email or password is incorrect." });
    } else {
      res
        .status(200)
        .send({ message: "User have been authenticated.", data: user });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Error occurred while logging in user!",
      error: error.message,
    });
  }
});

app.use("/api/admin", adminRouter);

/**
 * 404 Handler
 * Every request that does not match any route will be handled by this middleware.
 */
app.use((req, res) => {
  res.send(`There is no route at: ${req.method} ${req.originalUrl} `);
});

module.exports = app;
