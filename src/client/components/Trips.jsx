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
const TRIPS_TOTAL_COUNT = 36;
const MIN_ROOM_COUNT = 0;
const MAX_ROOM_COUNT = 10;
const MIN_PEOPLE_COUNT = 0;
const MAX_PEOPLE_COUNT = 10;

const queryTrips = (trips, indOfFirstEpi, indOfLastEpi) => fetch(
  "https://rickandmortyapi.com/api/episode/" +
  trips.slice(indOfFirstEpi, indOfLastEpi),
  {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }
)
  .then((res) => {
    res.json().then((data) => {
      return data
    });
  })
  .catch((exception) => {
    console.log("Error occurred:")
    console.log(exception)
  })

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
    res.json().then((data) => {
      return data
    });
  })
  .catch((exception) => {
    console.log("Error occurred:")
    console.log(exception)
  });

function Trips(props) {
  const pages = [];
  const [active, setActive] = useState(1);
  const [trips, setTrips] = useState([]);
  const totalTrips = []

  let indOfLastEpi = active * NUM_CARDS_PER_PAGE;
  let indOfFirstEpi = indOfLastEpi - NUM_CARDS_PER_PAGE;

  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const onRoomMinusClick = (tripID) => {
    const trip = trips[tripID]
    if (trip.room_count === MIN_ROOM_COUNT) {
      return
    }
    const updatedTrip = updateTripQuery(trip)
    trips[updatedTrip.id] = updatedTrip
    setTrips(trips)
  };
  const onRoomPlusClick = (tripID) => {
    const trip = trips[tripID]
    if (trip.room_count === MAX_ROOM_COUNT) {
      return
    }
    const updatedTrip = updateTripQuery(trip)
    trips[updatedTrip.id] = updatedTrip
    setTrips(trips)
  };
  const onPeopleMinusClick = (tripID) => {
    const trip = trips[tripID]
    if (trip.people_count === MIN_PEOPLE_COUNT) {
      return
    }
    const updatedTrip = updateTripQuery(trip)
    trips[updatedTrip.id] = updatedTrip
    setTrips(trips)
  };
  const onPeoplePlusClick = (tripID) => {
    const trip = trips[tripID]
    if (trip.people_count === MAX_PEOPLE_COUNT) {
      return
    }
    const updatedTrip = updateTripQuery(trip)
    trips[updatedTrip.id] = updatedTrip
    setTrips(trips)
  };

  for (let number = 1; number <= TRIPS_TOTAL_COUNT; number++) {
    totalTrips.push(number);
  }

  for (let number = 1; number <= Object.values(trips).length; number++) {
    totalTrips.push(number);
  }

  const pagination = (number) => {
    indOfLastEpi = number * NUM_CARDS_PER_PAGE;
    indOfFirstEpi = indOfLastEpi - NUM_CARDS_PER_PAGE;
    setActive(number);
    queryTrips(totalTrips, indOfFirstEpi, indOfLastEpi);
    setTrips({
      1: {
        id: 1,
        name: "The Ritz-Carlton Residences, Waikiki Beach",
        check_in_date: "December 2, 2013",
        check_out_date: "December 2, 2013",
        address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
        room_count: 12,
        people_count: 13,
        room_type: 'suite'
      },
      2: {
        id: 2,
        name: "The Ritz-Carlton Residences, Waikiki Beach",
        check_in_date: "December 2, 2013",
        check_out_date: "December 2, 2013",
        address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
        room_count: 12,
        people_count: 13,
        room_type: 'suite'
      },
      3: {
        id: 3,
        name: "The Ritz-Carlton Residences, Waikiki Beach",
        check_in_date: "December 2, 2013",
        check_out_date: "December 2, 2013",
        address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
        room_count: 12,
        people_count: 13,
        room_type: 'suite'
      },
      4: {
        id: 4,
        name: "The Ritz-Carlton Residences, Waikiki Beach",
        check_in_date: "December 2, 2013",
        check_out_date: "December 2, 2013",
        address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
        room_count: 12,
        people_count: 13,
        room_type: 'suite'
      },
    });
  };

  useEffect(() => {
    if (active === 1) {
      queryTrips(totalTrips, indOfFirstEpi, indOfLastEpi, setTrips);
      setTrips({
        1: {
          id: 1,
          name: "The Ritz-Carlton Residences, Waikiki Beach",
          check_in_date: "December 2, 2013",
          check_out_date: "December 2, 2013",
          address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
          room_count: 12,
          people_count: 13,
          room_type: 'suite'
        },
        2: {
          id: 2,
          name: "The Ritz-Carlton Residences, Waikiki Beach",
          check_in_date: "December 2, 2013",
          check_out_date: "December 2, 2013",
          address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
          room_count: 12,
          people_count: 13,
          room_type: 'suite'
        },
        3: {
          id: 3,
          name: "The Ritz-Carlton Residences, Waikiki Beach",
          check_in_date: "December 2, 2013",
          check_out_date: "December 2, 2013",
          address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
          room_count: 12,
          people_count: 13,
          room_type: 'suite'
        },
        4: {
          id: 4,
          name: "The Ritz-Carlton Residences, Waikiki Beach",
          check_in_date: "December 2, 2013",
          check_out_date: "December 2, 2013",
          address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
          room_count: 12,
          people_count: 13,
          room_type: 'suite'
        },
      });
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
                      <div style={roomDropdownEntryStyle}>
                        <>Rooms</>
                        <div style={dropdownEntrySelectorStyle}>
                          <MinusIcon onClick={() => onRoomMinusClick(trip.id)} onKeyPress={() => onRoomMinusClick(trip.id)} style={{ marginTop: 5 }} />
                          {trip.room_count}
                          <PlusIcon onClick={() => onRoomPlusClick(trip.id)} onKeyPress={() => onRoomPlusClick(trip.id)} style={{ marginTop: 5 }} />
                        </div>
                      </div>
                      <div style={roomDropdownEntryStyle}>
                        <>People</>
                        <div style={dropdownEntrySelectorStyle}>
                          <MinusIcon onClick={() => onPeopleMinusClick(trip.id)} onKeyPress={() => onPeopleMinusClick(trip.id)} style={{ marginTop: 5 }} />
                          {trip.people_count}
                          <PlusIcon onClick={() => onPeoplePlusClick(trip.id)} onKeyPress={() => onPeoplePlusClick(trip.id)} style={{ marginTop: 5 }} />
                        </div>
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
