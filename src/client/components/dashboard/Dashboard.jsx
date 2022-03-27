import React from 'react';
import Form from 'react-bootstrap/Form';
import DashboardFooter from './DashboardFooter';
import DashboardHeader from './DashboardHeader';
import Image from 'react-bootstrap/Image'
import HotelSearch from './HotelSearch';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const backgroundImageStyle = {
  height: '100vh',
  position: 'absolute',
  width: '100vw',
};

const hotelSearchStyle = {
  position: 'relative'
}

function Dashboard({ }) {
  return (
    <div style={rootStyle}>
      <DashboardHeader />
      <Image src="https://images.unsplash.com/photo-1543731068-7e0f5beff43a" style={backgroundImageStyle} />
      <HotelSearch style={hotelSearchStyle} />
      <>Welcome</>
      <DashboardFooter />
    </div>
  );
}

export default Dashboard;