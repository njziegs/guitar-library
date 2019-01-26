import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label>
          Search for an artist or song:
          <input type="text" value={this.props.searchFormValue} onChange={this.props.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Search;