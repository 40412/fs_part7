const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token invalid or missing" });
  }

  try {
    const body = request.body;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const { comment } = request.body;

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  blog.comments = blog.comments.concat(comment);
  const updatedBlog = await blog.save();

  response.status(201).json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token invalid or missing" });
  }

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response
      .status(401)
      .json({ error: "only the creator can delete this blog" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ error: "blog not found" });
  }

  const update = {};
  if (title !== undefined) update.title = title;
  if (author !== undefined) update.author = author;
  if (url !== undefined) update.url = url;
  if (likes !== undefined) update.likes = (blog.likes || 0) + 1;

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, update, {
    returnDocument: "after",
    runValidators: true,
  });

  res.json(updatedBlog);
});

module.exports = blogsRouter;
