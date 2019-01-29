import React from 'react';

function handleClick(e, id, props) {
  e.preventDefault();
  console.log(e);
  props.setCurrentTab(id);
}

const ListItem = (props) => (
  <div>
    { props.song.artist }
    <br></br>
    { props.song.name }
    <br></br>
    <a href='#' onClick={((e) => handleClick(e, props.song._id, props))}>Check out the tabs!</a>
  </div>
)

export default ListItem;