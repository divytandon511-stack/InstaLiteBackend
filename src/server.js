const express = require("express");

const prisma = require("./db");

const app = express();

app.locals.prisma = prisma;
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
