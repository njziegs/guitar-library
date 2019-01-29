import React from 'react';
import $ from 'jquery';

function handleClick(e, songURL, props) {
  e.preventDefault();
  console.log(e);
  console.log(songURL);
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/addSong',
    data: {songURL: songURL},
    dataType: 'json',
    success: function() {
      console.log('successfully added callback to click handler')
    }
  })
}

const SearchListItem = (props) => (
  <div>
    { props.song.artist }
    <br></br>
    { props.song.name }
    <br></br>
    { props.song.rating }
    <br></br>
    { props.song.difficulty }
    <a href='#' onClick={((e) => handleClick(e, props.song.url, props))}>Add song to my library</a>
  </div>
)

export default SearchListItem;