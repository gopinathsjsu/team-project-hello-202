import React, { useState } from 'react';
import { Search as SearchIcon, Calendar as CalendarIcon, DashCircle as MinusIcon, PlusCircle as PlusIcon } from 'react-bootstrap-icons';
import { Button, DropdownButton } from 'react-bootstrap';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { useNavigate } from "react-router-dom";

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
  width: 90,
  zIndex: 0
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

const leftSideStyle = {
  width: '80%'
};

const rightSideStyle = {
  margin: 'auto'
};

const rootStyle = {
  background: 'white',
  borderRadius: 25,
  display: 'flex',
  flexDirection: 'row',
  margin: '5vh',
  zIndex: 0,
};

const MIN_ROOM_COUNT = 0;
const MAX_ROOM_COUNT = 10;
const MIN_PEOPLE_COUNT = 0;
const MAX_PEOPLE_COUNT = 10;

function HotelSearchForm({ setRooms }) {
  let navigate = useNavigate();

  const [destination, setDestination] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [roomCount, setRoomCount] = useState(0);
  const [roomType, setRoomType] = useState('single');
  const [peopleCount, setPeopleCount] = useState(0);

  const setLocationDestination = (e) => {
    setDestination(e.target.value)
  }

  const onRoomMinusClick = () => {
    if (roomCount === MIN_ROOM_COUNT) {
      return;
    }
    setRoomCount(roomCount - 1)
  };
  const onRoomPlusClick = () => {
    if (roomCount === MAX_ROOM_COUNT) {
      return;
    }
    setRoomCount(roomCount + 1)
  };
  const onPeopleMinusClick = () => {
    if (peopleCount === MIN_PEOPLE_COUNT) {
      return;
    }
    setPeopleCount(peopleCount - 1)
    if (peopleCount <= 1) {
      setRoomType('single')
    } else if (peopleCount > 1 && peopleCount <= 4) {
      setRoomType('double')
    } else {
      setRoomType('suite')
    }
  };
  const onPeoplePlusClick = () => {
    if (peopleCount === MAX_PEOPLE_COUNT) {
      return;
    }
    setPeopleCount(peopleCount + 1)
    if (peopleCount <= 1) {
      setRoomType('single')
    } else if (peopleCount > 1 && peopleCount <= 4) {
      setRoomType('double')
    } else {
      setRoomType('suite')
    }
  };
  const onSubmitClick = () => {
    fetch('http://Hmanage-env.eba-ibcrgcpt.us-east-2.elasticbeanstalk.com/availability', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        checkInDate: checkInDate.toDate(),
        checkOutDate: checkOutDate.toDate(),
        destination,
        roomCount,
        roomType
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((responseData) => {
            const { rooms } = responseData
            setRooms(rooms)
            navigate("/search");
          });
        }
        console.log('Error occurred:');
        console.log(res);
        return { errorMessages: { REQUEST_ERROR: res.statusText } };
      })
      .catch((exception) => {
        console.log('Error occurred:');
        console.log(exception);
      });
  }

  const checkInDateTimeInputProps = {
    placeholder: 'Check In'
  };
  const checkOutDateTimeInputProps = {
    placeholder: 'Check Out'
  };

  return (
    <div style={rootStyle}>
      <div style={leftSideStyle}>
        <div style={inputContainerStyle}>
          <div style={searchInputContainerStyle}>
            <input className="form-control" type="text" placeholder='Where are you traveling?' aria-label="Destination" onChange={setLocationDestination} style={searchInputStyle} />
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
                <>People</>
                <div style={dropdownEntrySelectorStyle}>
                  <MinusIcon onClick={onPeopleMinusClick} onKeyPress={onPeopleMinusClick} style={{ marginTop: 5 }} />
                  {peopleCount}
                  <PlusIcon onClick={onPeoplePlusClick} onKeyPress={onPeoplePlusClick} style={{ marginTop: 5 }} />
                </div>
              </div>
            </DropdownButton>
          </div>
        </div>
      </div>
      <div style={rightSideStyle}>
        <Button onClick={onSubmitClick} variant="outline-primary" style={inputButtonStyle} type="submit">
          Submit
        </Button>
      </div >
    </div >
  );
}

export default HotelSearchForm;