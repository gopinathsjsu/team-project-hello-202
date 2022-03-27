import React from 'react';
import Form from 'react-bootstrap/Form';
import DashboardFooter from './DashboardFooter';
import DashboardHeader from './DashboardHeader';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
};

function Dashboard(props) {
  return (
   <div style={rootStyle}>
    <DashboardHeader />
    <DashboardFooter />
   </div>
  );
}

export default Dashboard;