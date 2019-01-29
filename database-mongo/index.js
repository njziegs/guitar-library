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
  content: {text: String},
  notes: [String]

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

  song.notes = [];

  var newSong = new LibraryModel(song);
  newSong.save()
     .then(doc => {
     })
     .catch(err => {
       console.error(err)
     }) 
}

var updateSong = function(song) {
  console.log('IN THE DATABSE FUNCTION')
  console.log(song)
  song.data._id = `ObjectId(${song.data._id})`
//Model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)
  try {
    LibraryModel.findOneAndUpdate( 
      {url: song.data.url},  //ObjectId("5c4fb11a0668491b5a29488c")
      {content: {"text": song.data.content.text},
       notes: song.data.notes}, //"content" : { "text" : "<span id
      {upsert: true},
      function() {console.log('What even is this')})
  } catch (e) {
  console.log(e)
  } finally {
    console.log('success...?')
  }
}

let dummyData = {data: {
  _id: "ObjectId(5c4fb54035cd851cd4779aa4)",
  notes: ['dummy notes!'],
  content: 'great content'
}}

// updateSong(dummyData);


module.exports.selectAll = selectAll;
module.exports.addNewSong = addNewSong;
module.exports.updateSong = updateSong;