const prisma = require("../db");

const createLike = (userId, postId) =>
  prisma.like.create({
    data: { userId, postId },
  });

const deleteLike = (userId, postId) =>
  prisma.like.delete({
    where: { userId_postId: { userId, postId } },
  });

module.exports = { createLike, deleteLike };
