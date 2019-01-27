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
      <div>
        Current Tab:
        <br></br>
        {this.props.currentTab}
      </div>
    );
  }
}

export default Tab;