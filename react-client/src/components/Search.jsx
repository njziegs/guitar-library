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
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <label>
            Search for an artist or song:
            <input type="text" value={this.props.searchFormValue} onChange={this.props.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <SearchList setParentState={this.props.setParentState} searchedSongs={this.props.searchedSongs}/>
      </div>
    );
  }
}

export default Search;