import React from 'react';
import SearchListItem from './SearchListItem.jsx';

const SearchList = (props) => (
  <div>
    <ul id='search-results-list'> { props.searchedSongs.map(song => <SearchListItem setParentState={props.setParentState} song={song}/>) } </ul>
  </div>
)

export default SearchList;