import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://100.25.195.141/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Credenciales incorrectas');
            }

            const data = await response.json();
            console.log('Login OK:', data);

            localStorage.setItem('token', data.token);
            setSuccess('✅ Login exitoso');

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <h1 className="login-title">CitaSaludEC</h1>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Login'}
                    </button>
                </form>

                {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
                {success && <p style={{ color: 'green', marginTop: '1rem' }}>{success}</p>}

                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '0.5rem' }}>¿No tienes cuenta?</p>
                    <a href="/register" style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.5rem',
                        background: '#00695c',
                        color: 'white',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        transition: 'background 0.3s'
                    }}
                        onMouseOver={(e) => e.target.style.background = '#004d40'}
                        onMouseOut={(e) => e.target.style.background = '#00695c'}
                    >
                        Registrarse
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
