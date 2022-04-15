import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const formStyle = {
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
  }
  const setEmailInput = (e) => {
    setEmail(e.target.value)
  }
  const setNameInput = (e) => {
    setName(e.target.value);
  }

  const signUpUser = () => {
    fetch("http://Hmanage-env.eba-ibcrgcpt.us-east-2.elasticbeanstalk.com/user", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name,
        password,
        email,
      }),

    })
      .then((res) => {
        res.json().then((data) => {
          console.log('success');
          navigate('/login');
        })
          .catch((exception) => {
            console.log("Error occurred:");
            console.log(exception);
          });
      })
  }
  return (
    <>
      <Form style={formStyle}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder="Enter name" onChange={setNameInput} />
          <Form.Text className="text-muted">
            We'll never share your name with anyone else.
          </Form.Text>
        </Form.Group>
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
      </Form>
      <Button variant="primary" type="submit" onClick={signUpUser} style={{ margin: 'auto' }}>
        Submit
      </Button>
    </>
  );
}

export default SignUp;
