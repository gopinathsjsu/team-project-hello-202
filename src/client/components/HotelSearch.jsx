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
import { CardGroup, Container } from "react-bootstrap";

const rootStyle = {
  display: "flex",
  flexDirection: "column",
};

const roomInputContainerStyle = {
  position: "relative",
};

const hotelImageStyle = {
  width: 250,
  borderRadius: 20,
};

const roomImageStyle = {
  width: 250,
  borderRadius: 20,
};

const NUM_CARDS_PER_PAGE = 6;
const MAX_PAGINATION_COUNT = 5;

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
    "http://awseb-awseb-neb659irixfb-1496663984.us-east-2.elb.amazonaws.com/reservation",
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
      fetch(
        `http://awseb-awseb-neb659irixfb-1496663984.us-east-2.elb.amazonaws.com/rewards?userID=${userID}`
      )
        .then((res) => res.json())
        .then((respo) => localStorage.setItem("userRewards", respo["rewards"]));
      navigate("/search");
    })
    .catch((exception) => {
      console.log("Error occurred:");
      console.log(exception);
    });
};

const bookRoomWithRewardsQuery = (
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
    "http://awseb-awseb-neb659irixfb-1496663984.us-east-2.elb.amazonaws.com/reservation",
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
        price: rate - localStorage.getItem("userRewards"),
        checkInDate,
        checkOutDate,
        destination,
        roomType,
      }),
    }
  )
    .then((data) => {
      fetch(
        `http://awseb-awseb-neb659irixfb-1496663984.us-east-2.elb.amazonaws.com/rewards?userID=${userID}`
      )
        .then((res) => res.json())
        .then((respo) => localStorage.setItem("userRewards", respo["rewards"]));
      navigate("/search");
    })

    .catch((exception) => {
      console.log("Error occurred:");
      console.log(exception);
    });
};
function HotelSearch(props) {
  const {
    availableHotels,
    destination,
    checkInDate,
    checkOutDate,
    roomCount,
    peopleCount,
    roomType,
    userID,
  } = props;

  const [paginatedHotels, setPaginatedHotels] = useState({});
  const [active, setActive] = useState(1);
  const [ismodalshown, setismodelshown] = useState(false);
  const [isbookmodalshown, setisbookmodalshown] = useState(false);
  const handlebookClose = () => setisbookmodalshown(false);
  const handlebookShow = () => setisbookmodalshown(true);
  const [hotelIDPicked, setHotelIDPicked] = useState(null);

  const [typeOfRooms, setTypeOfRooms] = useState({
    single: {
      name: "Single Room",
      imgsrc:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    double: {
      name: "Double Room",
      imgsrc:
        "https://media.istockphoto.com/photos/hotel-room-bed-picture-id506852656?k=20&m=506852656&s=612x612&w=0&h=e0GIcyFj7L_k5rdOuFKLncfRlWXVqBhd9tEtP1697jo=",
    },
    suite: {
      name: "King's Suite",
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
    setPaginatedHotels(
      Object.values(availableHotels).slice(indOfFirstEpi, indOfLastEpi)
    );
  };

  useEffect(() => {
    if (Object.values(availableHotels).length > 0) {
      let indOfLastEpi = 0;
      let indOfFirstEpi = 0;
      indOfLastEpi = 1 * NUM_CARDS_PER_PAGE;
      indOfFirstEpi = indOfLastEpi - NUM_CARDS_PER_PAGE;
      setPaginatedHotels(
        Object.values(availableHotels).slice(indOfFirstEpi, indOfLastEpi)
      );
    }
  }, [availableHotels]);

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

  const navigate = useNavigate();
  const modal = (
    userID,
    hotelID,
    roomCount,
    peopleCount,
    checkInDate,
    checkOutDate
  ) => {
    console.log(availableHotels[hotelID], "hotel ID");
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
            {roomType === "all" ? (
              Object.values(typeOfRooms) &&
              Object.entries(typeOfRooms).map(([key, value]) => {
                return (
                  <Container fluid className="text-center">
                    <CardGroup className="m-7 d-block">
                      <Card
                        className="m-5 border-0 shadow"
                        key={availableHotels[hotelID] != null ? availableHotels[hotelID][key].id : value.name}
                        style={{
                          margin: "2rem",
                          textAlign: "center",
                          height: 300,
                          borderRadius: 35,
                        }}
                      >
                        <Card.Header>
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            {value.name}
                          </span>
                        </Card.Header>
                        <Card.Body
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <Image
                            className="m-4 border-0 shadow"
                            src={value.imgsrc}
                            style={roomImageStyle}
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
                                flexWrap: "wrap",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  height: 200,
                                  width: 120,
                                  marginBottom: 30,
                                }}
                              >
                                <OverlayTrigger
                                  trigger="click"
                                  placement="bottom"
                                  overlay={
                                    <Popover id="popover-basic">
                                      <Popover.Header as="h3">
                                        <div>
                                          <strong>
                                            $
                                            {availableHotels[hotelID] != null
                                              ? availableHotels[hotelID][key].rate
                                              : "0"}
                                          </strong>
                                        </div>
                                      </Popover.Header>
                                      <Popover.Body>
                                        Your total for{" "}
                                        <strong>{value.name}</strong> will be
                                        <strong>
                                          {" "}
                                          $
                                          {availableHotels[hotelID] != null
                                            ? availableHotels[hotelID][key].rate
                                            : "0"}
                                        </strong>
                                        . Your rewards are{" "}
                                        <strong>
                                          {localStorage.getItem("userRewards")}
                                        </strong>
                                        . If you'd like to use it, the price will
                                        be{" "}
                                        <strong>
                                          {availableHotels[hotelID] != null
                                            ? availableHotels[hotelID][key].rate -
                                            localStorage.getItem("userRewards")
                                            : 0}
                                        </strong>
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
                                  onClick={() => {
                                    const roomTypeParsed = value.name.includes(
                                      "Single"
                                    )
                                      ? "single"
                                      : value.name.includes("Double")
                                        ? "double"
                                        : "suite";
                                    bookRoomQuery(
                                      userID,
                                      hotelID,
                                      availableHotels[hotelID].rate,
                                      checkInDate,
                                      checkOutDate,
                                      destination,
                                      roomCount,
                                      peopleCount,
                                      roomTypeParsed,
                                      navigate
                                    );
                                  }}
                                >
                                  Book
                                </Button>

                                <Button
                                  variant="outline-primary"
                                  type="submit"
                                  style={{
                                    marginTop: 30,
                                    height: 60,
                                  }}
                                  onClick={() => {
                                    handlebookShow();
                                    const roomTypeParsed = value.name.includes(
                                      "Single"
                                    )
                                      ? "single"
                                      : value.name.includes("Double")
                                        ? "double"
                                        : "suite";
                                    bookRoomWithRewardsQuery(
                                      userID,
                                      hotelID,
                                      availableHotels[hotelID].rate,
                                      checkInDate,
                                      checkOutDate,
                                      destination,
                                      roomCount,
                                      peopleCount,
                                      roomTypeParsed,
                                      navigate
                                    );
                                  }}
                                >
                                  Book with rewards
                                </Button>
                              </div>
                              <div
                                style={{
                                  alignItems: "start",
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {availableHotels[hotelID] && amenities &&
                                  amenities.map((amenitype) => (
                                    <div
                                      class="custom-control custom-checkbox custom-control-inline"
                                      key={amenitype.id}
                                    >
                                      <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        id={availableHotels[hotelID][key].id + amenitype.id}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            availableHotels[hotelID][key].rate =
                                              availableHotels[hotelID][key].rate +
                                              amenitype.rate;
                                          } else {
                                            availableHotels[hotelID][key].rate =
                                              availableHotels[hotelID][key].rate -
                                              amenitype.rate;
                                          }
                                        }}
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
                      </Card>
                    </CardGroup>
                  </Container>
                );
              })
            ) : (
              <Container fluid className="text-center">
                <CardGroup className="m-7 d-block">
                  <Card
                    className="m-5 border-0 shadow"
                    key={typeOfRooms[roomType].id}
                    style={{
                      margin: "2rem",
                      textAlign: "center",
                      height: 300,
                      borderRadius: 35,
                    }}
                  >
                    <Card.Header>
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {typeOfRooms[roomType].name}
                      </span>
                    </Card.Header>
                    <Card.Body
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <Image
                        className="m-4 border-0 shadow"
                        src={typeOfRooms[roomType].imgsrc}
                        style={roomImageStyle}
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
                            flexWrap: "wrap",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              height: 200,
                              width: 120,
                              marginBottom: 30,
                            }}
                          >
                            <OverlayTrigger
                              trigger="click"
                              placement="bottom"
                              overlay={
                                <Popover id="popover-basic">
                                  <Popover.Header as="h3">
                                    <div>
                                      <strong>
                                        $
                                        {availableHotels[hotelID] != null
                                          ? availableHotels[hotelID].rate
                                          : "0"}
                                      </strong>
                                    </div>
                                  </Popover.Header>
                                  <Popover.Body>
                                    Your total for{" "}
                                    <strong>
                                      {typeOfRooms[roomType].name}
                                    </strong>{" "}
                                    will be
                                    <strong>
                                      {" "}
                                      $
                                      {availableHotels[hotelID] != null
                                        ? availableHotels[hotelID].rate
                                        : "0"}
                                    </strong>
                                    . Your rewards are{" "}
                                    <strong>
                                      {localStorage.getItem("userRewards")}
                                    </strong>
                                    . If you'd like to use it, the price will be{" "}
                                    <strong>
                                      {availableHotels[hotelID] != null
                                        ? availableHotels[hotelID].rate -
                                        localStorage.getItem("userRewards")
                                        : 0}
                                    </strong>
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
                              onClick={() => {
                                const roomTypeParsed = typeOfRooms[
                                  roomType
                                ].name.includes("Single")
                                  ? "single"
                                  : typeOfRooms[roomType].name.includes(
                                    "Double"
                                  )
                                    ? "double"
                                    : "suite";
                                bookRoomQuery(
                                  userID,
                                  hotelID,
                                  availableHotels[hotelID].rate,
                                  checkInDate,
                                  checkOutDate,
                                  destination,
                                  roomCount,
                                  peopleCount,
                                  roomTypeParsed,
                                  navigate
                                );
                              }}
                            >
                              Book
                            </Button>

                            <Button
                              variant="outline-primary"
                              type="submit"
                              style={{
                                marginTop: 30,
                                height: 60,
                              }}
                              onClick={() => {
                                handlebookShow();
                                const roomTypeParsed = typeOfRooms[
                                  roomType
                                ].name.includes("Single")
                                  ? "single"
                                  : typeOfRooms[roomType].name.includes(
                                    "Double"
                                  )
                                    ? "double"
                                    : "suite";
                                bookRoomWithRewardsQuery(
                                  userID,
                                  hotelID,
                                  availableHotels[hotelID].rate,
                                  checkInDate,
                                  checkOutDate,
                                  destination,
                                  roomCount,
                                  peopleCount,
                                  roomTypeParsed,
                                  navigate
                                );
                              }}
                            >
                              Book with rewards
                            </Button>
                          </div>
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
                                    id={typeOfRooms[roomType].id + amenitype.id}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        availableHotels[hotelID].rate =
                                          availableHotels[hotelID].rate +
                                          amenitype.rate;
                                      } else {
                                        availableHotels[hotelID].rate =
                                          availableHotels[hotelID].rate -
                                          amenitype.rate;
                                      }
                                    }}
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
                  </Card>
                </CardGroup>
              </Container>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setismodelshown(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div style={rootStyle}>
      {modal(
        userID,
        hotelIDPicked,
        roomCount,
        peopleCount,
        checkInDate,
        checkOutDate
      )}

      <div>
        <Modal
          show={isbookmodalshown}
          onHide={handlebookClose}
          animation={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Booking Successful!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your room has been booked!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlebookClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div style={{ margin: "auto" }}>
        {Object.values(paginatedHotels) &&
          Object.values(paginatedHotels).map((availableHotel) => (
            <Container fluid className="text-center">
              <CardGroup className="m-5 d-block">
                <Card
                  className="m-7 border-0 shadow"
                  key={availableHotel.id}
                  style={{
                    width: "75vw",
                    margin: "2rem",
                    textAlign: "center",
                    borderRadius: 35,
                  }}
                >
                  <Card.Header>
                    <span style={{ fontWeight: "bold" }}>
                      {" "}
                      {availableHotel.name}
                    </span>
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
                        <Card.Text>{availableHotel.address}</Card.Text>
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
                          onClick={() => {
                            setHotelIDPicked(availableHotel['single'].id);
                            setismodelshown(true);
                          }}
                        >
                          Room Selection
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Container>
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
