var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var mongo = require('../app/config');
// var User = require('../app/models/user');
var db = mongo.db;
var User = mongo.User;
var Link = mongo.Link;


exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Link.find({}).then(function(links) {
    res.status(200).send(links);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;
  var title;
  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.sendStatus(404);
  }

  util.getUrlTitle(uri, function(err, urlTitle) {
    if (err) {
      console.log('Error in getting url title', err);
    } else {
      title = urlTitle;
      console.log('First on page', title);
      Link.findOne({ url: uri })
        .then(function(err, link) {
          if (err) { 
            return console.log (err);
          } else if (!link) {
            console.log('Second on page', title);
            var newLink = new Link({
              url: uri,
              title: title,
              code: uri
            });
            newLink.save(function(err, link) {
              console.log('The link table is', link);
            });
          }
          
        });
    }
  });



};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username})
    .then(function(user) {
      // if (err) { return console.log('the error is',err); }
      console.log(user);
      if (!user) {
        res.redirect('/login');
      } else {
        util.createSession(req, res, user);
      }
    });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username})
    .then(function(err, user) {
      if (err) { return console.log('the error is', err); }
      if (!user) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save()
          .then(function(newUser) {
            util.createSession(req, res, newUser);
          });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
};

exports.navToLink = function(req, res) {
  Link.findOne({ code: req.params[0] })
  .then(function(err, link) {
    if (!link) {
      res.redirect('/');
    } else {
      link.update({ code: req.params[0] }, {visits: link.visits ++})
      .then(function() {
        return res.redirect(link.url);
      })
      .save();
    }
  });
};