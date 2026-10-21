const app = require("./server");
const usersRouter = require("./routes/users.routes");
const postsRouter = require("./routes/posts.routes");

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const shutdown = async () => {
  await app.locals.prisma.$disconnect();
  server.close();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
