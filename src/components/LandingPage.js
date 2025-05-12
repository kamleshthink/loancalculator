import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    Box,
    Button,
    Typography,
    Container,
    AppBar,
    Toolbar,
    Card,
    CardContent,
    Grid,
    Paper
} from '@mui/material';
import {
    Home as HomeIcon,
    DirectionsCar as CarIcon,
    School as EducationIcon,
    Business as BusinessIcon,
    Person as PersonIcon,
    Calculate as CalculateIcon
} from '@mui/icons-material';

export default function LandingPage() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    return (
        <Box>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar sx={{ justifyContent: 'flex-end' }}>
                    {currentUser ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/dashboard')}
                        >
                            Dashboard
                        </Button>
                    ) : (
                        <Box sx={{ gap: 2, display: 'flex' }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                component={Link}
                                to="/login"
                            >
                                Sign In
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/signup"
                            >
                                Sign Up
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg">
                <Box sx={{ mt: 8, mb: 8 }}>
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
                                onClick={() => navigate('/signup')}
                            >
                                Get Started
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="primary"
                                onClick={() => navigate('/login')}
                            >
                                View Calculators
                            </Button>
                        </Box>
                    </Box>

                    <Grid container spacing={3} sx={{ mb: 6 }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}>
                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                    <HomeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                    <Typography variant="h6" gutterBottom>Home Loan</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Calculate your home loan EMI and plan your dream home purchase
                                    </Typography>
                                    <Button 
                                        variant="text" 
                                        sx={{ mt: 2 }}
                                        onClick={() => navigate('/home-loan')}
                                    >
                                        Calculate Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}>
                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                    <CarIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                    <Typography variant="h6" gutterBottom>Auto Loan</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Find the best auto loan terms and calculate monthly payments
                                    </Typography>
                                    <Button 
                                        variant="text" 
                                        sx={{ mt: 2 }}
                                        onClick={() => navigate('/car-loan')}
                                    >
                                        Calculate Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}>
                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                    <EducationIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                    <Typography variant="h6" gutterBottom>Education Loan</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Plan your education financing with our education loan calculator
                                    </Typography>
                                    <Button 
                                        variant="text" 
                                        sx={{ mt: 2 }}
                                        onClick={() => navigate('/education-loan')}
                                    >
                                        Calculate Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}>
                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                    <BusinessIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                    <Typography variant="h6" gutterBottom>Business Loan</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Calculate business loan EMIs and plan your business growth
                                    </Typography>
                                    <Button 
                                        variant="text" 
                                        sx={{ mt: 2 }}
                                        onClick={() => navigate('/business-loan')}
                                    >
                                        Calculate Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}>
                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                    <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                    <Typography variant="h6" gutterBottom>Personal Loan</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Quick personal loan calculator for your immediate needs
                                    </Typography>
                                    <Button 
                                        variant="text" 
                                        sx={{ mt: 2 }}
                                        onClick={() => navigate('/personal-loan')}
                                    >
                                        Calculate Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' } }}>
                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                    <CalculateIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                    <Typography variant="h6" gutterBottom>EMI Calculator</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        General purpose EMI calculator for all types of loans
                                    </Typography>
                                    <Button 
                                        variant="text" 
                                        sx={{ mt: 2 }}
                                        onClick={() => navigate('/emi-calculator')}
                                    >
                                        Calculate Now
                                    </Button>
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
            </Container>
        </Box>
    );
}
