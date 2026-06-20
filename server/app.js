const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173", // Only allow this domain
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed custom headers
  credentials: true, // Allow cookies or authorization headers
  optionsSuccessStatus: 200, // For legacy browser support (IE11)
};

// Apply options to all routes
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});

app.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});
