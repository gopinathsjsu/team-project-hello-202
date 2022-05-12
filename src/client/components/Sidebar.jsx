import jwt from "express-jwt";
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
      localStorage.removeItem("jwt");
      localStorage.removeItem("isAdmin");
      setIsAdmin(false);
      setJWT(null);
    }
  };

  return (
    <>
      <Nav
        style={{
          position: "absolute",
          zIndex: 2,
          height: 300,
          width: 200,
          background: "rgba(0, 0, 0, 0.5)",
          color: "rgb(0,0,0)",
        }}
        className="col-md-12 d-none d-md-block bg-light sidebar"
        onSelect={onLinkSelect}
      >
        <ListIcon
          className="listiconstyle"
          style={listIconStyle}
          onClick={showSidebar}
        ></ListIcon>
        <div className="sidebar-sticky"></div>

        {isAdmin ? (
          <Nav.Item>
            <Nav.Link href="/adminroom">Create Hotel</Nav.Link>
          </Nav.Item>
        ) : (
          <></>
        )}

        {isAdmin ? (
          <Nav.Item>
            <Nav.Link href="/admin">Create Room</Nav.Link>
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

        {!jwt ? (
          <Nav.Item>
            <Nav.Link eventKey="signin" href="/login">
              Sign-In
            </Nav.Link>
          </Nav.Item>
        ) : (
          <> </>
        )}

        <Nav.Item>
          <Nav.Link eventKey="register" href="/signup">
            Register
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="logout" href="/login">
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Sidebar;
