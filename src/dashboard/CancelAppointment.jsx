import React, { useState } from 'react';
import { cancelAppointment } from '../api/api';

function CancelAppointment() {
  const [id, setId] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await cancelAppointment(id);
      alert('Cita cancelada correctamente');
    } catch (err) {
      console.error('Error cancelando cita', err);
    }
  };

  return (
    <div>
      <h2>Cancelar Cita</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="ID de la cita" 
          value={id} 
          onChange={e => setId(e.target.value)} 
        />
        <button type="submit">Cancelar</button>
      </form>
    </div>
  );
}

export default CancelAppointment;
