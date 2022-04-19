import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const rootStyle = {
  margin: "auto",
  width: "50vw",
  height: "50vh",
};
function Admin() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  let navigate = useNavigate();

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
}

export default Admin;
