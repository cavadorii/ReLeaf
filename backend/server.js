require("dotenv").config();


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const predictRoutes = require("./routes/predictRoutes");
const associationRoutes = require("./routes/associationRoutes");
const treePhotoRoutes = require("./routes/treePhotoRoutes");
const usersRoutes = require("./routes/usersRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/predict", predictRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/tree-photos", treePhotoRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/associations", associationRoutes);
app.use("/api/feedback", feedbackRoutes);


const PORT = process.env.PORT || 5000;

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
