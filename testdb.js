var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/');

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db created');
});

//Create the URL table
var linkSchema = new Schema({
  url: String,
  baseURL: String,
  code: String,
  title: String,
  visits: Number,
  hidden: Boolean,
});

var Link = mongoose.model('url', urlSchema);

//Create the user table
var userSchema = new Schema({
  username: String,
  password: String,
});

var User = mongoose.model('user', userSchema);

//Test code to create a new user, then save it to the db and then retrieve it
// var testUser = new user({username: 'testPromise', password: 'testpasswordPromise'});

// testUser.save(function(error, testUser) {
//   if (error) { return console.log(error); }
//   console.log('test user saved');
// })
// .then(function () {
//   user.find(function (error, testUser) {
//     if (error) { 
//       console.log(error); 
//     } else { 
//       console.log(testUser); 
//     }
//   });
// });

exports.db = db;
exports.Link = Link;
exports.User = User;

// 'D@rkshin3s'