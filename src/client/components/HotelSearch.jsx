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
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

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

const bookRoomQuery = (
  userID,
  hotelID,
  numOfRooms,
  numOfPeople,
  rate,
  checkInDate,
  checkOutDate
) => {
  fetch("http://Hmanage-env.eba-ibcrgcpt.us-east-2.elasticbeanstalk.com/reservation", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userID,
      hotelID,
      numOfRooms,
      numOfPeople,
      rate,
      checkInDate,
      checkOutDate
    }),

  })
    .then((res) => {
      res.json().then((data) => {
        navigate('/login');
      })
        .catch((exception) => {
          console.log("Error occurred:");
          console.log(exception);
        });
    })
}

function HotelSearch(props) {
  const [destination, setDestination] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [singleroomCount, setSingleRooms] = useState(0);
  const [doubleroomCount, setDoubleRooms] = useState(0);
  const [suiteroomCount, setSuiteRooms] = useState(0);
  const [peopleCount, setPeopleCount] = useState(0);
  const [singleroompeopleCount, setSinglePeople] = useState(0);
  const [doubleroompeopleCount, setDoublePeople] = useState(0);
  const [suiteroompeopleCount, setSuitePeople] = useState(0);
  const [active, setActive] = useState(1);
  const [availableHotels, setAvailableHotels] = useState([]);
  const [ismodalshown, setismodelshown] = useState(false);

  const [typeOfRooms, setTypeOfRooms] = useState({
    1: {
      id: 1,
      name: "Single Room",
      rate: 200.0,
      imgsrc:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    2: {
      id: 2,
      name: "Double Room",
      rate: 300.0,
      imgsrc:
        "https://media.istockphoto.com/photos/hotel-room-bed-picture-id506852656?k=20&m=506852656&s=612x612&w=0&h=e0GIcyFj7L_k5rdOuFKLncfRlWXVqBhd9tEtP1697jo=",
    },
    3: {
      id: 3,
      name: "King's Suite",
      rate: 550.0,
      imgsrc:
        "https://media.istockphoto.com/photos/antique-four-poster-picture-id115939001?k=20&m=115939001&s=612x612&w=0&h=fBl5sbFQO9KgaUVqxwlfTfrCBaphoNVLj2cIcJxbym4=",
    },
  });

  const [amenities, setAmenities] = useState([
    {
      id: 1,
      name: "breakfast",
      rate: 15.0,
    },

    {
      id: 2,
      name: "fitness",
      rate: 10.0,
    },

    {
      id: 3,
      name: "pool",
      rate: 10.0,
    },

    {
      id: 4,
      name: "parking",
      rate: 12.0,
    },

    {
      id: 5,
      name: "allmeals",
      rate: 30.0,
    },
  ]);
  const pages = [];
  const totalEpis = [];

  let indOfLastEpi = active * NUM_CARDS_PER_PAGE;
  let indOfFirstEpi = indOfLastEpi - NUM_CARDS_PER_PAGE;

  const onRoomMinusClick = (typeofroom) => {
    if (typeofroom === "Single Room") {
      if (singleroomCount < 1) {
        return;
      }
      setSingleRooms(singleroomCount - 1);
    } else if (typeofroom === "Double Room") {
      if (doubleroomCount < 1) {
        return;
      }
      setDoubleRooms(doubleroomCount - 1);
    } else {
      if (suiteroomCount < 1) {
        return;
      }
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

  const onPeopleMinusClick = (typeofroom) => {
    if (typeofroom === "Single Room") {
      if (singleroompeopleCount < 1) {
        return;
      }
      setSinglePeople(singleroompeopleCount - 1);
    } else if (typeofroom === "Double Room") {
      if (doubleroompeopleCount < 1) {
        return;
      }
      setDoublePeople(doubleroompeopleCount - 1);
    } else {
      if (suiteroompeopleCount < 1) {
        return;
      }
      setSuitePeople(suiteroompeopleCount - 1);
    }
  };
  const onPeoplePlusClick = (typeofroom) => {
    if (typeofroom === "Single Room") {
      setSinglePeople(singleroompeopleCount + 1);
    } else if (typeofroom === "Double Room") {
      setDoublePeople(doubleroompeopleCount + 1);
    } else {
      setSuitePeople(suiteroompeopleCount + 1);
    }
  };

  for (let number = 1; number <= TRIPS_TOTAL_COUNT; number++) {
    totalEpis.push(number);
  }

  for (let number = 1; number <= availableHotels.length; number++) {
    totalEpis.push(number);
  }

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
          // setAvailableHotels(data);
          setAvailableHotels([
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
            // setAvailableHotels(data);
            setAvailableHotels([
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

  const modal = (userID, hotelID, numOfRooms, numOfPeople, rate, checkInDate, checkOutDate) => {
    return (
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
            {Object.values(typeOfRooms) &&
              Object.values(typeOfRooms).map((types) => (
                <Card
                  key={types.id}
                  style={{ margin: "2rem", textAlign: "center" }}
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
                                    onClick={() =>
                                      onPeopleMinusClick(types.name)
                                    }
                                    onKeyPress={onPeopleMinusClick}
                                    style={{ marginTop: 5 }}
                                  />
                                  {types.name === "Single Room" && (
                                    <>{singleroompeopleCount}</>
                                  )}
                                  {types.name === "Double Room" && (
                                    <>{doubleroompeopleCount}</>
                                  )}
                                  {types.name === "King's Suite" && (
                                    <>{suiteroompeopleCount}</>
                                  )}
                                  <PlusIcon
                                    onClick={() =>
                                      onPeoplePlusClick(types.name)
                                    }
                                    onKeyPress={onPeoplePlusClick}
                                    style={{ marginTop: 5 }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Text>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: 'wrap',
                          justifyContent: "space-evenly",
                        }}
                      >
                        <OverlayTrigger
                          trigger="click"
                          placement="bottom"
                          overlay={
                            <Popover id="popover-basic">
                              <Popover.Header as="h3">
                                <div>
                                  <strong>${types.rate}</strong>
                                </div>
                              </Popover.Header>
                              <Popover.Body>
                                Your total for <strong>{types.name}</strong>{" "}
                                will be
                                <strong> ${types.rate}</strong>. Hope you enjoy
                                your stay at our hotel!
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <Button
                            style={{
                              marginTop: 30,
                              height: 60,
                            }}
                            variant="success"
                          >
                            View Rates
                          </Button>
                        </OverlayTrigger>

                        <Button
                          variant="outline-primary"
                          type="submit"
                          style={{
                            marginTop: 30,
                            height: 60,
                          }}
                          onClick={() => bookRoomQuery({
                            userID,
                            hotelID,
                            numOfRooms,
                            numOfPeople,
                            rate,
                            checkInDate,
                            checkOutDate
                          })}
                        >
                          Book
                        </Button>

                        <div
                          style={{
                            alignItems: "start",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {amenities &&
                            amenities.map((amenitype) => (
                              <div
                                class="custom-control custom-checkbox custom-control-inline"
                                key={amenitype.id}
                              >
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="defaultInline1"
                                ></input>
                                <label
                                  class="custom-control-label"
                                  for="defaultInline1"
                                >
                                  <div>{amenitype.name}</div>
                                </label>
                              </div>
                            ))}
                        </div>
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
  }

  const userID = 1
  const hotelID = 1
  const numOfRooms = {
    singleroomCount,
    doubleroomCount,
    suiteroomCount
  }
  const numOfPeople = {
    singleroompeopleCount,
    doubleroompeopleCount,
    suiteroompeopleCount
  }
  const rate = {
    'single': typeOfRooms[1].rate,
    'double': typeOfRooms[2].rate,
    'suite': typeOfRooms[3].rate,
  }

  return (
    <div style={rootStyle}>
      {modal(userID, hotelID, numOfRooms, numOfPeople, rate, checkInDate, checkOutDate)}
      <div style={{ margin: "auto" }}>
        {availableHotels &&
          availableHotels.map((trip) => (
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
export default HotelSearch;
