import React from 'react';

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
  </div>
)

export default SearchListItem;