const likesService = require("../services/likes.service");
const postsService = require("../services/posts.service");
const usersService = require("../services/users.service");

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const create = async (req, res, next) => {
  const postId = parseId(req.params.id);
  const userId = parseId(req.body && req.body.userId);
  if (userId === null) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    if (postId === null || !(await postsService.getPostById(postId))) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (!(await usersService.getUserById(userId))) {
      return res.status(404).json({ error: "User not found" });
    }
    const like = await likesService.createLike(userId, postId);
    return res.status(201).json(like);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Already liked" });
    }
    return next(error);
  }
};

const remove = async (req, res, next) => {
  const postId = parseId(req.params.id);
  const userId = parseId(req.params.userId);
  if (postId === null || userId === null) {
    return res.status(404).json({ error: "Like not found" });
  }
  try {
    await likesService.deleteLike(userId, postId);
    return res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Like not found" });
    }
    return next(error);
  }
};

module.exports = { create, remove };
