import React from 'react';

function handleClick(e, id, props) {
  e.preventDefault();
  console.log(e);
  props.setCurrentTab(id);
}

const IndividualNote = (props) => (

    <li className='note'>{props.note}</li>

)

export default IndividualNote;