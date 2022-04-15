import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const formStyle = {
  margin: "auto",
  width: "50vw",
  height: "50vh",
};

function Login() {
  const [password, setPassword] = useState();
  let navigate = useNavigate();

  const setPasswordInput = (e) => {
    setPassword(e.target.value);
  }
  const setEmailInput = (e) => {
    setEmail(e.target.value)
  }


  const authenticateUser = () => {
    fetch("http://Hmanage-env.eba-ibcrgcpt.us-east-2.elasticbeanstalk.com/user", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          navigate('/dashboard')
        })
          .catch((exception) => {
            console.log("Error occurred:")
            console.log(exception)
          });
      })
  }
  return (
    <Form style={formStyle}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={setEmailInput} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={setPasswordInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={authenticateUser}>
        Submit
      </Button>
    </Form>
  );
}

export default Login;
