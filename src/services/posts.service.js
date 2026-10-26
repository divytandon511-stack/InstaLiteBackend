const prisma = require("../db");

const postDetails = {
  author: {
    select: {
      id: true,
      username: true,
      fullname: true,
    },
  },
  _count: {
    select: {
      likes: true,
    },
  },
};

async function createPost(data) {
  return prisma.post.create({ data });
}

async function listPosts({ where, orderBy, skip, take }) {
  return prisma.$transaction([
    prisma.post.findMany({
      where,
      orderBy,
      skip,
      take,
      include: postDetails,
    }),
    prisma.post.count({ where }),
  ]);
}

async function getPostById(id) {
  return prisma.post.findUnique({
    where: { id },
    include: postDetails,
  });
}

async function updatePost(id, data) {
  return prisma.post.update({
    where: { id },
    data,
  });
}

async function deletePost(id) {
  return prisma.post.delete({ where: { id } });
}

async function listPostLikes(postId) {
  const likes = await prisma.like.findMany({
    where: { postId },
    orderBy: { user: { username: "asc" } },
    select: {
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
        },
      },
    },
  });

  return likes.map((like) => like.user);
}

module.exports = {
  createPost,
  listPosts,
  getPostById,
  updatePost,
  deletePost,
  listPostLikes,
};
