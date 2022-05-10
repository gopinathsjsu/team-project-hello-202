import React from "react";
import {
  Briefcase as BriefcaseIcon,
  CaretDown as CaretDownIcon,
  List as ListIcon,
  Person as PersonIcon,
} from "react-bootstrap-icons";
import { Dropdown } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import Image from "react-bootstrap/Image";
import HotelSearchForm from "../HotelSearchForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../Sidebar";

const rootStyle = {
  display: "flex",
  flexDirection: "column",
};

const backgroundImageStyle = {
  height: "100vh",
  position: "absolute",
  width: "100vw",
};

const hotelSearchStyle = {
  position: "relative",
};

const listIconStyle = {
  height: 25,
  width: 30,
  cursor: "pointer",
};

const briefcaseIconStyle = {
  margin: "5px 7px",
};

const signInStyle = {
  color: "white",
};

const myTripStyle = {
  display: "flex",
  flexDirection: "row",
  cursor: "pointer",
};

const myTripTextStyle = {
  cursor: "pointer",
};

function Dashboard({
  jwt,
  roomType,
  setRoomType,
  isSearchFormShown,
  content,
  setAvailableHotels,
  setDestination,
  setCheckInDate,
  setCheckOutDate,
  setRoomCount,
  setPeopleCount,
  destination,
  checkInDate,
  checkOutDate,
  roomCount,
  peopleCount,
  isAdmin,
}) {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={signInStyle}
    >
      {children}
    </a>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState();

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );
  let navigate = useNavigate();

  const onSignUpClick = () => {
    navigate("/signup");
  };

  const onLoginClick = () => {
    navigate("/login");
  };

  const onMyTripsClick = () => {
    navigate("/trips");
  };

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div style={rootStyle}>
      {sidebar && <Sidebar showSidebar={showSidebar} isAdmin={isAdmin} />}
      <Header
        left={[
          <ListIcon style={listIconStyle} eventKey="3" onClick={showSidebar} />,
          <> {isAdmin ? <h4>Admin</h4> : <span></span>}</>,
        ]}
        right={[
          <div>
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                <PersonIcon />
                {jwt != null ? <>Join</> : <>Sign In or Join</>}
                <CaretDownIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu as={CustomMenu}>
                {jwt != null ? (
                  <></>
                ) : (
                  <Dropdown.Item eventKey="1" onClick={onLoginClick}>
                    Sign In
                  </Dropdown.Item>
                )}
                <Dropdown.Item eventKey="2" onClick={onSignUpClick}>
                  Join
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>,
          <div style={myTripStyle}>
            <BriefcaseIcon
              style={briefcaseIconStyle}
              onClick={onMyTripsClick}
            />
            <div onClick={onMyTripsClick} style={myTripTextStyle}>
              My Trips
            </div>
          </div>,
        ]}
      />
      <Image
        // src="https://images.unsplash.com/photo-1543731068-7e0f5beff43a"
        src="https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        style={backgroundImageStyle}
      />
      {isSearchFormShown === true ? (
        <HotelSearchForm
          style={hotelSearchStyle}
          roomType={roomType}
          setRoomType={setRoomType}
          setAvailableHotels={setAvailableHotels}
          setDestination={setDestination}
          setCheckInDate={setCheckInDate}
          setCheckOutDate={setCheckOutDate}
          setRoomCount={setRoomCount}
          setPeopleCount={setPeopleCount}
          destination={destination}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          roomCount={roomCount}
          peopleCount={peopleCount}
        />
      ) : (
        <></>
      )}
      {content != null ? content : <>Welcome</>}
      <Footer />
    </div>
  );
}

export default Dashboard;
