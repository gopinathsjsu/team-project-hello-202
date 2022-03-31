import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react'
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import HotelSearch from './HotelSearch';
import HotelDetail from './HotelDetail';

const LandingPage = ({ }) => {
  const [isJWTFound, setIsJWTFound] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>{isJWTFound ? <Dashboard /> : <Login />}</>} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="search" element={<HotelSearch />}>
          <Route
            index
            element={
              <main style={{ padding: '1rem' }}>
                <p>Select a hotel</p>
              </main>
            }
          />
          <Route path=":hotelID" element={<HotelDetail />} />
        </Route>
        <Route
          path="*"
          element={
            <>{isJWTFound ? <Dashboard /> : <Login />}</>
          }
        />
      </Routes>
    </BrowserRouter>
  )
};

export default LandingPage