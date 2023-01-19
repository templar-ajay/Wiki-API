function getArticles(req, res) {
  this.find((err, foundArticles) => {
    res.send(err || foundArticles);
  });
}

function createArticle(req, res) {
  const { title, content } = req.body;
  const newArticle = new this({
    title: title,
    content: content,
  });
  newArticle.save((err) => {
    res.send(err || `${newArticle} has been saved :)`);
  });
}

function deleteArticles(req, res) {
  this.deleteMany({}, (err) => {
    res.send(err || "success :) you deleted every article");
  });
}

function getOne(req, res) {
  this.findOne({ title: req.params.articleTitle }, (err, foundArticle) => {
    res.send(err || foundArticle);
  });
}

function deleteOneArticle(req, res) {
  this.deleteOne({ title: req.params.articleTitle }, (err) => {
    if (!err) res.send("deleted");
  });
}

function updateArticle(req, res) {
  this.updateOne(
    { title: req.params.articleTitle },
    {
      title: req.body.title,
      content: req.body.content,
    },
    (err) => {
      if (!err) res.send("done");
    }
  );
}

module.exports = {
  deleteArticles,
  getArticles,
  createArticle,
  deleteOneArticle,
  updateArticle,
  getOne,
};
