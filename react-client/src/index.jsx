import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import Tab from './components/Tab.jsx';
import CustomTextInput from './components/CustomTextInput.jsx';
import CommentForm from './components/CommentForm.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      mySongs: [],
      searchedSongs: [],
      searchFormValue: '',
      currentSong: {content: {text: ''}},
      currentComment: '',
      showNotes: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayNote = this.displayNote.bind(this);
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

  setParentState() {
    this.forceUpdate();
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

  setCurrentTab(id) {
    for (var i = 0; i < this.state.mySongs.length; i++) {
      let song = this.state.mySongs[i];
      if (song._id === id) {
        if (!song.notes) {
          song.notes = {};
          song.notesCount = 0;
        }
       // this.setState({currentTab: song.content.text})
        this.setState({currentSong: song})
      }
    }
  }

  addSongToLibrary(songURL) {
    $.ajax({
      url: '/addSong',
      method: 'POST',
      data: {songURL: songURL},
      datatype: 'json'
    })
  }

  displayNote() {
    // e.preventDefault();

    console.log("highlighed note clicked!");
    console.log(e.target)
  }

  findHighlightedText() {
    console.log('called')
    // var selection= window.getSelection().getRangeAt(0);
    // var selectedText = selection.extractContents();
    // console.log(selection)
    // console.log(selectedText)
    //  var span= document.createElement("span");
    //  span.style.backgroundColor = "yellow";
    //  span.appendChild(selectedText);
    //  selection.insertNode(span);
    let sel = window.getSelection();
    let focus = sel.focusNode.parentNode.id;
    let anchor = sel.anchorNode.parentNode.id;
    let start = `<span id=${(Math.min(focus, anchor))}>`;
    let end = `<span id=${(Math.max(focus, anchor) + 1)}>`;
    
    let tab = this.state.currentSong.content.text;
 
    RegExp.quote = function(str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")};
    // str1 = "pattern"
    // var re = new RegExp(start, "g");
    // tab.replace(re, "regex");
    var regExStart = new RegExp(RegExp.quote(start), "g");
    tab = tab.replace(regExStart, `<a onClick={this.displayNote}><span id='notes_${this.state.currentSong.notesCount}' className='highlight' ><span id=${(Math.min(focus, anchor))}>`);

    var regExEnd = new RegExp(RegExp.quote(end), "g");
    tab = tab.replace(regExEnd, `</a></span></span>`);

    // console.log('focus', focus)
    // console.log(anchor)
    console.log(tab);
    let editedSong = this.state.currentSong;
    editedSong.content.text = tab;
    this.setState({currentSong: editedSong});

    // tab.splice(selectedStringEnd + 1, 0, '</a>');
    // tab.splice(selectedStringStart - 1, 0, '<a href = "www.google.com">');

    
    // var replace = "regex";
    // var re = new RegExp(replace,"g");

    // str1 = "."
    // var re = new RegExp(RegExp.quote(start), "g");
    // .replace(re, "regex");

  }

  render () {
    return (<div>
      <h1>My Library</h1>
      <List setCurrentTab={this.setCurrentTab.bind(this)} mySongs={this.state.mySongs}/>
      <Search setParentState={this.setParentState.bind(this)} searchedSongs = {this.state.searchedSongs} handleChange = {this.handleChange.bind(this)} handleSubmit = {this.handleSubmit.bind(this)} searchFormValue = {this.state.searchFormValue}/>
      <Tab displayNote={this.displayNote.bind(this)} currentTab={this.state.currentSong.content.text}/>
      <CommentForm findHighlightedText={this.findHighlightedText.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));