import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    TextField,
    Alert,
    Grid,
    Container,
    CircularProgress,
    Divider,
    Card,
    CardContent,
    Paper
} from '@mui/material';
import {
    Google as GoogleIcon,
    GitHub as GitHubIcon,
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Home as HomeIcon,
    DirectionsCar as CarIcon,
    School as EducationIcon,
    Business as BusinessIcon,
    Person as PersonIcon,
    Calculate as CalculateIcon
} from '@mui/icons-material';

export default function AuthTest() {
    const navigate = useNavigate();
    const {
        currentUser,
        signin,
        signup,
        signout,
        signinWithGoogle,
        signinWithGithub,
        signinWithFacebook,
        signinWithTwitter
    } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogout = async () => {
        try {
            setError('');
            setSuccess('');
            setLoading(true);
            await signout();
            setSuccess('Successfully logged out');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Clear messages after 5 seconds
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const handleEmailSignin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }
        try {
            setError('');
            setSuccess('');
            setLoading(true);
            await signin(email, password);
            setSuccess('Successfully signed in with email/password');
            setEmail('');
            setPassword('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }
        if (password.length < 6) {
            setError('Password should be at least 6 characters');
            return;
        }
        try {
            setError('');
            setSuccess('');
            setLoading(true);
            await signup(email, password);
            setSuccess('Successfully created account and signed in');
            setEmail('');
            setPassword('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignout = async () => {
        try {
            setError('');
            setSuccess('');
            setLoading(true);
            await signout();
            setSuccess('Successfully signed out');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleProviderSignin = async (provider, providerName) => {
        try {
            setError('');
            setSuccess('');
            setLoading(true);
            await provider();
            setSuccess(`Successfully signed in with ${providerName}`);
        } catch (error) {
            console.error(`${providerName} sign-in error:`, error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4, mb: 8 }}>
                {currentUser ? (
                    <Box>
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <Typography variant="h3" gutterBottom color="primary">
                                Professional Loan Calculators
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                                Make informed financial decisions with our comprehensive suite of loan calculators
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => navigate('/home-loan')}
                                >
                                    Get Started
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="primary"
                                    onClick={() => navigate('/calculators')}
                                >
                                    View Calculators
                                </Button>
                            </Box>
                        </Box>

                        <Grid container spacing={3} sx={{ mb: 6 }}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card 
                                    sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}
                                    onClick={() => navigate('/home-loan')}
                                >
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <HomeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h6" gutterBottom>Home Loan</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Calculate your home loan EMI and plan your dream home purchase
                                        </Typography>
                                        <Button variant="text" sx={{ mt: 2 }}>Calculate Now</Button>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Card 
                                    sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}
                                    onClick={() => navigate('/car-loan')}
                                >
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <CarIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h6" gutterBottom>Auto Loan</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Find the best auto loan terms and calculate monthly payments
                                        </Typography>
                                        <Button variant="text" sx={{ mt: 2 }}>Calculate Now</Button>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Card 
                                    sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}
                                    onClick={() => navigate('/education-loan')}
                                >
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <EducationIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h6" gutterBottom>Education Loan</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Plan your education financing with our education loan calculator
                                        </Typography>
                                        <Button variant="text" sx={{ mt: 2 }}>Calculate Now</Button>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Card 
                                    sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}
                                    onClick={() => navigate('/business-loan')}
                                >
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <BusinessIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h6" gutterBottom>Business Loan</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Calculate business loan EMIs and plan your business growth
                                        </Typography>
                                        <Button variant="text" sx={{ mt: 2 }}>Calculate Now</Button>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Card 
                                    sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}
                                    onClick={() => navigate('/personal-loan')}
                                >
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h6" gutterBottom>Personal Loan</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quick personal loan calculator for your immediate needs
                                        </Typography>
                                        <Button variant="text" sx={{ mt: 2 }}>Calculate Now</Button>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Card 
                                    sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}
                                    onClick={() => navigate('/emi-calculator')}
                                >
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <CalculateIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h6" gutterBottom>EMI Calculator</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            General purpose EMI calculator for all types of loans
                                        </Typography>
                                        <Button variant="text" sx={{ mt: 2 }}>Calculate Now</Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Box sx={{ mb: 6 }}>
                            <Typography variant="h4" gutterBottom textAlign="center" color="primary">
                                Why Choose Our Calculators?
                            </Typography>
                            <Grid container spacing={4} sx={{ mt: 3 }}>
                                <Grid item xs={12} md={4}>
                                    <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'background.default' }}>
                                        <Typography variant="h6" gutterBottom>Accurate Calculations</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Get precise EMI calculations with detailed amortization schedules
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'background.default' }}>
                                        <Typography variant="h6" gutterBottom>Visual Insights</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Interactive charts and graphs to understand your loan better
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'background.default' }}>
                                        <Typography variant="h6" gutterBottom>Save & Compare</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Save calculations and compare different loan scenarios
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>

                        </Box>
                    ) : (
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Typography variant="h4" gutterBottom color="primary">
                                Welcome to ProLoanCalc
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                                Please sign in to access our loan calculators
                            </Typography>
                        </Box>
                    )}
            </Box>
        </Container>
    );
}
