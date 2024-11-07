import express from "express";

require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  app.render("hello");
});

app.listen();
