import React from 'react';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.props.findHighlightedText)
    this.props.findHighlightedText(this.state.value);
  }

  render() {
    return (
      <div id='comment-form'>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input id='notes-input' placeholder='Add a note here' type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input id='notes-submit' type="submit" value="Save" />
        </form>
      </div>
    );
  }
}



export default CommentForm;