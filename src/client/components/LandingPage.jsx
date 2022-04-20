import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";
import SignUp from "./auth/SignUp";
import HotelSearch from "./HotelSearch";
import HotelDetail from "./HotelDetail";
import Sidebar from "./Sidebar";
import Rewards from "./Rewards";
import Trips from "./Trips";
import Admin from "./Admin";
import AdminRoom from "./AdminRoom";

const LandingPage = ({ }) => {
  const [jwt, setJWT] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [destination, setDestination] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [roomCount, setRoomCount] = useState(0);
  const [roomType, setRoomType] = useState("single");
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
            />
          }
        />
        <Route path="rewards" element={<Rewards />} />
        <Route
          path="logout"
          element={<Login setIsAdmin={setIsAdmin} setJWT={setJWT} />}
        />
        <Route path="trips" element={<Dashboard content={<Trips userID={jwt} />} />} />
        <Route
          path="login"
          element={<Login setIsAdmin={setIsAdmin} setJWT={setJWT} />}
        />
        <Route path="signup" element={<SignUp />} />
        <Route path="admin" element={<Admin />} />
        <Route path="adminroom" element={<AdminRoom />} />
        <Route path="sidebar" element={<Sidebar setJWT={setJWT} setIsAdmin={setIsAdmin} />} />
        <Route
          path="search"
          element={
            <Dashboard
              jwt={jwt}
              roomType={roomType}
              setRoomType={setRoomType}
              isSearchFormShown={true}
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
          element={<>{jwt ? <Dashboard jwt={jwt} /> : <Login setIsAdmin={setIsAdmin} setJWT={setJWT} />}</>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default LandingPage;
