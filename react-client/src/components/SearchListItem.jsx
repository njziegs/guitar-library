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
    dataType: 'json'
  })
}

const SearchListItem = (props) => (
  <li className='search-result'><a href='#'>
    <b>{ props.song.artist }</b>
    <br></br>
    { props.song.name }
    <br></br>
    Rating: { props.song.rating }
    <br></br>
    Number of Ratings: {props.song.numberRates}
    <a href='#' onClick={((e) => handleClick(e, props.song.url, props))}>Add song to my library</a></a>
  </li>
)

export default SearchListItem;