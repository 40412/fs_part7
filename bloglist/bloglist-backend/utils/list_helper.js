const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const favorite = blogs.reduce((max, blog) =>
    blog.likes > max.likes ? blog : max,
  );

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const counts = {};

  blogs.forEach((blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1;
  });

  const topAuthor = Object.keys(counts).reduce((max, author) =>
    counts[author] > counts[max] ? author : max,
  );

  return {
    author: topAuthor,
    blogs: counts[topAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const likeCounts = {};

  blogs.forEach((blog) => {
    likeCounts[blog.author] = (likeCounts[blog.author] || 0) + blog.likes;
  });

  const topAuthor = Object.keys(likeCounts).reduce((max, author) =>
    likeCounts[author] > likeCounts[max] ? author : max,
  );

  return {
    author: topAuthor,
    likes: likeCounts[topAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
