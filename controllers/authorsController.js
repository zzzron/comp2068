const Author = require('../models/author');


exports.new = (req, res) => {
  res.render('authors/new', {
    title: `New Author`
  });
};


exports.create = (req, res) => {
  Author.create(req.body.author)
    .then(() => 
      res.staus(202).send({ success: "Author was created successfully" })
    )
    .catch(err => res.staus(400).send(err));
};