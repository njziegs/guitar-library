import React from 'react';
import IndividualNote from './IndividualNote.jsx'

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
      <div>
        <h4>Notes for this Song</h4>
        You have { this.props.currentNotes.length } notes about this song.
        { this.props.currentNotes.map(note => <IndividualNote note={note}/>)}
      </div>
    )
  }
}

export default Notes;