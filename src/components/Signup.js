import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Divider
} from '@mui/material';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, signInWithGoogle, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard');
        }
    }, [currentUser, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signup(email, password, name, mobile);
            navigate('/dashboard');
        } catch (error) {
            setError('Failed to create an account: ' + error.message);
        }
        setLoading(false);
    }

    async function handleGoogleSignIn() {
        try {
            setError('');
            setLoading(true);
            await signInWithGoogle();
            navigate('/dashboard');
        } catch (error) {
            setError('Failed to sign in with Google: ' + error.message);
        }
        setLoading(false);
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Sign Up
                    </Typography>
                    {error && (
                        <Typography color="error" align="center" gutterBottom>
                            {error}
                        </Typography>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            type="text"
                            fullWidth
                            margin="normal"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Mobile Number"
                            type="tel"
                            fullWidth
                            margin="normal"
                            required
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                            disabled={loading}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Divider>OR</Divider>
                    </Box>
                    <Button
                        onClick={handleGoogleSignIn}
                        fullWidth
                        variant="outlined"
                        disabled={loading}
                    >
                        Sign Up with Google
                    </Button>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography>
                            Already have an account? <Link to="/login">Sign In</Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
