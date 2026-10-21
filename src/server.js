const express = require("express");

const prisma = require("./db");

const app = express();

app.locals.prisma = prisma;
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

module.exports = app;
