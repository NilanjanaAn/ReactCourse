const express = require("express");
const cors = require("cors");
const todoRoutes = require("./todoRoutes");

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // Add this line to parse JSON requests

// Use your todoRoutes
app.use("/api/todos", todoRoutes.router);

app.get("/", (req, res) => {
  res.send("Welcome to Utility API");
});

const PORT = 4100;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
