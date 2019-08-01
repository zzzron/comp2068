/* eslint-disable no-console */
const Blog = require('../models/blog');

exports.index = (req, res) => {
    Blog.find()
        .published()
        .populate('author')
        .then(blogs => res.json(blogs))
        .catch(err => res.status(404).send(err));
};

// exports.drafts = (req, res) => {
//     // req.isAuthenticated();
//     if (!req.isAuthenticated())
//         return res.status(401).send({ error: "Sign in midget" });

//     Blog.find({
//         author: req.session.userId
//         }).drafts()
//         .populate('author')
//         .then(blogs => {
//             res.render('blogs/index', {
//                 blogs: blogs,
//                 title: 'Drafts'
//             });
//         })
//         .catch(err => {
//             req.flash('error', `ERROR: ${err}`);
//             res.redirect('/');
//         });
// };

// exports.published = (req, res) => {
//     // req.isAuthenticated();
//     if (!req.isAuthenticated())
//         return res.status(401).send({ error: "Sign in midget" });

//     Blog.find({
//         author: req.session.userId
//         }).published()
//         .populate('author')
//         .then(blogs => {
//             res.render('blogs/index', {
//                 blogs: blogs,
//                 title: 'Published'
//             });
//         })
//         .catch(err => {
//             req.flash('error', `ERROR: ${err}`);
//             res.redirect('/');
//         });
// };

exports.show = (req, res) => {
    Blog.findOne({
        _id: req.params.id
    })
    .published()
    .then(blogs => res.json(blogs))
    .catch(err => res.status(404).send(err));
};

exports.new  = (req, res) => {
    // req.isAuthenticated();
    if (!req.isAuthenticated())
        return res.status(401).send({ error: "Sign in midget" });

    res.render('blogs/new', {
        title: 'New Blog Post'
    });
};

exports.edit = (req, res) => {
    Blog.findOne({
        _id: req.params.id,
        author: req.session.userId
    })
    .then(blogs => res.json(blogs))
    .catch(err => res.status(404).send(err));
};

exports.create = (req, res) => {
    // req.isAuthenticated();
    if (!req.isAuthenticated())
        return res.status(401).send({ error: "Sign in midget" });

    // add current author to blog
    req.boy.blog.author = req.session.userId;

    Blog.create(req.body.blog)
    .then(blogs => res.status(201).send({ success: "Blog was created" }))
    .catch(err => res.status(400).send(err));
};

exports.update = (req, res) => {
    // req.isAuthenticated();
    if (!req.isAuthenticated())
        return res.status(401).send({ error: "Sign in midget" });

    Blog.updateOne({
        _id: req.body.id,
        author: req.session.userId
    }, req.body.blog, {
        runValidators: true
    })
    .then(() => 
        res.status(202).send({ success: "Your blog was successfully updated" })
    )
    .catch(err => res.status(400).send(err));
};

exports.destroy = (req, res) => {
    // req.isAuthenticated();
    if (!req.isAuthenticated())
        return res.status(401).send({ error: "Sign in midget" });

    Blog.deleteOne({
        _id: req.body.id,
        author: req.session.userId
    })
    .then(() => 
        res.status(202).send({ success: "Your blog was successfully destroyed" })
    )
    .catch(err => res.status(400).send(err));
};