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
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function MutualFundCalculator() {
    const [investmentType, setInvestmentType] = useState('lumpsum');
    const [amount, setAmount] = useState(100000);
    const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [investmentPeriod, setInvestmentPeriod] = useState(10);
    const [riskLevel, setRiskLevel] = useState('moderate');
    const [totalInvestment, setTotalInvestment] = useState(0);
    const [totalReturns, setTotalReturns] = useState(0);
    const [wealthGained, setWealthGained] = useState(0);
    const navigate = useNavigate();

    const calculateReturns = () => {
        if (investmentType === 'lumpsum') {
            // Lumpsum calculation
            const futureValue = amount * Math.pow(1 + expectedReturn / 100, investmentPeriod);
            setTotalInvestment(amount);
            setTotalReturns(futureValue);
            setWealthGained(futureValue - amount);
        } else {
            // SIP calculation
            const monthlyRate = expectedReturn / 12 / 100;
            const months = investmentPeriod * 12;
            const futureValue = monthlyInvestment * 
                ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
                (1 + monthlyRate);
            
            setTotalInvestment(monthlyInvestment * months);
            setTotalReturns(futureValue);
            setWealthGained(futureValue - (monthlyInvestment * months));
        }
    };

    useEffect(() => {
        calculateReturns();
    }, [amount, monthlyInvestment, expectedReturn, investmentPeriod, investmentType]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const chartData = {
        labels: ['Invested Amount', 'Wealth Gained'],
        datasets: [
            {
                data: [totalInvestment, wealthGained],
                backgroundColor: ['#2196f3', '#4caf50'],
                borderColor: ['#1769aa', '#357a38'],
                borderWidth: 1,
            },
        ],
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
                        Mutual Fund Calculator
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Investment Details
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={investmentType}
                                    exclusive
                                    onChange={(e, value) => value && setInvestmentType(value)}
                                    fullWidth
                                >
                                    <ToggleButton value="lumpsum">Lumpsum</ToggleButton>
                                    <ToggleButton value="sip">SIP</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>

                            {investmentType === 'lumpsum' ? (
                                <>
                                    <Typography gutterBottom>Investment Amount: {formatCurrency(amount)}</Typography>
                                    <Slider
                                        value={amount}
                                        onChange={(e, value) => setAmount(value)}
                                        min={10000}
                                        max={10000000}
                                        step={10000}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={value => formatCurrency(value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Investment Amount"
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        margin="normal"
                                    />
                                </>
                            ) : (
                                <>
                                    <Typography gutterBottom>Monthly Investment: {formatCurrency(monthlyInvestment)}</Typography>
                                    <Slider
                                        value={monthlyInvestment}
                                        onChange={(e, value) => setMonthlyInvestment(value)}
                                        min={500}
                                        max={100000}
                                        step={500}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={value => formatCurrency(value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Monthly Investment"
                                        type="number"
                                        value={monthlyInvestment}
                                        onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                        margin="normal"
                                    />
                                </>
                            )}

                            <Typography gutterBottom>Expected Return: {expectedReturn}%</Typography>
                            <Slider
                                value={expectedReturn}
                                onChange={(e, value) => setExpectedReturn(value)}
                                min={1}
                                max={30}
                                step={0.5}
                                valueLabelDisplay="auto"
                                valueLabelFormat={value => `${value}%`}
                            />
                            <TextField
                                fullWidth
                                label="Expected Return (%)"
                                type="number"
                                value={expectedReturn}
                                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                margin="normal"
                            />

                            <Typography gutterBottom>Investment Period: {investmentPeriod} years</Typography>
                            <Slider
                                value={investmentPeriod}
                                onChange={(e, value) => setInvestmentPeriod(value)}
                                min={1}
                                max={30}
                                valueLabelDisplay="auto"
                                valueLabelFormat={value => `${value} years`}
                            />
                            <TextField
                                fullWidth
                                label="Investment Period (Years)"
                                type="number"
                                value={investmentPeriod}
                                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                                margin="normal"
                            />

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Risk Level</InputLabel>
                                <Select
                                    value={riskLevel}
                                    label="Risk Level"
                                    onChange={(e) => setRiskLevel(e.target.value)}
                                >
                                    <MenuItem value="low">Conservative (Low Risk)</MenuItem>
                                    <MenuItem value="moderate">Moderate Risk</MenuItem>
                                    <MenuItem value="high">Aggressive (High Risk)</MenuItem>
                                </Select>
                            </FormControl>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h6" gutterBottom>
                                Investment Summary
                            </Typography>
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h4" color="primary" gutterBottom>
                                    {formatCurrency(totalReturns)}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Expected Total Value
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        Total Investment
                                    </Typography>
                                    <Typography variant="h6">
                                        {formatCurrency(totalInvestment)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        Wealth Gained
                                    </Typography>
                                    <Typography variant="h6" color="success.main">
                                        {formatCurrency(wealthGained)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        Returns (XIRR)
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                        {expectedReturn}%
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
                                                text: 'Investment Growth'
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
