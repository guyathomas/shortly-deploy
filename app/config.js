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

var Link = mongoose.model('url', linkSchema);

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



// 'D@rkshin3s'
var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});
//Create database
var oldDb = require('bookshelf')(knex);


// //Creates table
// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// //Creates table
// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

exports.db = db;
exports.Link = Link;
exports.User = User;


// module.exports = db;
