var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');

//MONGO!
var db = require('../database-mongo');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

//TEMPORARY - BYPASSING DATABASE, JUST PULLING STRAIGHT FROM UG:

const ugs = require('ultimate-guitar-scraper');

var parser = require('./parser.js');



app.get('/mySongs', function (req, res) {
	// let tabUrl = 'https://tabs.ultimate-guitar.com/tab/pink_floyd/wish_you_were_here_chords_79226';
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
    	console.log(err)
      res.sendStatus(500);
    } else {
    //  console.log(data);
      res.json(data);
    }
  });
});

app.get('/searchUG/:query', function (req, res) {
	let searchQuery = req.params.query;
	ugs.search({
	  query: searchQuery,
	  page: 1,
	  type: ['Tab', 'Chords', 'Guitar Pro']
	}, (error, tabs) => {
	  if (error) {
	    console.log(error)
	  } else {
	    res.send(tabs.slice(0, 10));
	  }
	})
})


app.post('/addSong', function (req, res) {
	console.log('server got add song reuqess')
	let tabUrl = req.body.songURL;
	ugs.get(tabUrl, (error, tab) => {
	  if (error) {
	    console.log("Error getting from UGS:", error)
	  } else {

	    let counter = 0;
	    let dirtyTab = tab.content.text;
	    let cleanTab = dirtyTab.replace(/(?:\r\n|\r|\n)/g, `<br>`);
	    var linesArray = cleanTab.split('<br>');

	   var results = [];
	    for (var i = 0; i < linesArray.length; i++) {
	    	var row = linesArray[i].split('');

	    	for (var j = 0; j < row.length; j++) {
	    		row[j] = `<span id=${counter} className='hello'>${row[j]}</span>`;
	    	  counter++;
	    	}
	    	row = row.join('');
	    	results.push(row);
	    }
	    results = results.join('<br>');

	    linesArray = linesArray.join('<br>');

	    tab.content.text = results;
	  	db.addNewSong(tab);

	  }
	})
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

