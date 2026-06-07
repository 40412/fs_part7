const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/users");

const api = supertest(app);

const initialBlogs = [
  {
    title: "First blog",
    author: "Author One",
    url: "http://example.com/1",
    likes: 5,
  },
  {
    title: "Second blog",
    author: "Author Two",
    url: "http://example.com/2",
    likes: 10,
  },
];

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = await User.create({
    username: "tester",
    name: "Test User",
    passwordHash,
  });

  const blogsWithUser = initialBlogs.map((blog) => ({
    ...blog,
    user: user._id,
  }));
  await Blog.insertMany(blogsWithUser);

  const loginResponse = await api
    .post("/api/login")
    .send({ username: "tester", password: "sekret" });

  token = loginResponse.body.token;
});

test("blogs are returned as json and correct amount", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("unique identifier property of blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  const blogs = response.body;

  for (const blog of blogs) {
    assert.ok(blog.id, "id property is missing");
    assert.strictEqual(blog._id, undefined);
  }
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "New test blog",
    author: "Test Author",
    url: "http://example.com/new",
    likes: 3,
  };

  const blogsAtStart = await api.get("/api/blogs");

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await api.get("/api/blogs");
  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length + 1);

  const titles = blogsAtEnd.body.map((b) => b.title);
  assert.ok(titles.includes("New test blog"));
});

test("if likes property is missing, it defaults to 0", async () => {
  const newBlog = {
    title: "Blog without likes",
    author: "Test Author",
    url: "http://example.com/no-likes",
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Test Author",
    url: "http://example.com/no-title",
    likes: 5,
  };

  const blogsAtStart = await api.get("/api/blogs");

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await api.get("/api/blogs");
  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length);
});

test("blog without url is not added", async () => {
  const newBlog = {
    title: "Missing URL blog",
    author: "Test Author",
    likes: 5,
  };

  const blogsAtStart = await api.get("/api/blogs");

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await api.get("/api/blogs");
  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await api.get("/api/blogs");
  const blogToDelete = blogsAtStart.body[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await api.get("/api/blogs");

  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1);

  const ids = blogsAtEnd.body.map((b) => b.id);
  assert.ok(!ids.includes(blogToDelete.id));
});

test("a blog can be updated", async () => {
  const blogsAtStart = await api.get("/api/blogs");
  const blogToUpdate = blogsAtStart.body[0];

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: 1 })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 1);

  const blogsAtEnd = await api.get("/api/blogs");
  const updated = blogsAtEnd.body.find((b) => b.id === blogToUpdate.id);

  assert.strictEqual(updated.likes, blogToUpdate.likes + 1);
});

test("adding a blog fails with 401 if token is not provided", async () => {
  const newBlog = {
    title: "Unauthorized blog",
    author: "Hacker",
    url: "http://example.com",
    likes: 1,
  };

  await api.post("/api/blogs").send(newBlog).expect(401);
});

after(async () => {
  await mongoose.connection.close();
});
