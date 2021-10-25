// Imports
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const rootDir = require("./helpers/path.helper");
const cookieParser = require("cookie-parser");

// Routes imports
const homeRouter = require("./routes/home.routes");

require("dotenv").config({ path: path.join(rootDir, "secure", ".env") });

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Database connection & app start
mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(result => {
    console.log("connected to MongoDB Atlas");
    app.listen(PORT, () => console.log("server running on port", PORT));
  })
  .catch(err => console.log(err));

// Routes
app.use(homeRouter);

