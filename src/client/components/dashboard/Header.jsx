import React, { useState } from 'react';
import "react-datetime/css/react-datetime.css";


const rootStyle = {
  background: 'black',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  zIndex: 1
};

const leftSideStyle = {
  color: 'white',
  display: 'flex',
  flexDirection: 'row',
  padding: '10px 0px 10px 10px'
};

const rightSideStyle = {
  color: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  padding: '10px 10px 10px 0px',
  width: '20vw'
};

function Header({ left, right }) {

  return (
    <div style={rootStyle}>
      <div style={leftSideStyle}>
        {left}
      </div>
      <div style={rightSideStyle}>
        {right}
      </div>
    </div >
  );
}

export default Header;