//start server
const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/db/db");
connectDB();

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server is Running on port 3000");
});
