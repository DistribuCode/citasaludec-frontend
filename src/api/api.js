import axios from 'axios';

const API_BASE = 'http://localhost:8080'; // puerto incluido

// Función para obtener el token guardado
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No hay token almacenado, debes loguearte");
    return { Authorization: `Bearer ${token}` };
}

export async function loginUser(username, password) {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Login failed: ${errorText}`);
    }

    const data = await response.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
}

export async function getAppointments() {
    const res = await axios.get(`${API_BASE}/appointments/`, {
        headers: getAuthHeaders()
    });
    console.log("👉 Respuesta de getAppointments:", res.data);
    return res.data;
}

export async function createAppointment(data) {
    const res = await axios.post(`${API_BASE}/appointments/`, data, {
        headers: getAuthHeaders()
    });
    console.log("✅ Cita creada:", res.data);
    return res.data;
}

export async function cancelAppointment(id) {
    const res = await axios.delete(`${API_BASE}/cancel/${id}`, {
        headers: getAuthHeaders()
    });
    console.log("🗑 Cita cancelada:", res.data);
    return res.data;
}
