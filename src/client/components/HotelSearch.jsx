import React, { useState, useEffect } from "react";
import "react-datetime/css/react-datetime.css";
import Image from "react-bootstrap/Image";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useNavigate } from "react-router-dom";

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
  rate,
  checkInDate,
  checkOutDate,
  destination,
  roomCount,
  peopleCount,
  roomType,
  navigate
) => {
  fetch(
    "http://Hmanage-env.eba-ibcrgcpt.us-east-2.elasticbeanstalk.com/reservation",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userID,
        hotelID,
        numRooms: roomCount,
        numPeople: peopleCount,
        price: rate,
        checkInDate,
        checkOutDate,
        destination,
        roomType,
      }),
    }
  )
    .then((data) => {
      console.log(data);
      navigate("/trips");
    })
    .catch((exception) => {
      console.log("Error occurred:");
      console.log(exception);
    });
  ;
};

function HotelSearch(props) {
  const { destination, checkInDate, checkOutDate, roomCount, peopleCount, roomType } =
    props;

  const [active, setActive] = useState(1);
  const [availableHotels, setAvailableHotels] = useState(props.availableHotels);
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

  let indOfLastEpi = active * NUM_CARDS_PER_PAGE;
  let indOfFirstEpi = indOfLastEpi - NUM_CARDS_PER_PAGE;

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
        roomType,
        indOfFirstEpi,
        indOfLastEpi
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((responseData) => {
            setAvailableHotels(responseData)
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
  };

  useEffect(() => {
    if (active === 1) {
      fetch('http://Hmanage-env.eba-ibcrgcpt.us-east-2.elasticbeanstalk.com/availability', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          checkInDate: checkInDate == null ? null : checkInDate.toDate(),
          checkOutDate: checkInDate == null ? null : checkOutDate.toDate(),
          destination,
          roomCount,
          roomType,
          indOfFirstEpi,
          indOfLastEpi
        })
      })
        .then((res) => {
          if (res.ok) {
            return res.json().then((responseData) => {
              setAvailableHotels(responseData)
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

  const navigate = useNavigate()
  const modal = (
    userID,
    hotelID,
    roomCount,
    peopleCount,
    checkInDate,
    checkOutDate
  ) => {
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
                          flexWrap: "wrap",
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
                          onClick={() =>
                            bookRoomQuery(
                              userID,
                              hotelID,
                              types.rate,
                              checkInDate,
                              checkOutDate,
                              destination,
                              roomCount,
                              peopleCount,
                              types.name,
                              navigate
                            )
                          }
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
  };

  const userID = 1;
  const hotelID = 1;
  return (
    <div style={rootStyle}>
      {modal(
        userID,
        hotelID,
        roomCount,
        peopleCount,
        checkInDate,
        checkOutDate
      )}
      <div style={{ margin: "auto" }}>
        {Object.values(availableHotels) &&
          Object.values(availableHotels).map((trip) => (
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
