const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/appsettings");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blog");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/test");
const path = require("path");

const app = express();

logger.info("connecting...");

mongoose
  .connect(config.mongourl, { family: 4 })
  .then(() => logger.info("connected to MongoDB"))
  .catch((error) => logger.error("error connecting:", error.message));

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/testing", testingRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../bloglist-frontend/dist")));

  app.get("/*any", (req, res) => {
    res.sendFile(path.join(__dirname, "../bloglist-frontend/dist/index.html"));
  });
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
