import React from 'react';
import IndividualNote from './IndividualNote.jsx';
import CommentForm from './CommentForm.jsx'

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaStartVal: '',
      textAreaEndVal: ''
    }
  }

  render() {
    return (
      <div id='notes'>
        My Notes ({ this.props.notes.length })
        <ul id='notes-header'>{ this.props.notes.map(note => <IndividualNote note={note}/>)}
          <li className='note'> <CommentForm findHighlightedText={this.findHighlightedText}/></li>
        </ul>
      </div>
    )
  }
}

export default Notes;