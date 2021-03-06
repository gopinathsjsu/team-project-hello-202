import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const rootStyle = {
  margin: "auto",
  width: "50vw",
  height: "50vh",
};

function SignUp() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  let navigate = useNavigate();

  const setPasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const setEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const setNameInput = (e) => {
    setName(e.target.value);
  };

  const signUpUser = () => {
    fetch(
      "http://awseb-awseb-neb659irixfb-1496663984.us-east-2.elb.amazonaws.com/user",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name,
          password,
          email,
          accountDate: new Date(Date.now()).toISOString(),
        }),
      }
    ).then((res) => {
      res
        .json()
        .then((data) => {
          navigate("/login");
        })
        .catch((exception) => {
          console.log("Error occurred:");
          console.log(exception);
        });
    });
  };
  return (
    <div style={rootStyle}>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            onChange={setNameInput}
          />
          <Form.Text className="text-muted">
            We'll never share your name with anyone else.
          </Form.Text>
        </Form.Group>
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
      <Button
        variant="primary"
        type="submit"
        onClick={signUpUser}
        style={{ margin: "auto" }}
      >
        Submit
      </Button>
    </div>
  );
}

export default SignUp;
