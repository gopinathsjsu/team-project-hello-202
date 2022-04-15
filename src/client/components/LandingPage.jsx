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
import Logout from "./Logout";
import About from "./About";
const LandingPage = ({ }) => {
  const [isJWTFound, setIsJWTFound] = useState(false)
  const [rooms, setRooms] = useState([])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<>{isJWTFound ? <Dashboard /> : <Login />}</>}
        />

        <Route path="dashboard" element={<Dashboard setRooms={setRooms} />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="logout" element={<Logout />} />
        <Route path="about" element={<About />} />
        <Route path="trips" element={<Dashboard content={<Trips />} setRooms={setRooms} />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="sidebar" element={<Sidebar />} />
        <Route path="search" element={<Dashboard content={<HotelSearch rooms={rooms} />} setRooms={setRooms} />} >
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
          element={<>{isJWTFound ? <Dashboard /> : <Login />}</>}
        />
      </Routes>
    </BrowserRouter >
  );
};

export default LandingPage;
