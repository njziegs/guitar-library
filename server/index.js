var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');

//MONGO!
var db = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

//TEMPORARY - BYPASSING DATABASE, JUST PULLING STRAIGHT FROM UG:

const ugs = require('ultimate-guitar-scraper');



app.get('/mySongs', function (req, res) {
	// let tabUrl = 'https://tabs.ultimate-guitar.com/n/nirvana/smells_like_teen_spirit_ver2_crd.htm';
	// let mockLibrary = [];
	// ugs.get(tabUrl, (error, tab) => {
	//   if (error) {
	//     console.log(error)
	//   } else {
	//   	mockLibrary.push(tab)
	//     console.log(mockLibrary);
	//     res.send(mockLibrary);
	//   }
	// })
	//res.send()
  db.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

app.get('/searchUG', function (req, res) {
	ugs.search({
	  query: 'Wish You Were Here',
	  page: 1,
	  type: ['Tab', 'Chords', 'Guitar Pro']
	}, (error, tabs) => {
	  if (error) {
	    console.log(error)
	  } else {
	    console.log(tabs);
	    res.send(tabs.slice(0, 10));
	  }
	})
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

