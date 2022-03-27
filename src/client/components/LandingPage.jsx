import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react'
import Login from './auth/Login';
import Dashboard from './Dashboard';

const LandingPage = ({}) => {
  const [isJWTFound, setIsJWTFound] = useState(false);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<>{isJWTFound ? <Dashboard /> : <Login />}</>}>
        {/* <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />}>
          <Route
            index
            element={
              <main style={{ padding: '1rem' }}>
                <p>Select an invoice</p>
              </main>
            }
          />
          <Route path=":invoiceId" element={<Invoice />} />
        </Route> */}
        <Route
          path="*"
          element={
            <>{isJWTFound ? <Dashboard /> : <Login />}</>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter> 
  )
};

export default LandingPage