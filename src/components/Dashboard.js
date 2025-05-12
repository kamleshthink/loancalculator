import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    AppBar,
    Toolbar,
    Button,
    IconButton
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CalculateIcon from '@mui/icons-material/Calculate';

const calculators = [
    {
        title: 'EMI Calculator',
        description: 'Calculate EMI for your loans',
        path: '/emi-calculator',
        icon: '💰'
    },
    {
        title: 'Housing Loan Calculator',
        description: 'Plan your home loan EMIs',
        path: '/housing-loan-calculator',
        icon: '🏠'
    },
    {
        title: 'Mutual Fund Calculator',
        description: 'Calculate mutual fund returns',
        path: '/mutual-fund-calculator',
        icon: '📈'
    },
    {
        title: 'Loan Calculator',
        description: 'Calculate loan details and interest',
        path: '/loan-calculator',
        icon: '💵'
    }
];

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ marginBottom: 4 }}>
                <Toolbar>
                    <CalculateIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Financial Calculators
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                        {currentUser?.email}
                    </Typography>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {calculators.map((calculator) => (
                        <Grid item xs={12} sm={6} md={4} key={calculator.path}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 3
                                    }
                                }}
                                onClick={() => navigate(calculator.path)}
                            >
                                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                    <Typography variant="h1" component="div" sx={{ fontSize: '4rem', mb: 2 }}>
                                        {calculator.icon}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {calculator.title}
                                    </Typography>
                                    <Typography>
                                        {calculator.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
