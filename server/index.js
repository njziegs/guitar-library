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

app.get('/cleanTab', function (req, res) {
	let dirtyTab = { text: '---------------------\n POOL ~ QUARTERBACKS\n---------------------\n\nTuning: Standard\n(He actually plays without a high E string)\n\n  Riff Thing\nB|---3--1--0---------------|\nG|------------2--4--2--0---|\nD|-------------------------|\nA|-------------------------|\nE|-------------------------|\n\n  Chords   [ch]G[/ch]   [ch]C[/ch]   [ch]D[/ch]  [ch]C7M[/ch] [ch]G7M[/ch] [ch]G/D[/ch]\nB|---------0---0---3---0---0---0---|\nG|---------0---0---2---0---0---0---|\nD|---------0---2---0---2---4---8---|\nA|---------2---3-------3---5--10---|\nE|---------3-----------3---5--10---|\n\n                      [ch]G[/ch]\nI THOUGHT I\'D SEE YOU AROUND \n\n                         [ch]C[/ch]\nNOT EVERY DAY BUT PRETTY OFTEN \n\n                               [ch]D[/ch]\nNOW THAT YOU\'RE REALLY LEAVING TOWN \n\n                            [ch]C[/ch]\nI JUST WISH I HAD BEEN MORE HONEST \n\n                  [ch]G[/ch]\nREMEMBER OVER THE SUMMER \n\n                      [ch]C[/ch] \nWHEN I FIRST GOT YOUR NUMBER\n\n                           [ch]D[/ch] \nI THOUGHT THAT WE COULD BE FRIENDS \n\n                   [ch]C[/ch]\nOR MAYBE SOMETHING BETTER \n\n\n\n         [ch]C7M[/ch]\nMY HEART SKIPPED \n\n       [ch]G7M[/ch]\nIN NEW BRUNSWICK \n\n             [ch]G/D[/ch]\nYOU WERE ALL SWIMMING \n\n              [ch]C7M[/ch]\nAND I FELT SO HOMESICK \n\n\nWALKED TO DEV\'S CAR \n\n          [ch]G7M[/ch]\nTO MAKE A PHONE CALL \n\n               [ch]G/D[/ch]\nBUT YOU DIDN\'T PICK UP \n\n              [ch]C7M[/ch]\nAND I FELT SO DESPERATE \n\n\nIN THE BACKSEAT \n\n         [ch]G7M[/ch]\nSWIMSUIT DRIPPING \n\n         [ch]G/D[/ch]\nI MADE A PROMISE \n\n                 [ch]C7M[/ch]\nTHAT WHEN WE GOT BACK TO POUGHKEEPSIE \n\n\nI WOULDN\'T CALL YOU \n\n         [ch]G7M[/ch]\nWOULDN\'T INVOLVE YOU \n\n  [ch]G/D[/ch]\nI GUESS \n\n                  [ch]C7M[/ch]\nYOU WERE JUST TOO BUSY \n\n\n\n                        [ch]G[/ch]\nONE TIME I SHOWED YOU A SONG \n\n                             [ch]C[/ch]\nYOU ONLY THOUGHT THAT IT WAS KIND OF GOOD \n\n                  [ch]D[/ch]\nI NEVER PLAYED IT AGAIN\n \n                     [ch]C[/ch]\nIT WASN\'T EVEN ABOUT YOU\n\n\n' };
	//let cleanTab = parser.tabs(dirtyTab.text);
	let cleanText = dirtyTab.text.replace(/(?:\r\n|\r|\n)/g, '<br>');
	let cleanTab = {text: cleanText}
	res.send(cleanTab);
})

app.post('/addSong', function (req, res) {
	console.log('server got add song reuqess')
	let tabUrl = req.body.songURL;
	ugs.get(tabUrl, (error, tab) => {
	  if (error) {
	    console.log("Error getting from UGS:", error)
	  } else {
	  	// console.log(tab);
	  	// tab = parser.tabs(tab.content.text);
	  	// tab.cleanTab = cleanTab;
	  //	console.log(parser.tabs(tab.content.text));
	    let dirtyTab = tab.content.text;
	    let cleanTab = dirtyTab.replace(/(?:\r\n|\r|\n)/g, '<br>');
	    tab.content.text = cleanTab;
	  	db.addNewSong(tab);
	  //	res.send(parser.tabs(tab.content.text))
	  	// mockLibrary.push(tab)
	   //  console.log(mockLibrary);
	   //  res.send(mockLibrary);
	  }
	})
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

