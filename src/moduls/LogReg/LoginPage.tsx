import React, { useState } from 'react';
import { Button, TextField, Link, Typography, Container } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const url = "http://api.stamenic.work:8080/api";

interface DecodedToken {
    permission: number;
}

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register')
    }
    // @ts-ignore
    const authenticate = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Both fields are required');
            return;
        }

        let isAuthenticated = true; // Placeholder for actual authentication logic
        let isEmployee = true; // Placeholder to determine if user is an employee
        try {
            const result = await fetch(`${url}/korisnik/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: email, password: password }) });
            const token = await result.text();
            document.cookie = `si-token=${token};`
            const decodedToken = jwtDecode(token) as DecodedToken;
            if (decodedToken.permission === 0) {
                isEmployee = false;
            }
        } catch (e) {
            isAuthenticated = false;
        }

        if (!isAuthenticated) {
            setError('Incorrect username or password');
        } else {
            if (isEmployee) {
                // Redirect to users list page
                window.location.href = '/users';
            } else {
                // Redirect to user's homepage
                window.location.href = '/home';
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <form onSubmit={authenticate}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!email || !password}
                >
                    Login
                </Button>
                <Link href="/reset-password" variant="body2">
                    Forgot password?
                </Link>
                <br />
                <Link onClick={handleRegister} variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
            </form>
        </Container>
    );
};

export default LoginPage;
