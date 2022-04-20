import React, { useState, useEffect } from "react";

import { Search as SearchIcon, Calendar as CalendarIcon, DashCircle as MinusIcon, PlusCircle as PlusIcon } from 'react-bootstrap-icons';
import "react-datetime/css/react-datetime.css";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Datetime from 'react-datetime';

const rootStyle = {
  display: "flex",
  flexDirection: "column",
};

const hotelImageStyle = {
  width: 250,
};

const dropdownEntrySelectorStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 50
};

const calendarIconStyle = {
  bottom: 12,
  right: 4,
  height: 15,
  position: 'absolute',
  width: 15,
};

const roomDropdownEntryStyle = {
  display: 'flex',
  flexDirection: 'row',
  margin: 'auto 10px auto 10px',
  justifyContent: 'space-between'
};

const checkInInputContainerStyle = {
  marginRight: 20,
  position: 'relative',
};

const checkOutInputContainerStyle = {
  marginRight: 20,
  position: 'relative',
};

const NUM_CARDS_PER_PAGE = 6;
const MAX_PAGINATION_COUNT = 5;

const queryTrips = (userID, indOfFirstEpi, indOfLastEpi) => fetch('http://Hmanage-env.eba-ibcrgcpt.us-east-2.elasticbeanstalk.com/trips', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify({
    userID,
    indOfFirstEpi,
    indOfLastEpi
  })
})
  .then((res) => {
    if (res.ok) {
      return res.json().then((responseData) => {
        return responseData
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

const updateTripQuery = (requestBody) => fetch(
  "http://Hmanage-env.eba-ibcrgcpt.us-east-2.elasticbeanstalk.com/updateTrip",
  {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(requestBody),
  }
)
  .then((res) => {
    if (res.ok) {
      console.log('Successful')
    }
  })
  .catch((exception) => {
    console.log("Error occurred:")
    console.log(exception)
  });

function Trips({ userID }) {
  const pages = [];
  const [active, setActive] = useState(1);
  const [trips, setTrips] = useState([]);

  let indOfLastEpi = active * NUM_CARDS_PER_PAGE;
  let indOfFirstEpi = indOfLastEpi - NUM_CARDS_PER_PAGE;

  const onUpdateClick = (tripID) => {
    updateTripQuery(trips[tripID])
  }

  const onCancelClick = (tripID) => {
    cancelTripQuery(tripID)
  }

  const setCheckOutDate = (momentValue, tripID) => {
    const tripToBeUpdated = trips[tripID]
    tripToBeUpdated.checkOutDate = momentValue.toDate()
    trips[tripID] = tripToBeUpdated
    setTrips(trips)
  }

  const setCheckInDate = (momentValue, tripID) => {
    const tripToBeUpdated = trips[tripID]
    tripToBeUpdated.checkInDate = momentValue.toDate()
    trips[tripID] = tripToBeUpdated
    setTrips(trips)
  }

  const pagination = (number) => {
    indOfLastEpi = number * NUM_CARDS_PER_PAGE;
    indOfFirstEpi = indOfLastEpi - NUM_CARDS_PER_PAGE;
    setActive(number);
    queryTrips(userID, indOfFirstEpi, indOfLastEpi);
  };

  useEffect(() => {
    if (active === 1) {
      queryTrips(userID, indOfFirstEpi, indOfLastEpi);
    }
  }, [active]);

  for (let number = 1; number <= MAX_PAGINATION_COUNT; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => pagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const checkInDateTimeInputProps = {
    placeholder: 'Check In'
  };
  const checkOutDateTimeInputProps = {
    placeholder: 'Check Out'
  };

  return (
    <div style={rootStyle}>
      <div style={{ margin: "auto" }}>
        {trips &&
          Object.values(trips).map((trip) => (
            <Card
              key={trip.id}
              style={{ width: "75vw", margin: "2rem", textAlign: "center" }}
            >
              <Card.Header>
                <span style={{ fontWeight: "bold" }}> {trip.name}</span>
              </Card.Header>
              <Card.Body style={{ display: "flex", flexDirection: "row" }}>
                <Image
                  src="https://images.unsplash.com/photo-1618773928121-c32242e63f39"
                  style={hotelImageStyle}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100vw",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "0px 0px 0px 10px",
                      justifyContent: "space-around",
                    }}
                  >
                    <Card.Text>{trip.address}</Card.Text>
                    <Card.Text>
                      {trip.check_in_date} - {trip.check_out_date}
                    </Card.Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div>
                      <div style={checkInInputContainerStyle}>
                        <Datetime inputProps={checkInDateTimeInputProps} onChange={(e) => setCheckInDate(e, trip.id)} />
                        <CalendarIcon style={calendarIconStyle} role="button" tabIndex="-1" />
                      </div>
                      <div style={checkOutInputContainerStyle}>
                        <Datetime inputProps={checkOutDateTimeInputProps} onChange={(e) => setCheckOutDate(e, trip.id)} />
                        <CalendarIcon style={calendarIconStyle} role="button" tabIndex="-1" />
                      </div>
                    </div>
                    <Button variant="outline-primary" type="submit" onClick={() => onUpdateClick(trip.id)} >
                      Update
                    </Button>
                    <Button variant="outline-primary" type="submit" onClick={() => onCancelClick(trip.id)} >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          ))}
      </div>
      <Pagination style={{ margin: "auto" }}>
        <Pagination.First
          onClick={() => {
            pagination(1);
          }}
        />
        <Pagination.Prev
          onClick={() => {
            if (active > 1) {
              pagination(active - 1);
            }
          }}
        />
        {pages}
        <Pagination.Next
          onClick={() => {
            if (active < 5) {
              pagination(active + 1);
            }
          }}
        />
        <Pagination.Last
          onClick={() => {
            pagination(5);
          }}
        />
      </Pagination>
    </div>
  );
}

export default Trips;