const usersService = require("../services/users.service");
const { parsePagination, pageMeta } = require("../utils/pagination");

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

const list = async (req, res, next) => {
  const pagination = parsePagination(req.query);
  if (!pagination) {
    return res
      .status(400)
      .json({ error: "page and limit must be positive integers" });
  }

  const { sortBy = "createdAt", order = "desc", isPrivate, search, hasPosts } =
    req.query;
  const allowedSorts = ["createdAt", "username", "fullname"];
  if (!allowedSorts.includes(sortBy)) {
    return res
      .status(400)
      .json({ error: "sortBy must be one of: createdAt, username, fullname" });
  }
  if (!["asc", "desc"].includes(order)) {
    return res.status(400).json({ error: "order must be asc or desc" });
  }
  if (isPrivate !== undefined && !["true", "false"].includes(isPrivate)) {
    return res.status(400).json({ error: "isPrivate must be true or false" });
  }
  if (hasPosts !== undefined && !["true", "false"].includes(hasPosts)) {
    return res.status(400).json({ error: "hasPosts must be true or false" });
  }

  const where = {
    ...(isPrivate !== undefined ? { isPrivate: isPrivate === "true" } : {}),
    ...(search !== undefined && search !== ""
      ? {
          OR: [
            { username: { contains: search, mode: "insensitive" } },
            { fullname: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(hasPosts !== undefined
      ? { posts: hasPosts === "true" ? { some: {} } : { none: {} } }
      : {}),
  };

  try {
    const [data, total] = await usersService.listUsers({
      where,
      orderBy: { [sortBy]: order },
      skip: pagination.skip,
      take: pagination.take,
    });
    return res.status(200).json({
      data,
      meta: pageMeta(pagination.page, pagination.limit, total),
    });
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(404).json({ error: "User not found" });

  try {
    const user = await usersService.getUserById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(404).json({ error: "User not found" });

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
  if (id === null) return res.status(404).json({ error: "User not found" });

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

const listPosts = async (req, res, next) => {
  const userId = parseId(req.params.id);
  const pagination = parsePagination(req.query);
  if (!pagination) {
    return res
      .status(400)
      .json({ error: "page and limit must be positive integers" });
  }
  if (userId === null) return res.status(404).json({ error: "User not found" });

  try {
    const user = await usersService.getUserById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    const [data, total] = await usersService.getUserPosts(userId, pagination);
    return res.status(200).json({
      data,
      meta: pageMeta(pagination.page, pagination.limit, total),
    });
  } catch (error) {
    return next(error);
  }
};

const likedPosts = async (req, res, next) => {
  const userId = parseId(req.params.id);
  const pagination = parsePagination(req.query);
  if (!pagination) {
    return res
      .status(400)
      .json({ error: "page and limit must be positive integers" });
  }
  if (userId === null) return res.status(404).json({ error: "User not found" });

  try {
    const user = await usersService.getUserById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    const [data, total] = await usersService.getLikedPosts(userId, pagination);
    return res.status(200).json({
      data,
      meta: pageMeta(pagination.page, pagination.limit, total),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { create, list, getOne, update, remove, listPosts, likedPosts };
