const prisma = require("../db");

const createUser = (data) => prisma.user.create({ data });

const listUsers = () => prisma.user.findMany();

const getUserById = (id) => prisma.user.findUnique({ where: { id } });

const updateUser = (id, data) =>
  prisma.user.update({
    where: { id },
    data,
  });

const deleteUser = (id) => prisma.user.delete({ where: { id } });

module.exports = {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
};
