import React, { useEffect, useState } from 'react';
import { getAppointments } from '../api/api';

function AppointmentsList({ reloadFlag }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, [reloadFlag]);

  const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      console.log("🔄 Citas cargadas:", data);
      setAppointments(data);
    } catch (err) {
      console.error('Error cargando citas:', err);
    }
  };

  return (
    <div>
      <h2>Listado de Citas</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Enfermedad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr><td colSpan="4">No hay citas registradas</td></tr>
          ) : (
            appointments.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.patient_name} (ID: {app.patient})</td>
                <td>{app.disease}</td>
                <td>{app.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsList;
