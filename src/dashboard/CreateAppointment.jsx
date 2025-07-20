import React, { useState } from 'react';
import { createAppointment } from '../api/api';

function CreateAppointment({ onSuccess }) {
  const now = new Date().toISOString().slice(0,16);
  const [form, setForm] = useState({ patient: '', patient_name: '', disease: '', date: now });
  const [error, setError] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      await createAppointment({
        patient: parseInt(form.patient, 10),
        patient_name: form.patient_name,
        disease: form.disease,
        date: form.date.split("T")[0]
      });
      setForm({ patient: '', patient_name: '', disease: '', date: now });
      onSuccess();
    } catch (err) {
      console.error('Error agendando cita', err);
      setError("Error al agendar cita");
    }
  };

  return (
    <div>
      <h2>Agendar Nueva Cita</h2>
      {error && <p style={{ color: 'red' }}>✘ {error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="number"
          name="patient"
          placeholder="Paciente ID"
          value={form.patient}
          onChange={handleChange}
          required
        />
        <input 
          type="text"
          name="patient_name"
          placeholder="Nombre del Paciente"
          value={form.patient_name}
          onChange={handleChange}
          required
        />
        <input 
          type="text"
          name="disease"
          placeholder="Enfermedad"
          value={form.disease}
          onChange={handleChange}
          required
        />
        <input 
          type="datetime-local" 
          name="date"
          min={now}
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Agendar</button>
      </form>
    </div>
  );
}

export default CreateAppointment;
