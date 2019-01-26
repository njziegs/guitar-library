var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/guitarTabs');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var songLibrarySchema = new mongoose.Schema({
  artist: String,
  name: String,
  url: String,
  rating: Number,
  numberRates: Number,
  type: String,
  difficulty: String,
  tuning: String,
  content: {type: {type: String}}

});

var LibraryModel = mongoose.model('Library', songLibrarySchema);

var selectAll = function(callback) {
  LibraryModel.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var addNewSong = function(song) {
  // var newSong = new LibraryModel({
  //   artist: "yo",
  //   name: "stuff",
  //   url: "www.goog.com",
  //   rating: 4,
  //   numberRates: 32,
  //   type: 'chords',
  //   difficulty: 'easy',
  //   tuning: 'EADG',
  //   content: {text: 'lots of text'}
  // })
  console.log('called new song')
  console.log(song)

  var newSong = new LibraryModel(song);
  newSong.save()
     .then(doc => {
       console.log(doc)
     })
     .catch(err => {
       console.error(err)
     })
}


module.exports.selectAll = selectAll;
module.exports.addNewSong = addNewSong;