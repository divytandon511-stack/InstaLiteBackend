const prisma = require("../db");

async function createUser(data) {
  return prisma.user.create({ data });
}

async function listUsers({ where, orderBy, skip, take }) {
  return prisma.$transaction([
    prisma.user.findMany({
      where,
      orderBy,
      skip,
      take,
    }),
    prisma.user.count({ where }),
  ]);
}

async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    include: { _count: { select: { posts: true, likes: true } } },
  });
}

async function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

async function deleteUser(id) {
  return prisma.user.delete({ where: { id } });
}

async function getUserPosts(userId, { skip, take }) {
  return prisma.$transaction([
    prisma.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: { _count: { select: { likes: true } } },
    }),
    prisma.post.count({ where: { authorId: userId } }),
  ]);
}

async function getLikedPosts(userId, { skip, take }) {
  return prisma.$transaction([
    prisma.post.findMany({
      where: { likes: { some: { userId } } },
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            fullname: true,
          },
        },
        _count: { select: { likes: true } },
      },
    }),
    prisma.post.count({ where: { likes: { some: { userId } } } }),
  ]);
}

module.exports = {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserPosts,
  getLikedPosts,
};
