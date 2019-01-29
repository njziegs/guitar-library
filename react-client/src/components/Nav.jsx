import React from 'react';

function handleClick(e, id, props) {
  e.preventDefault();
  console.log(e);
  props.setCurrentTab(id);
}

const Nav = (props) => (
	<nav>
	  <ul className="nav-bar">
	    <li className="nav"><a href="#">Home</a></li>
	    <li className="active nav"><a href="#">About</a></li>
	    <li className="nav"><a href="#">Portfolio</a></li>
	    <li className="nav"><a href="#">Contact</a></li>
	  </ul>
	</nav>
)

export default Nav;