const postsService = require("../services/posts.service");
const usersService = require("../services/users.service");
const { parsePagination, pageMeta } = require("../utils/pagination");

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const create = async (req, res, next) => {
  const { imageUrl, authorId, caption, location } = req.body || {};
  const parsedAuthorId = parseId(authorId);
  if (!imageUrl || parsedAuthorId === null) {
    return res
      .status(400)
      .json({ error: "imageUrl and authorId are required" });
  }

  try {
    const author = await usersService.getUserById(parsedAuthorId);
    if (!author) return res.status(404).json({ error: "User not found" });
    const post = await postsService.createPost({
      imageUrl,
      authorId: parsedAuthorId,
      ...(caption !== undefined ? { caption } : {}),
      ...(location !== undefined ? { location } : {}),
    });
    return res.status(201).json(post);
  } catch (error) {
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

  const { sortBy = "createdAt", order = "desc", location, search, from, to } =
    req.query;
  const allowedSorts = ["createdAt", "updatedAt", "likes"];
  if (!allowedSorts.includes(sortBy)) {
    return res.status(400).json({
      error: "sortBy must be one of: createdAt, updatedAt, likes",
    });
  }
  if (!["asc", "desc"].includes(order)) {
    return res.status(400).json({ error: "order must be asc or desc" });
  }

  let fromDate;
  let toDate;
  if (from !== undefined) fromDate = new Date(from);
  if (to !== undefined) toDate = new Date(to);
  if (
    (fromDate && Number.isNaN(fromDate.getTime())) ||
    (toDate && Number.isNaN(toDate.getTime()))
  ) {
    return res.status(400).json({ error: "from and to must be valid dates" });
  }

  const where = {
    ...(location !== undefined
      ? { location: { equals: location, mode: "insensitive" } }
      : {}),
    ...(search !== undefined && search !== ""
      ? { caption: { contains: search, mode: "insensitive" } }
      : {}),
    ...(fromDate || toDate
      ? {
          createdAt: {
            ...(fromDate ? { gte: fromDate } : {}),
            ...(toDate ? { lt: toDate } : {}),
          },
        }
      : {}),
  };
  const orderBy =
    sortBy === "likes"
      ? [{ likes: { _count: order } }, { createdAt: "desc" }]
      : { [sortBy]: order };

  try {
    const [data, total] = await postsService.listPosts({
      where,
      orderBy,
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
  if (id === null) return res.status(404).json({ error: "Post not found" });

  try {
    const post = await postsService.getPostById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    return res.status(200).json(post);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(404).json({ error: "Post not found" });
  const { caption, location } = req.body || {};
  const data = {};
  if (caption !== undefined) data.caption = caption;
  if (location !== undefined) data.location = location;

  try {
    return res.status(200).json(await postsService.updatePost(id, data));
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Post not found" });
    }
    return next(error);
  }
};

const remove = async (req, res, next) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(404).json({ error: "Post not found" });

  try {
    await postsService.deletePost(id);
    return res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Post not found" });
    }
    return next(error);
  }
};

const listLikes = async (req, res, next) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(404).json({ error: "Post not found" });
  try {
    const post = await postsService.getPostById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    return res.status(200).json(await postsService.listPostLikes(id));
  } catch (error) {
    return next(error);
  }
};

module.exports = { create, list, getOne, update, remove, listLikes };
