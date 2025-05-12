import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
    Divider,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Google as GoogleIcon,
    GitHub as GitHubIcon,
    Facebook as FacebookIcon,
    Twitter as TwitterIcon
} from '@mui/icons-material';

export default function Login({ onToast }) {
    const navigate = useNavigate();
    const { signin, signinWithGoogle, signinWithGithub, signinWithFacebook, signinWithTwitter } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signin(formData.email, formData.password);
            onToast('Successfully logged in!', 'success');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message);
            onToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialSignIn = async (provider, providerName) => {
        try {
            setError('');
            setLoading(true);
            await provider();
            onToast(`Successfully logged in with ${providerName}!`, 'success');
            navigate('/dashboard');
        } catch (error) {
            console.error(`${providerName} login error:`, error);
            setError(error.message);
            onToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Sign In
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={loading}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Sign In'}
                        </Button>
                    </form>

                    <Divider sx={{ my: 2 }}>OR</Divider>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<GoogleIcon />}
                                onClick={() => handleSocialSignIn(signinWithGoogle, 'Google')}
                                disabled={loading}
                            >
                                Sign in with Google
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<GitHubIcon />}
                                onClick={() => handleSocialSignIn(signinWithGithub, 'GitHub')}
                                disabled={loading}
                            >
                                Sign in with GitHub
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<FacebookIcon />}
                                onClick={() => handleSocialSignIn(signinWithFacebook, 'Facebook')}
                                disabled={loading}
                            >
                                Sign in with Facebook
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<TwitterIcon />}
                                onClick={() => handleSocialSignIn(signinWithTwitter, 'Twitter')}
                                disabled={loading}
                            >
                                Sign in with Twitter
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="center" sx={{ mt: 3 }}>
                        <Grid item>
                            <Link to="/signup" style={{ textDecoration: 'none' }}>
                                <Typography color="primary">
                                    Don't have an account? Sign Up
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    );
}
