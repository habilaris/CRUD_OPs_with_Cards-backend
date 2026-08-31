// Server should only start the server.
const app = require("./src/app");
const env = require("./src/config/env");
// const swaggerUi = require("");
const connectToDB = require("./src/config/connectToDB");

connectToDB();

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server Listening for requests at Port: ${PORT}`);
  console.log(`Link: http://localhost:${PORT}`);
});
