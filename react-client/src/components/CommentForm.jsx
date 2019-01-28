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
    this.props.findHighlightedText();
  }

  render() {
    return (
      <div className='comment-form'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Comment
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}



export default CommentForm;