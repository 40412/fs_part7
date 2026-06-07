const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/users");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const user = new User({
    username: "root",
    name: "Superuser",
    passwordHash: "hashedpassword",
  });

  await user.save();
});

test("creation succeeds with a fresh username", async () => {
  const usersAtStart = await User.find({});

  const newUser = {
    username: "jasmin",
    name: "Jasmin",
    password: "secret",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await User.find({});
  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
});

test("creation fails with proper statuscode and message if username is too short", async () => {
  const newUser = {
    username: "ab",
    name: "Shorty",
    password: "secret",
  };

  await api.post("/api/users").send(newUser).expect(400);
});

test("creation fails if password is too short", async () => {
  const newUser = {
    username: "validname",
    name: "Test",
    password: "12",
  };

  await api.post("/api/users").send(newUser).expect(400);
});

test("creation fails if username is not unique", async () => {
  const newUser = {
    username: "root",
    name: "Duplicate",
    password: "secret",
  };

  await api.post("/api/users").send(newUser).expect(400);
});

after(async () => {
  await mongoose.connection.close();
});
