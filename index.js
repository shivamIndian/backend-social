const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const notificationRoute = require("./routes/notification");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const Token = require("./models/Token");
const User = require("./models/User");
dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connected to MongoDB");
});

app.use(
  "/images",
  express.static(path.join(__dirname, "public/images"))
);

// Use the cors middleware
app.use(cors());

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/notification", notificationRoute);

app.listen(8000, () => {
  console.log("Backend server is runing and test first!");
});