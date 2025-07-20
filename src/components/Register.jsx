import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    fullname: '',
    phone: '',
    birthdate: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://34.196.95.125/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setMessage('✅ Usuario registrado correctamente');
        setTimeout(() => navigate('/'), 2000);
      } else {
        const data = await response.json();
        setMessage(`❌ Error: ${data.message || 'No se pudo registrar'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Network error');
    }
  };

  return (
  <div className="login-page">
    <div className="login-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Usuario" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Correo" onChange={handleChange} required />
        <input name="fullname" type="text" placeholder="Nombre Completo" onChange={handleChange} required />
        <input name="phone" type="text" placeholder="Teléfono" onChange={handleChange} required />
        <input name="birthdate" type="date" onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
      <p>{message}</p>
    </div>
  </div>
);
};

export default Register;
