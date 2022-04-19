import React from "react";
import { Nav } from "react-bootstrap";
import { List as ListIcon } from "react-bootstrap-icons";

const listIconStyle = {
  height: 45,
  width: 50,
  padding: "10px 0px 10px 5px",
};

function Sidebar({ showSidebar }) {
  return (
    <>
      <Nav
        style={{ position: "absolute", zIndex: 2, height: 320, width: 200 }}
        className="col-md-12 d-none d-md-block bg-light sidebar"
        // activeKey="/home
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <ListIcon
          className="listiconstyle"
          style={listIconStyle}
          onClick={showSidebar}
        />

        <div className="sidebar-sticky"></div>

        <Nav.Item>
          <Nav.Link href="/admin">Admin</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/dashboard" eventKey="link-1">
            Dashboard
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="link-2" href="/trips">
            My Trips
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="link-3" href="/rewards">
            Rewards
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="link-4" href="/login">
            Sign-In
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="link-5" href="/signup">
            Register
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="link-6" href="/logout">
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Sidebar;
