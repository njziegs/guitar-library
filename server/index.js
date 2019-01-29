const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo');
const ugs = require('ultimate-guitar-scraper');
const parser = require('./parser.js');

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}))
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/mySongs', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
    	console.log(err)
      res.sendStatus(500);
    } else {
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
	    res.send(tabs.slice(0, 20));
	  }
	})
})


app.post('/addSong', function (req, res) {
	let tabUrl = req.body.songURL;
	ugs.get(tabUrl, (error, tab) => {
	  if (error) {
	    console.log("Error getting from UGS:", error)
	  } else {

	  	//PARSE JSON INTO HTML
	    let counter = 0;
	    let dirtyTab = tab.content.text;
	    let cleanTab = dirtyTab.replace(/(?:\r\n|\r|\n)/g, `<br>`);
	    var linesArray = cleanTab.split('<br>');

			var results = [];
			for (var i = 0; i < linesArray.length; i++) {
					var row = linesArray[i].split('');

					for (var j = 0; j < row.length; j++) {
						row[j] = `<span id=${counter}>${row[j]}</span>`;
					  counter++;
					}
					row = row.join('');
					results.push(row);
			}

	    results = results.join('<br>');

	    linesArray = linesArray.join('<br>');

	    //ADD A NOTES PROPERTY, SET TEXT PROPERT
	    tab.content.text = results;
	    tab.notes = [];
	  	db.addNewSong(tab);
	  }
	})
})

app.put('/mySongs/update/:id', function (req, res) {
	let id = req.params.id;
	console.log(req.body)
	db.updateSong(req.body)
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

