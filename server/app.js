import authenticateUser from "./middlewares/authMiddleware.js";
import express from "express";
import cors from "cors";
import multer from "multer";
import "dotenv/config";
import placesRouter from "./routes/placeRoutes.js";
import usersRouter from "./routes/userRoutes.js";

import { pool } from "./config/db.js";

pool.connect().then(() => console.log("DB connected!"));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173", // Only allow this domain
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed custom headers
  credentials: true, // Allow cookies or authorization headers
  optionsSuccessStatus: 200, // For legacy browser support (IE11)
};

// Apply options to all routes
app.use(cors(corsOptions));
app.use(express.json());

app.use("/places", placesRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/profile", authenticateUser, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    userId: req.user.id,
  });
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
