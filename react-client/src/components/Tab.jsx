import React from 'react';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <div id='tab'>
        Current Tab:
        <br></br>
        <div dangerouslySetInnerHTML={{ __html: this.props.currentTab }} />
      </div>
    );
  }
}

export default Tab;