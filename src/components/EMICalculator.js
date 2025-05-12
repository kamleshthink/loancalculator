import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    TextField,
    Typography,
    Box,
    Slider,
    Grid,
    Button,
    AppBar,
    Toolbar,
    IconButton
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function EMICalculator() {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [loanTerm, setLoanTerm] = useState(20);
    const [emi, setEMI] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const navigate = useNavigate();

    const calculateEMI = () => {
        const principal = loanAmount;
        const rate = interestRate / 12 / 100;
        const time = loanTerm * 12;
        
        const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
        const totalAmount = emi * time;
        
        setEMI(emi);
        setTotalPayment(totalAmount);
        setTotalInterest(totalAmount - principal);
    };

    useEffect(() => {
        calculateEMI();
    }, [loanAmount, interestRate, loanTerm]);

    const chartData = {
        labels: ['Principal', 'Interest'],
        datasets: [
            {
                data: [loanAmount, totalInterest],
                backgroundColor: ['#2196f3', '#f50057'],
                borderColor: ['#1769aa', '#ab003c'],
                borderWidth: 1,
            },
        ],
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ marginBottom: 4 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={() => navigate('/')}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        EMI Calculator
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Loan Details
                            </Typography>
                            
                            <Typography gutterBottom>Loan Amount: {formatCurrency(loanAmount)}</Typography>
                            <Slider
                                value={loanAmount}
                                onChange={(e, value) => setLoanAmount(value)}
                                min={100000}
                                max={10000000}
                                step={100000}
                                valueLabelDisplay="auto"
                                valueLabelFormat={value => formatCurrency(value)}
                            />
                            <TextField
                                fullWidth
                                label="Loan Amount"
                                type="number"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                margin="normal"
                            />

                            <Typography gutterBottom>Interest Rate: {interestRate}%</Typography>
                            <Slider
                                value={interestRate}
                                onChange={(e, value) => setInterestRate(value)}
                                min={5}
                                max={20}
                                step={0.1}
                                valueLabelDisplay="auto"
                                valueLabelFormat={value => `${value}%`}
                            />
                            <TextField
                                fullWidth
                                label="Interest Rate (%)"
                                type="number"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                margin="normal"
                            />

                            <Typography gutterBottom>Loan Term: {loanTerm} years</Typography>
                            <Slider
                                value={loanTerm}
                                onChange={(e, value) => setLoanTerm(value)}
                                min={1}
                                max={30}
                                valueLabelDisplay="auto"
                                valueLabelFormat={value => `${value} years`}
                            />
                            <TextField
                                fullWidth
                                label="Loan Term (Years)"
                                type="number"
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(Number(e.target.value))}
                                margin="normal"
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h6" gutterBottom>
                                EMI Breakdown
                            </Typography>
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h4" color="primary" gutterBottom>
                                    {formatCurrency(emi)}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Monthly EMI
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        Principal Amount
                                    </Typography>
                                    <Typography variant="h6">
                                        {formatCurrency(loanAmount)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        Total Interest
                                    </Typography>
                                    <Typography variant="h6">
                                        {formatCurrency(totalInterest)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        Total Payment
                                    </Typography>
                                    <Typography variant="h6">
                                        {formatCurrency(totalPayment)}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 4 }}>
                                <Line
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                            },
                                            title: {
                                                display: true,
                                                text: 'Principal vs Interest'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
