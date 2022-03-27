import React, { useState } from 'react';
import { Briefcase as BriefcaseIcon, CaretDown as CaretDownIcon, List as ListIcon, Person as PersonIcon } from 'react-bootstrap-icons';
import { Button, DropdownButton } from 'react-bootstrap';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";


const rootStyle = {
  background: 'black',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  zIndex: 1
};

const briefcaseIconStyle = {
  margin: '0px 7px'
};

const leftSideStyle = {
  color: 'white',
  display: 'flex',
  flexDirection: 'row',
  padding: '10px 0px 10px 10px'
};

const listIconStyle = {
  height: 25,
  width: 30,
};

const rightSideStyle = {
  color: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  padding: '10px 10px 10px 0px',
  width: '20vw'
};

function DashboardHeader(props) {
  const [destination, setDestination] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [roomCount, setRooms] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);


  return (
    <div style={rootStyle}>
      <div style={leftSideStyle}>
        <ListIcon style={listIconStyle} />
      </div>
      <div style={rightSideStyle}>
        <div>
          <PersonIcon />
          <>Sign In or Join</>
          <CaretDownIcon />
        </div>
        <div>
          <BriefcaseIcon style={briefcaseIconStyle} />
          <>My Trips</>
        </div>
      </div>
    </div >
  );
}

export default DashboardHeader;