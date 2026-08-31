const jwt = require("jsonwebtoken");
const env = require("../config/env");

export const authenticate = (req, res, next) => {
  const { JWT_SECRET } = env;

  // Step 1: Take token from the headers and check whether he is providing one.
  const authHeader = req.header["authorization"];
  //   Extract bearer <token>
  if (!authHeader) {
    res.status(401).send({
      succes: false,
      message: "Unauthorized",
      desc: "No auth header provided.",
    });
  }

  //   Take only the second part of "Bearer <Token>"
  const token = authHeader.split(" ")[1];
  //   I am lowkey confused whether we send jwt in req.body or req.headers
  //   I think from request header (header is correct)

  // Now that we got the token, we need to verify it, and make some use of it
  // Wrapping decoded in  try-catch because invalid jwt can throw an unhandled error wwhich can crash the server.
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // decoded returns a payload object, looking like this:
    // { userId: 123, role: "ADMIN", and some other jwt stuff }
  } catch (e) {
    res.status(400).send({
      success: false,
      message: "Invalid or Expired Token",
      error: e.message,
    });
    // console.error(e.message);
  }
};
