// Imports
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const rootDir = require("./helpers/path.helper");
const cookieParser = require("cookie-parser");

// Routes imports
const homeRouter = require("./routes/home.routes");
const authRouter = require("./routes/auth.routes");
const { checkUser } = require("./helpers/jwt.helper");

require("dotenv").config({ path: path.join(rootDir, "secure", ".env") });

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Database connection & app start
mongoose.connect(process.env.dbURI)
  .then(result => {
    console.log("connected to MongoDB Atlas");
    app.listen(PORT, () => console.log("server running on port", PORT));
  })
  .catch(err => console.log(err));

// Routes
app.use("*", checkUser);

app.use(authRouter);

app.use(homeRouter);

// 404 page
app.use((req, res) => res.status(404).render('404'));

