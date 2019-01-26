import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      mySongs: [],
      searchedSongs: [],
      searchFormValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/mySongs', 
      success: (data) => {
        this.setState({
          mySongs: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleChange(event) {
    this.setState({searchFormValue: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    $.ajax({
      url: `/searchUG/${this.state.searchFormValue}`,
      success: (data) => {
        this.setState({
          searchedSongs: data
        }, () => console.log(this.state.searchedSongs))
      }
    })
  }

  addSongToLibrary(songURL) {
    $.ajax({
      url: '/addSong',
      method: 'POST',
      data: {songURL: songURL},
      datatype: 'json'
    })
  }

  render () {
    return (<div>
      <h1>My Library</h1>
      <List mySongs={this.state.mySongs}/>
      <Search searchedSongs = {this.state.searchedSongs} handleChange = {this.handleChange.bind(this)} handleSubmit = {this.handleSubmit.bind(this)} searchFormValue = {this.state.searchFormValue}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));