import React, { useState } from 'react';
import { Search as SearchIcon, Calendar as CalendarIcon, DashCircle as MinusIcon, PlusCircle as PlusIcon } from 'react-bootstrap-icons';
import { Button, DropdownButton } from 'react-bootstrap';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

const inputContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  margin: 'auto',
  paddingTop: 20,
  width: '80%'
};

const dropdownInputContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  margin: 'auto',
  paddingBottom: 20,
  paddingTop: 20,
  width: '80%'
};

const searchInputContainerStyle = {
  marginTop: 'auto',
  position: 'relative',
  width: '40%'
};

const searchInputStyle = {
  marginRight: 20,
  paddingLeft: 20,
  position: 'relative',
  width: '90%'
};

const checkInInputContainerStyle = {
  marginRight: 20,
  position: 'relative',
  width: '22%'
};

const checkOutInputContainerStyle = {
  marginRight: 20,
  position: 'relative',
  width: '22%'
};

const dateTimeStyle = {
  width: '100%'
};

const inputButtonStyle = {
  height: 40,
  margin: 'auto',
  width: 90
};

const roomInputContainerStyle = {
  position: 'relative',
  width: '10%'
};

const roomDropdownEntryStyle = {
  display: 'flex',
  flexDirection: 'row',
  margin: 'auto 10px auto 10px',
  justifyContent: 'space-between'
};

const dropdownEntrySelectorStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 50
};

const searchIconStyle = {
  bottom: 12,
  height: 15,
  left: 4,
  position: 'absolute',
  width: 15,
};

const calendarIconStyle = {
  bottom: 12,
  right: 4,
  height: 15,
  position: 'absolute',
  width: 15,
};

const rootStyle = {
  background: '#c8d8e4',
  display: 'flex',
  flexDirection: 'column'
};

const MIN_ROOM_COUNT = 0;
const MAX_ROOM_COUNT = 10;
const MIN_ADULT_COUNT = 0;
const MAX_ADULT_COUNT = 10;
const MIN_CHILDREN_COUNT = 0;
const MAX_CHILDREN_COUNT = 10;

function DashboardHeader(props) {
  const [destination, setDestination] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [roomCount, setRooms] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);

  const onRoomMinusClick = () => {
    if (roomCount === MIN_ROOM_COUNT) {
      return;
    }
    setRooms(roomCount - 1);
  };
  const onRoomPlusClick = () => {
    if (roomCount === MAX_ROOM_COUNT) {
      return;
    }
    setRooms(roomCount + 1);
  };
  const onAdultMinusClick = () => {
    if (adultCount === MIN_CHILDREN_COUNT) {
      return;
    }
    setAdultCount(adultCount - 1);
  };
  const onAdultPlusClick = () => {
    if (adultCount === MAX_CHILDREN_COUNT) {
      return;
    }
    setAdultCount(adultCount + 1);
  };
  const onChildrenMinusClick = () => {
    if (childrenCount === MIN_ADULT_COUNT) {
      return;
    }
    setChildrenCount(childrenCount - 1);
  };
  const onChildrenPlusClick = () => {
    if (childrenCount === MAX_ADULT_COUNT) {
      return;
    }
    setChildrenCount(childrenCount + 1);
  };

  const checkInDateTimeInputProps = {
    placeholder: 'Check In'
  };
  const checkOutDateTimeInputProps = {
    placeholder: 'Check Out'
  };

  return (
    <div style={rootStyle}>
      <div style={inputContainerStyle}>
        <div style={searchInputContainerStyle}>
          <input className="form-control" type="text" placeholder='Where are you traveling?' aria-label="Destination" onChange={setDestination} style={searchInputStyle} />
          <SearchIcon style={searchIconStyle} role="button" tabIndex="-1" />
        </div>
        <div style={checkInInputContainerStyle}>
          <Datetime inputProps={checkInDateTimeInputProps} onChange={setCheckInDate} />
          <CalendarIcon style={calendarIconStyle} role="button" tabIndex="-1" />
        </div>
        <div style={checkOutInputContainerStyle}>
          <Datetime inputProps={checkOutDateTimeInputProps} onChange={setCheckOutDate} />
          <CalendarIcon style={calendarIconStyle} role="button" tabIndex="-1" />
        </div>
        <Button variant="outline-primary" style={inputButtonStyle} type="submit">
          Submit
        </Button>
      </div>
      <div style={dropdownInputContainerStyle}>
        <div style={roomInputContainerStyle}>
          <DropdownButton id="dropdown-basic-button" title="Rooms" variant="outline-primary">
            <div style={roomDropdownEntryStyle}>
              <>Rooms</>
              <div style={dropdownEntrySelectorStyle}>
                <MinusIcon onClick={onRoomMinusClick} onKeyPress={onRoomMinusClick} style={{ marginTop: 5 }} />
                {roomCount}
                <PlusIcon onClick={onRoomPlusClick} onKeyPress={onRoomPlusClick} style={{ marginTop: 5 }} />
              </div>
            </div>
            <div style={roomDropdownEntryStyle}>
              <>Adults</>
              <div style={dropdownEntrySelectorStyle}>
                <MinusIcon onClick={onAdultMinusClick} onKeyPress={onAdultMinusClick} style={{ marginTop: 5 }} />
                {adultCount}
                <PlusIcon onClick={onAdultPlusClick} onKeyPress={onAdultPlusClick} style={{ marginTop: 5 }} />
              </div>
            </div>
            <div style={roomDropdownEntryStyle}>
              <>Children</>
              <div style={dropdownEntrySelectorStyle}>
                <MinusIcon onClick={onChildrenMinusClick} onKeyPress={onChildrenMinusClick} style={{ marginTop: 5 }} />
                {childrenCount}
                <PlusIcon onClick={onChildrenPlusClick} onKeyPress={onChildrenPlusClick} style={{ marginTop: 5 }} />
              </div>
            </div>
          </DropdownButton>
        </div>
      </div >
    </div >
  );
}

export default DashboardHeader;