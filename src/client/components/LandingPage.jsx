import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";
import SignUp from "./auth/SignUp";
import HotelSearch from "./HotelSearch";
import HotelDetail from "./HotelDetail";
import Sidebar from "./Sidebar";
import Trips from "./Trips";
import Admin from "./Admin";
import AdminRoom from "./AdminRoom";

const LandingPage = ({}) => {
  const [jwt, setJWT] = useState(JSON.parse(localStorage.getItem("jwt")));
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") == "true"
  );
  const [hotels, setHotels] = useState([]);
  const [destination, setDestination] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [roomCount, setRoomCount] = useState(0);
  const [roomType, setRoomType] = useState("all");
  const [peopleCount, setPeopleCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {jwt ? (
                <Dashboard
                  jwt={jwt}
                  roomType={roomType}
                  setRoomType={setRoomType}
                  isSearchFormShown={true}
                  setAvailableHotels={setHotels}
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
                  isAdmin={isAdmin}
                  setIsAdmin={setIsAdmin}
                />
              ) : (
                <Login setIsAdmin={setIsAdmin} setJWT={setJWT} />
              )}
            </>
          }
        />

        <Route
          path="dashboard"
          element={
            <Dashboard
              jwt={jwt}
              roomType={roomType}
              setRoomType={setRoomType}
              isSearchFormShown={true}
              setAvailableHotels={setHotels}
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
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            />
          }
        />

        <Route
          path="logout"
          element={
            <Login setIsAdmin={setIsAdmin} isAdmin={isAdmin} setJWT={setJWT} />
          }
        />
        <Route
          path="trips"
          element={
            <Dashboard
              jwt={jwt}
              setIsAdmin={setIsAdmin}
              isAdmin={isAdmin}
              content={<Trips jwt={jwt} />}
            />
          }
        />
        <Route
          path="login"
          element={
            <Login setIsAdmin={setIsAdmin} isAdmin={isAdmin} setJWT={setJWT} />
          }
        />
        <Route path="signup" element={<SignUp />} />
        <Route path="admin" element={<Admin />} />
        <Route path="adminroom" element={<AdminRoom />} />
        <Route
          path="sidebar"
          element={
            <Sidebar
              setJWT={setJWT}
              setIsAdmin={setIsAdmin}
              z
              isAdmin={isAdmin}
            />
          }
        />
        <Route
          path="search"
          element={
            <Dashboard
              jwt={jwt}
              roomType={roomType}
              setRoomType={setRoomType}
              isSearchFormShown={true}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              content={
                <HotelSearch
                  availableHotels={hotels}
                  destination={destination}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  roomCount={roomCount}
                  peopleCount={peopleCount}
                  roomType={roomType}
                  setDestination={setDestination}
                  setCheckInDate={setCheckInDate}
                  setCheckOutDate={setCheckOutDate}
                  setRoomCount={setRoomCount}
                  setPeopleCount={setPeopleCount}
                  setIsAdmin={setIsAdmin}
                  isAdmin={isAdmin}
                  userID={jwt}
                />
              }
              destination={destination}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              roomCount={roomCount}
              peopleCount={peopleCount}
              setAvailableHotels={setHotels}
              setDestination={setDestination}
              setCheckInDate={setCheckInDate}
              setCheckOutDate={setCheckOutDate}
              setRoomCount={setRoomCount}
              setPeopleCount={setPeopleCount}
            />
          }
        >
          <Route
            index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select a hotel</p>
              </main>
            }
          />
          <Route path=":hotelID" element={<HotelDetail />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              {jwt ? (
                <Dashboard jwt={jwt} />
              ) : (
                <Login
                  setIsAdmin={setIsAdmin}
                  isAdmin={isAdmin}
                  setJWT={setJWT}
                />
              )}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default LandingPage;
