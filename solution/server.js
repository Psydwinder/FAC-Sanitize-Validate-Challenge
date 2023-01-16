const express = require("express");
const { home } = require("./templates.js");

const server = express();

const posts = [];

server.get("/", (req, res) => {
  const body = home(posts);
  res.send(body);
});

server.post("/", express.urlencoded({ extended: false }), (req, res) => {
  const nickname = req.body.nickname;
  const message = req.body.message;
  const errors = {};
  if (!nickname) {
    errors.nickname = "Please enter your nickname";
  }
  if (!message) {
    errors.message = "Please enter a message";
  }
  if (Object.keys(errors).length) {
    const body = home(posts, errors, req.body);
    res.status(400).send(body);
  } else {
    const created = Date.now();
    posts.push({ nickname, message, created });
    res.redirect("/");
  }
});

module.exports = server;
