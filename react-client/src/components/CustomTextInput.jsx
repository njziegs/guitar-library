import React from 'react';
import ReactDOM from 'react-dom';


class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  focusTextInput() {
    console.log(this.myRef)
  }
  render() {
    return <div ref={this.myRef} />;
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
  }
}

export default CustomTextInput