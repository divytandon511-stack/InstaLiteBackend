const usersService = require("../services/users.service");

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const create = async (req, res, next) => {
  const { username, email, fullname, bio } = req.body || {};

  if (!username || !email || !fullname) {
    return res
      .status(400)
      .json({ error: "username, email and fullname are required" });
  }

  try {
    const user = await usersService.createUser({
      username,
      email,
      fullname,
      ...(bio !== undefined ? { bio } : {}),
    });
    return res.status(201).json(user);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "username or email already taken" });
    }
    return next(error);
  }
};

const list = async (_req, res, next) => {
  try {
    return res.status(200).json(await usersService.listUsers());
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const user = await usersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ error: "User not found" });
  }

  const { fullname, bio, isPrivate } = req.body || {};
  const data = {};
  if (fullname !== undefined) data.fullname = fullname;
  if (bio !== undefined) data.bio = bio;
  if (isPrivate !== undefined) data.isPrivate = isPrivate;

  try {
    return res.status(200).json(await usersService.updateUser(id, data));
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    return next(error);
  }
};

const remove = async (req, res, next) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    await usersService.deleteUser(id);
    return res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    return next(error);
  }
};

module.exports = { create, list, getOne, update, remove };
