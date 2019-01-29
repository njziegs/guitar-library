import React from 'react';

function handleClick(e, id, props) {
  e.preventDefault();
  console.log(e);
  props.setCurrentTab(id);
}

const ListItem = (props) => (
  <li className='library-item'>
    <h3>{ props.song.artist }</h3>
    <p>{ props.song.name } | <a href='#' onClick={((e) => handleClick(e, props.song._id, props))}>View tabs</a> </p>
  </li>
)

export default ListItem;