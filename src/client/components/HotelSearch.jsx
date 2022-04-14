import React, { useState } from 'react';

import "react-datetime/css/react-datetime.css";
import Image from 'react-bootstrap/Image'
import HotelSearchForm from './HotelSearchForm';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';

const hotelSearchStyle = {
  position: 'relative'
}

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
};


const backgroundImageStyle = {
  height: '100vh',
  position: 'absolute',
  width: '100vw',
};

const MIN_ROOM_COUNT = 0;
const MAX_ROOM_COUNT = 10;
const MIN_ADULT_COUNT = 0;
const MAX_ADULT_COUNT = 10;
const MIN_CHILDREN_COUNT = 0;
const MAX_CHILDREN_COUNT = 10;

function HotelSearch(props) {
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
  const onSubmitClick = () => {
    fetch('http://localhost:8080/getRooms', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        adultCount, checkInDate, checkOutDate, childrenCount, destination, roomCount
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((responseData) => {
            const { rooms } = responseData;
            // TODO: Set rooms and change page view
            return responseData;
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
      <Image src="https://images.unsplash.com/photo-1543731068-7e0f5beff43a" style={backgroundImageStyle} />
      <HotelSearchForm style={hotelSearchStyle} />
      <ListGroup as="ol" numbered style={{ margin: '0vh auto 5vh auto', width: '90%' }}>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">The Ritz-Carlton Residences, Waikiki Beach</div>
            383 Kalaimoku Street Waikiki Beach, Hawaii 96815
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">The Ritz-Carlton Residences, Waikiki Beach</div>
            383 Kalaimoku Street Waikiki Beach, Hawaii 96815
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">The Ritz-Carlton Residences, Waikiki Beach</div>
            383 Kalaimoku Street Waikiki Beach, Hawaii 96815
          </div>
        </ListGroup.Item>
      </ListGroup>
      <Pagination style={{ margin: 'auto' }}>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div >
  );
}

export default HotelSearch;