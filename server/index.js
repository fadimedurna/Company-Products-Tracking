require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/register");
const authRoutes = require("./routes/login");
const companyRoutes = require("./routes/company");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/register", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/companies", companyRoutes);

const port = process.env.PORT || 7000;
app.listen(port, console.log(`Listening on port ${port}...`));
