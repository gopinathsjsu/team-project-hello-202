import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

const rootStyle = {
  margin: "auto",
  width: "50vw",
  height: "50vh",
};
function AdminRoom() {
  const [hotelname, setHotelName] = useState();
  const [roomtype, setRoomType] = useState();
  const [baseprice, setBasePrice] = useState();

  let navigate = useNavigate();

  const setHotelNameInput = (e) => {
    setHotelName(e.target.value);
  };

  const setRoomTypeInput = (e) => {
    setRoomType(e.target.value);
  };

  const setBasePriceInput = (e) => {
    setBasePrice(e.target.value);
  };

  const createRoom = async () => {
    await fetch(
      "http://Hmanage-env.eba-ibcrgcpt.us-east-2.elasticbeanstalk.com/room",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          hname: hotelname,
          type: roomtype,
          baseprice: parseInt(baseprice, 10),
        }),
      }
    )
      .then((data) => {
        console.log("successful");
        navigate("/dashboard");
      })
      .catch((exception) => {
        console.log("Error occurred:");
        console.log(exception);
      });
  };

  return (
    <div style={rootStyle}>
      <Form>
        <Form.Group className="mb-3" controlId="hotelname">
          <Form.Label>Hotel Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Hotel name here"
            onChange={setHotelNameInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="roomtype">
          <Form.Label>Type of Room</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter the type of room"
            onChange={setRoomTypeInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="baseprice">
          <Form.Label>Base Price of a room</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter the base price of a room"
            onChange={setBasePriceInput}
          />
        </Form.Group>
      </Form>

      <Button variant="primary" type="submit" onClick={createRoom}>
        Submit
      </Button>
    </div>
  );
}

export default AdminRoom;
