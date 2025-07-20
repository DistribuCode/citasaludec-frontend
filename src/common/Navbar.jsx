import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: '#00695c',
            color: 'white'
        }}>
            <h3>CitaSaludEC</h3>
            <div>
                <button onClick={() => navigate('/dashboard')} style={btnStyle}>Dashboard</button>
                <button onClick={handleLogout} style={btnStyle}>Logout</button>
            </div>
        </div>
    );
}

const btnStyle = {
    marginLeft: '1rem',
    padding: '0.5rem 1rem',
    background: '#004d40',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

export default Navbar;
