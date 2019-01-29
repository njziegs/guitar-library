import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import CommentForm from './CommentForm.jsx';


class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaStartVal: '',
      textAreaEndVal: ''
    }
  }

  render() {
    let fullReact = ReactHtmlParser(this.props.currentTab);
    return (
      <div id='tab-container'>
        <div id='tab-title'> {this.props.title.artist} - {this.props.title.name} </div>
        <div id='tab'>{ ReactHtmlParser(this.props.currentTab) }</div>
      </div>
      )
  }
}

export default Tab;