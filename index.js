const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");
const router = require("./router/index.js");
const PORT = process.env.PORT;

const cheerio = require("cheerio");

app.use(express.static(path.resolve(__dirname, "static")));
app.use(cors());
app.use("/api", router);

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server has been started at port ${PORT}`);
  });
};

start();

// const markUp = require("./parse/mock.js");

// const cheerioMock = cheerio.load(markUp);
