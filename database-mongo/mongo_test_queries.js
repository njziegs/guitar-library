var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/guitarTabs');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

// var LibraryModel = mongoose.model('Library', songLibrarySchema);

// var selectAll = function(callback) {
//   LibraryModel.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// selectAll(function(err, items) {
// 	console.log(items)
// });