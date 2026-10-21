const prisma = require("../db");

const createPost = (data) => prisma.post.create({ data });

const listPosts = () => prisma.post.findMany();

const getPostById = (id) => prisma.post.findUnique({ where: { id } });

const updatePost = (id, data) =>
  prisma.post.update({
    where: { id },
    data,
  });

const deletePost = (id) => prisma.post.delete({ where: { id } });

module.exports = {
  createPost,
  listPosts,
  getPostById,
  updatePost,
  deletePost,
};
