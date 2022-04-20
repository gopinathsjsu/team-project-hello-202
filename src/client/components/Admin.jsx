import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

const rootStyle = {
  margin: "auto",
  width: "50vw",
  height: "50vh",
};

function admin() {
  const [hotelname, setHotelName] = useState();
  const [location, setLocation] = useState();
  const [total_single, setSingle] = useState();
  const [total_double, setDouble] = useState();
  const [total_suite, setSuite] = useState();

  let navigate = useNavigate();

  const setHotelNameInput = (e) => {
    setHotelName(e.target.value);
  };

  const setLocationInput = (e) => {
    setLocation(e.target.value);
  };

  const setSingleInput = (e) => {
    setSingle(e.target.value);
  };

  const setDoubleInput = (e) => {
    setDouble(e.target.value);
  };

  const setSuiteInput = (e) => {
    setSuite(e.target.value);
  };

  const createHotel = () => {
    fetch(
      "http://Hmanage-env.eba-ibcrgcpt.us-east-2.elasticbeanstalk.com/hotel",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          hname: hotelname,
          location,
          total_single,
          total_double,
          total_suite,
        }),
      }
    )
      .then((res) => res.json())
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

        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Hotel Location</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Hotel Location"
            onChange={setLocationInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="total_single">
          <Form.Label>Total Single Rooms</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter total single rooms in the Hotel"
            onChange={setSingleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="total_double">
          <Form.Label>Total Double Rooms</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter total double rooms in the Hotel"
            onChange={setDoubleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="total_suite">
          <Form.Label>Total Suite Rooms</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter total suite rooms in the Hotel"
            onChange={setSuiteInput}
          />
        </Form.Group>
      </Form>

      <Button variant="primary" type="submit" onClick={createHotel}>
        Submit
      </Button>
    </div>
  );
}

export default admin;
