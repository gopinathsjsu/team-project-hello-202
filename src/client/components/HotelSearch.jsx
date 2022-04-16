import React, { useState, useEffect } from "react";

import "react-datetime/css/react-datetime.css";
import Image from "react-bootstrap/Image";
import HotelSearchForm from "./HotelSearchForm";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  DashCircle as MinusIcon,
  PlusCircle as PlusIcon,
} from "react-bootstrap-icons";
import Popover from "react-bootstrap";
import OverlayTrigger from "react-bootstrap";

const rootStyle = {
  display: "flex",
  flexDirection: "column",
};

const roomInputContainerStyle = {
  position: "relative",
};

const hotelImageStyle = {
  width: 250,
};

const roomImageStyle = {
  width: 250,
};

const NUM_CARDS_PER_PAGE = 6;
const MAX_PAGINATION_COUNT = 5;
const TRIPS_TOTAL_COUNT = 36;

function HotelSearch(props) {
  const [destination, setDestination] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [singleroomCount, setSingleRooms] = useState(0);
  const [doubleroomCount, setDoubleRooms] = useState(0);
  const [suiteroomCount, setSuiteRooms] = useState(0);
  const [peopleCount, setPeopleCount] = useState(0);

  const onRoomMinusClick = (typeofroom) => {
    if (typeofroom === "Single Room") {
      setSingleRooms(singleroomCount - 1);
    } else if (typeofroom === "Double Room") {
      setDoubleRooms(DoubleroomCount - 1);
    } else {
      setSuiteRooms(suiteroomCount - 1);
    }
  };
  const onRoomPlusClick = (typeofroom) => {
    if (typeofroom === "Single Room") {
      setSingleRooms(singleroomCount + 1);
    } else if (typeofroom === "Double Room") {
      setDoubleRooms(doubleroomCount + 1);
    } else {
      setSuiteRooms(suiteroomCount + 1);
    }
  };

  const onPeopleMinusClick = () => {
    if (peopleCount === MIN_PEOPLE_COUNT) {
      return;
    }
    setPeopleCount(peopleCount - 1);
    if (peopleCount <= 1) {
      setRoomType("Single Room");
    } else if (peopleCount > 1 && peopleCount <= 4) {
      setRoomType("Double Room");
    } else {
      setRoomType("King's Suite");
    }
  };
  const onPeoplePlusClick = () => {
    if (peopleCount === MAX_PEOPLE_COUNT) {
      return;
    }
    setPeopleCount(peopleCount + 1);
    if (peopleCount <= 1) {
      setRoomType("single");
    } else if (peopleCount > 1 && peopleCount <= 4) {
      setRoomType("double");
    } else {
      setRoomType("suite");
    }
  };

  const pages = [];
  const [active, setActive] = useState(1);
  const [trips, setTrips] = useState([]);
  const [roomtype, setRoomtype] = useState([
    {
      id: 1,
      name: "Single Room",
      rate: 200.0,
      imgsrc:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
      id: 2,
      name: "Double Room",
      rate: 300.0,
      imgsrc:
        "https://media.istockphoto.com/photos/hotel-room-bed-picture-id506852656?k=20&m=506852656&s=612x612&w=0&h=e0GIcyFj7L_k5rdOuFKLncfRlWXVqBhd9tEtP1697jo=",
    },
    {
      id: 3,
      name: "King's Suite",
      rate: 550.0,
      imgsrc:
        "https://media.istockphoto.com/photos/antique-four-poster-picture-id115939001?k=20&m=115939001&s=612x612&w=0&h=fBl5sbFQO9KgaUVqxwlfTfrCBaphoNVLj2cIcJxbym4=",
    },
  ]);
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
              // rate: 300.0,
            },
            {
              id: 2,
              name: "The Ritz-Carlton Residences, Waikiki Beach",
              address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
              // rate: 300.0,
            },
            {
              id: 3,
              name: "The Ritz-Carlton Residences, Waikiki Beach",
              address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
              // rate: 300.0,
            },
            {
              id: 4,
              name: "The Ritz-Carlton Residences, Waikiki Beach",
              address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
              // rate: 300.0,
            },

            {
              id: 5,
              name: "The Ritz-Carlton Residences, Waikiki Beach",
              address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
              // rate: 300.0,
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
                // rate: 300.0,
              },
              {
                id: 2,
                name: "The Ritz-Carlton Residences, Waikiki Beach",
                address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
                // rate: 300.0,
              },
              {
                id: 3,
                name: "The Ritz-Carlton Residences, Waikiki Beach",
                address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
                // rate: 300.0,
              },
              {
                id: 4,
                name: "The Ritz-Carlton Residences, Waikiki Beach",
                address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
                // rate: 300.0,
              },
              {
                id: 5,
                name: "The Ritz-Carlton Residences, Waikiki Beach",
                address: "383 Kalaimoku Street Waikiki Beach, Hawaii 96815",
                // rate: 300.0,
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

  {
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
    const [ismodalshown, setismodelshown] = useState(false);

    const modal = (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={ismodalshown}
        onHide={() => setismodelshown(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Room Selection
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: "auto" }}>
            {roomtype &&
              roomtype.map((types) => (
                <Card
                  key={types.id}
                  style={{ width: "50vw", margin: "2rem", textAlign: "center" }}
                >
                  <Card.Header>
                    <span style={{ fontWeight: "bold" }}> {types.name}</span>
                  </Card.Header>
                  <Card.Body style={{ display: "flex", flexDirection: "row" }}>
                    <Image src={types.imgsrc} style={roomImageStyle} />
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
                        <Card.Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <div>
                            <div style={roomInputContainerStyle}>
                              <div>
                                <>Rooms</>
                                <div>
                                  <MinusIcon
                                    onClick={() => onRoomMinusClick(types.name)}
                                    onKeyPress={onRoomMinusClick}
                                    style={{ marginTop: 5 }}
                                  />
                                  {types.name === "Single Room" && (
                                    <>{singleroomCount}</>
                                  )}
                                  {types.name === "Double Room" && (
                                    <>{doubleroomCount}</>
                                  )}
                                  {types.name === "King's Suite" && (
                                    <>{suiteroomCount}</>
                                  )}
                                  <PlusIcon
                                    onClick={() => onRoomPlusClick(types.name)}
                                    onKeyPress={onRoomPlusClick}
                                    style={{ marginTop: 5 }}
                                  />
                                </div>
                              </div>
                              <div>
                                <>People</>
                                <div>
                                  <MinusIcon
                                    onClick={onPeopleMinusClick}
                                    onKeyPress={onPeopleMinusClick}
                                    style={{ marginTop: 5 }}
                                  />
                                  {peopleCount}
                                  <PlusIcon
                                    onClick={onPeoplePlusClick}
                                    onKeyPress={onPeoplePlusClick}
                                    style={{ marginTop: 5 }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Text>

                        <Card.Text> ${types.rate} </Card.Text>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Button
                          variant="outline-primary"
                          type="submit"
                          onClick={() => setismodelshown(true)}
                        >
                          View Rates
                        </Button>

                        <Button variant="outline-primary" type="submit">
                          Book
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setismodelshown(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <div style={rootStyle}>
        {modal}
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
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Button
                        variant="outline-primary"
                        type="submit"
                        onClick={() => setismodelshown(true)}
                      >
                        Room Selection
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
}
export default HotelSearch;
