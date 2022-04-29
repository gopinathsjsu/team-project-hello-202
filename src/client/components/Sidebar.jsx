import React from "react";
import { Nav } from "react-bootstrap";
import { List as ListIcon } from "react-bootstrap-icons";

const listIconStyle = {
  height: 45,
  width: 50,
  padding: "10px 0px 10px 5px",
};

function Sidebar({ showSidebar, setJWT, isAdmin, setIsAdmin }) {
  const onLinkSelect = (selectedKey) => {
    if (selectedKey === "logout") {
      setIsAdmin(false);
      setJWT(null);
    }
  };
  console.log(isAdmin);

  return (
    <>
      <Nav
        style={{ position: "absolute", zIndex: 2, height: 365, width: 200 }}
        className="col-md-12 d-none d-md-block bg-light sidebar"
        onSelect={onLinkSelect}
      >
        <ListIcon
          className="listiconstyle"
          style={listIconStyle}
          onClick={showSidebar}
        />
        <div className="sidebar-sticky"></div>

        {isAdmin ? (
          <Nav.Item>
            <Nav.Link href="/admin">Create Hotel</Nav.Link>
          </Nav.Item>
        ) : (
          <></>
        )}

        {isAdmin ? (
          <Nav.Item>
            <Nav.Link href="/adminroom">Create room</Nav.Link>
          </Nav.Item>
        ) : (
          <></>
        )}

        <Nav.Item>
          <Nav.Link href="/dashboard" eventKey="dashboard">
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="trips" href="/trips">
            My Trips
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="rewards" href="/rewards">
            Rewards
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="signin" href="/login">
            Sign-In
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="register" href="/signup">
            Register
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="logout" href="/logout">
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Sidebar;
