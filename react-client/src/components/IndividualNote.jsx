import React from 'react';

function handleClick(e, id, props) {
  e.preventDefault();
  console.log(e);
  props.setCurrentTab(id);
}

const IndividualNote = (props) => (
  <div>
    {props.note}
  </div>
)

export default IndividualNote;