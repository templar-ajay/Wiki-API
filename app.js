const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const {
  getArticles,
  deleteArticles,
  createArticle,
  updateArticle,
  deleteOneArticle,
  getOne,
} = require("./operations.js");
mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", () => {
  console.log("connected");
});

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

const app = express();

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

// requests targeting all articles
app
  .route("/articles")
  .get(getArticles.bind(Article))
  .post(createArticle.bind(Article))
  .delete(deleteArticles.bind(Article));

// requests targeting specific article
app
  .route("/articles/:articleTitle")
  .get(getOne.bind(Article))
  .put(updateArticle.bind(Article))
  .patch(updateArticle.bind(Article))
  .delete(deleteOneArticle.bind(Article));

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
