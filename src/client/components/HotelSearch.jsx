import React, { useState, useEffect } from "react";

import "react-datetime/css/react-datetime.css";
import Image from "react-bootstrap/Image";
import HotelSearchForm from "./HotelSearchForm";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const rootStyle = {
  display: "flex",
  flexDirection: "column",
};

const hotelImageStyle = {
  width: 250,
};

const MIN_ROOM_COUNT = 0;
const MAX_ROOM_COUNT = 10;
const MIN_ADULT_COUNT = 0;
const MAX_ADULT_COUNT = 10;
const MIN_CHILDREN_COUNT = 0;
const MAX_CHILDREN_COUNT = 10;

const NUM_CARDS_PER_PAGE = 6;
const MAX_PAGINATION_COUNT = 5;
const TRIPS_TOTAL_COUNT = 36;

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

  const pages = [];
  const [active, setActive] = useState(1);
  const [trips, setTrips] = useState([]);
  const totalEpis = [];

  let indOfLastEpi = active * NUM_CARDS_PER_PAGE;
  let indOfFirstEpi = indOfLastEpi - NUM_CARDS_PER_PAGE;

  for (let number = 1; number <= TRIPS_TOTAL_COUNT; number++) {
    totalEpis.push(number);
  }

  for (let number = 1; number <= trips.length; number++) {
    totalEpis.push(number);
  }

  const onSubmitClick = () => {
    fetch("http://localhost:8080/getRooms", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        adultCount,
        checkInDate,
        checkOutDate,
        childrenCount,
        destination,
        roomCount,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((responseData) => {
            const { rooms } = responseData;
            // TODO: Set rooms and change page view
            return responseData;
          });
        }
        console.log("Error occurred:");
        console.log(res);
        return { errorMessages: { REQUEST_ERROR: res.statusText } };
      })
      .catch((exception) => {
        console.log("Error occurred:");
        console.log(exception);
      });
  };

  const checkInDateTimeInputProps = {
    placeholder: "Check In",
  };
  const checkOutDateTimeInputProps = {
    placeholder: "Check Out",
  };
  const pagination = (number) => {
    indOfLastEpi = number * NUM_CARDS_PER_PAGE;
    indOfFirstEpi = indOfLastEpi - NUM_CARDS_PER_PAGE;
    setActive(number);
    fetch(
      "https://rickandmortyapi.com/api/episode/" +
        totalEpis.slice(indOfFirstEpi, indOfLastEpi),
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
      .then((res) => {
        res.json().then((data) => {
          // setTrips(data);
          setTrips([
            {
              id: 1,
              name: "The Ritz-Carlton Residences, Waikiki Beach",
              address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
              rate: 300.0,
            },
            {
              id: 2,
              name: "The Ritz-Carlton Residences, Waikiki Beach",
              address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
              rate: 300.0,
            },
            {
              id: 3,
              name: "The Ritz-Carlton Residences, Waikiki Beach",
              address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
              rate: 300.0,
            },
            {
              id: 4,
              name: "The Ritz-Carlton Residences, Waikiki Beach",
              address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
              rate: 300.0,
            },
          ]);
        });
      })
      .catch((exception) => {
        console.log("Error occurred:");
        console.log(exception);
      });
  };

  useEffect(() => {
    if (active === 1) {
      fetch(
        "https://rickandmortyapi.com/api/episode/" +
          totalEpis.slice(indOfFirstEpi, indOfLastEpi),
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      )
        .then((res) => {
          res.json().then((data) => {
            // setTrips(data);
            setTrips([
              {
                id: 1,
                name: "The Ritz-Carlton Residences, Waikiki Beach",
                address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
                rate: 300.0,
              },
              {
                id: 2,
                name: "The Ritz-Carlton Residences, Waikiki Beach",
                address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
                rate: 300.0,
              },
              {
                id: 3,
                name: "The Ritz-Carlton Residences, Waikiki Beach",
                address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
                rate: 300.0,
              },
              {
                id: 4,
                name: "The Ritz-Carlton Residences, Waikiki Beach",
                address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
                rate: 300.0,
              },
            ]);
          });
        })
        .catch((exception) => {
          console.log("Error occurred:");
          console.log(exception);
        });
    }
  }, [active]);

  return (
    <div style={rootStyle}>
      <div style={{ margin: "auto" }}>
        {trips &&
          trips.map((trip) => (
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
                    <Card.Text> ${trip.rate} </Card.Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Button variant="outline-primary" type="submit">
                      View Rates
                    </Button>
                    <Button variant="outline-primary" type="submit">
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

export default HotelSearch;
