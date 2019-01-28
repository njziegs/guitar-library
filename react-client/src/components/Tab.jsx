import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

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
    let fullReact = ReactHtmlParser(this.props.currentTab);
    // fullReact.replace('classname', '')
    return <div>{ ReactHtmlParser(this.props.currentTab) }</div>;
  }
}

export default Tab;