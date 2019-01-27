import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4>  </h4>
    You have { props.mySongs.length } songs saved in your library.
    { props.mySongs.map(song => <ListItem setCurrentTab={props.setCurrentTab} song={song}/>)}
  </div>
)

export default List;