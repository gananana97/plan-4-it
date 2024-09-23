import React, { useState } from 'react';
import api from '../utils/api';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            onLogin();
        } catch (error) {
            console.error('Login error', error);
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type='email' placeholder='Enter Your Email' value={email} onChange={(event) => setEmail(event.target.value)} required />
                <input type='password' placeholder='Enter Your Password' value={password} onChange={(event) => setPassword(event.target.value)} required />  
                <button type='submit'>Login</button>          
            </form>
        </div>
    );
};

export default LoginForm;