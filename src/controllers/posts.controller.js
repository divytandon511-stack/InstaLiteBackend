const postsService = require("../services/posts.service");

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const create = async (req, res, next) => {
  const { imageUrl, caption, location } = req.body || {};

  if (!imageUrl) {
    return res.status(400).json({ error: "imageUrl is required" });
  }

  try {
    return res.status(201).json(
      await postsService.createPost({
        imageUrl,
        ...(caption !== undefined ? { caption } : {}),
        ...(location !== undefined ? { location } : {}),
      }),
    );
  } catch (error) {
    return next(error);
  }
};

const list = async (_req, res, next) => {
  try {
    return res.status(200).json(await postsService.listPosts());
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ error: "Post not found" });
  }

  try {
    const post = await postsService.getPostById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ error: "Post not found" });
  }

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
  if (id === null) {
    return res.status(404).json({ error: "Post not found" });
  }

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

module.exports = { create, list, getOne, update, remove };
