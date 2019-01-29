import React from 'react';
import SearchList from './SearchList.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <div id='search-bar'>
        <form onSubmit={this.props.handleSubmit}>
          <label id='search-label'>
            <input id='search-input' type="text" placeholder="Search UG for song/artist" value={this.props.searchFormValue} onChange={this.props.handleChange} />
          </label>
          <input id='search-submit' type="submit" value="GO!" />
        </form>
        <SearchList setParentState={this.props.setParentState} searchedSongs={this.props.searchedSongs}/>
      </div>
    );
  }
}

export default Search;