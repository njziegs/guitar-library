import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <div id='library-header-title' onClick={props.toggleLibrary}>My Library ({props.mySongs.length})</div>
   {props.showLibrary ? <ul className='library-title'> { props.mySongs.map(song => <ListItem setCurrentTab={props.setCurrentTab} song={song}/>)} </ul> : null}
  </div>
)

export default List;