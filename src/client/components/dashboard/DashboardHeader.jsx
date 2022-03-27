import React, { useState } from 'react';
import { Briefcase as BriefcaseIcon, CaretDown as CaretDownIcon, List as ListIcon, Person as PersonIcon } from 'react-bootstrap-icons';
import { Button, Dropdown, FormControl } from 'react-bootstrap';
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
  margin: '5px 7px'
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

const signInStyle = {
  color: 'white'
};

const myTripStyle = {
  display: 'flex',
  flexDirection: 'row',
};

function DashboardHeader(props) {
  const [destination, setDestination] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [roomCount, setRooms] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);

  const onSignInOrJoinClick = () => { };
  const onMyTripsClick = () => { };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={signInStyle}
    >
      {children}
    </a>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

  return (
    <div style={rootStyle}>
      <div style={leftSideStyle}>
        <ListIcon style={listIconStyle} />
      </div>
      <div style={rightSideStyle}>
        <div>
          <Dropdown onChange={onSignInOrJoinClick}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              <PersonIcon />
              <>Sign In or Join</>
              <CaretDownIcon />
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
              <Dropdown.Item eventKey="1">Sign In</Dropdown.Item>
              <Dropdown.Item eventKey="2">Join</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div style={myTripStyle}>
          <BriefcaseIcon style={briefcaseIconStyle} />
          <div onClick={onMyTripsClick}>My Trips</div>
        </div>
      </div>
    </div >
  );
}

export default DashboardHeader;