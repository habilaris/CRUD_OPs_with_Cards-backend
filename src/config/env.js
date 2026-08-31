const dotenv = require("dotenv");
dotenv.config({ quiet: true });

const env = {
  PORT: process.env.PORT || 3001,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = env;
