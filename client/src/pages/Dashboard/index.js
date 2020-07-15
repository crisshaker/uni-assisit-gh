import React from 'react';
import requireProfile from '../../components/requireProfile';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default requireProfile(Dashboard);
