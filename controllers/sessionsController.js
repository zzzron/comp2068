const Author = require('../models/author');
const jwt = require('jsonwebtoken');

// exports.login = (req, res) => {
//   res.render('sessions/login', {
//     title: 'Login'
//   });
// };

exports.authenticate = (req, res) => {
    Author.findOne({
        email: req.body.email
      })
      .then(author => {
        author.authenticate(req.body.password, (err, isMatch) => {
          if (err) throw new Error(err);
  
          if (isMatch) {
            req.session.userId = author.id;

            const token = jwt.sign({ payload: req.body.email }, "bobthebuilder", { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true })
            .status(201)
            .send({sucess: "You were authenticated"});
  
            // req.flash('success', 'You are logged in.');
            // res.redirect('/blogs');
          } else {
            console.log("Not a match", err)
            res.status(401).json(err);
            // req.flash('error', `ERROR: Your credentials do not match.`);
            // res.redirect('/login');
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(401).json(err);
        // req.flash('error', `ERROR: ${err}`);
        // res.redirect('/login');
      });
};

exports.logout = (req, res) => {
    // req.session.userId = null;
    // req.flash('success', 'You are logged out');
    // res.redirect('/');

    if (!req.isAuthenticated()) 
      res.status(401).send({ error: "Could not authenticate" });

    req.session.userId = null;
    res
      .clearCookie("token")
      .status(200)
      .send({ success : "You are now logged out" });
};