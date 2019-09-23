const express = require("express");

const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

app.get("/", (req, res) => res.send("API running"));

const usersRoute = require("./routes/api/users");
const profileRoute = require("./routes/api/profile");
const postsRoute = require("./routes/api/posts");
const authRoute = require("./routes/api/auth");

//Define routes
app.use("/api/users", usersRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postsRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
