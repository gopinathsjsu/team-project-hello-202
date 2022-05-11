import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const rootStyle = {
  margin: "auto",
  width: "50vw",
  height: "50vh",
};

function Login({ setJWT, setIsAdmin }) {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  let navigate = useNavigate();

  const setPasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const setEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const authenticateUser = () => {
    fetch(
      "http://Hmanage-env.eba-ibcrgcpt.us-east-2.elasticbeanstalk.com/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          password,
          email,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setJWT(data.userID);
        localStorage.setItem("jwt", data.userID);
        setIsAdmin(data.isAdmin);
        localStorage.setItem("isAdmin", data.isAdmin);
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
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={setEmailInput}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={setPasswordInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
      </Form>
      <Button variant="primary" type="submit" onClick={authenticateUser}>
        Submit
      </Button>
    </div>
  );
}

export default Login;
