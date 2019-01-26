import React from 'react';
import $ from 'jquery';

function handleClick(e, songURL) {
  e.preventDefault();
  console.log(e);
  console.log(songURL);
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/addSong',
    data: {songURL: songURL},
    dataType: 'json',
    success: function() {
      console.log('success sending song url to server')
    }
  })
}

const SearchListItem = (props) => (
  <div>
    { props.song.artist }
    <br></br>
    { props.song.name }
    <br></br>
    { props.song.url }
    <br></br>
    { props.song.rating }
    <br></br>
    { props.song.difficulty }
    <br></br>
    <a href='#' onClick={((e) => handleClick(e, props.song.url))}>Add song to my library</a>
  </div>
)

export default SearchListItem;