const signUp = async (req, res) => {
  let { firstName, lastName, username, email, password, role } = req.body;
  if (!firstName || !lastName || !username || !email || !password || !role) {
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

  username = username.trim();
  firstName = firstName.trim();
  lastName = lastName.trim();

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await userModel.exists({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).send({
        message: "User with this email or username already exists!",
      });
    }

    const newUser = new userModel({
      name: `${firstName} ${lastName}`,
      username,
      email,
      password: hashedPassword,
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
};

const logIn = async (req, res) => {
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
      // Generate Token
      const JWT_SECRET = env.JWT_SECRET;

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: "23h" },
      );

      res.status(200).send({
        success: true,
        token,
        message: "User have been authenticated.",
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Error occurred while logging in user!",
      error: error.message,
    });
  }
};

module.exports = {
  logIn,
  signUp,
};
