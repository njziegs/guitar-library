import React from 'react';
import SearchListItem from './SearchListItem.jsx';

const SearchList = (props) => (
  <div>
    <h4>  </h4>
    Here are { props.searchedSongs.length } search results.
    { props.searchedSongs.map(song => <SearchListItem setParentState={props.setParentState} song={song}/>)}
  </div>
)

export default SearchList;