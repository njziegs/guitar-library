import React from 'react';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaStartVal: '',
      textAreaEndVal: ''
    }
  }

  getPosition() {
    let textVal = this.refs.myTextarea; 
    let cursorStart = textVal.selectionStart;
    let cursorEnd = textVal.selectionEnd;
    // this.state.textareaVal.substring(cursorStart,cursorEnd) 
    console.log(this.state.textareaVal)
  }

  render() {
    return (
      <div id='tab'>
        Current Tab:
        <br></br>
        <div 
          ref='myTextArea' 
          onMouseDown={(event)=>{
            this.setState({
              textareaVal:event.target.value
            }, () => {console.log(this.state.textareaStartVal)})
          }}
          onMouseUp={(event)=>{
            this.setState({
              textareaVal:event.target.value
            }, () => {console.log(this.state.textAreaEndVal)})
          }}
          dangerouslySetInnerHTML={{ __html: this.props.currentTab }} />
      </div>
    );
  }
}

export default Tab;