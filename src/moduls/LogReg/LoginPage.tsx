import React, { useState } from 'react';
import { Button, TextField, Link, Typography, Container } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // @ts-ignore
    const authenticate = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Both fields are required');
            return;
        }
        // Simulate authentication process
        const isAuthenticated = true; // Placeholder for actual authentication logic
        const isEmployee = false; // Placeholder to determine if user is an employee

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
                <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
            </form>
        </Container>
    );
};

export default LoginPage;
