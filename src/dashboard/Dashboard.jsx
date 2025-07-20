// Dashboard.js
import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import AppointmentsList from './AppointmentsList';
import CreateAppointment from './CreateAppointment';
import CancelAppointment from './CancelAppointment';

function Dashboard() {
  const [reloadFlag, setReloadFlag] = useState(0);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>Dashboard de Citas</h1>
        <CreateAppointment onSuccess={() => setReloadFlag(reloadFlag + 1)} />
        <CancelAppointment onSuccess={() => setReloadFlag(reloadFlag + 1)} />
        <AppointmentsList reloadFlag={reloadFlag} />
      </div>
    </div>
  );
}

export default Dashboard;
