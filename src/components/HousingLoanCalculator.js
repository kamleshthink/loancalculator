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
    MenuItem
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function HousingLoanCalculator() {
    const [propertyValue, setPropertyValue] = useState(5000000);
    const [downPayment, setDownPayment] = useState(1000000);
    const [loanAmount, setLoanAmount] = useState(4000000);
    const [interestRate, setInterestRate] = useState(6.7);
    const [loanTerm, setLoanTerm] = useState(20);
    const [employmentType, setEmploymentType] = useState('salaried');
    const [emi, setEMI] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const navigate = useNavigate();

    const calculateLoan = () => {
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
        calculateLoan();
    }, [loanAmount, interestRate, loanTerm]);

    useEffect(() => {
        setLoanAmount(propertyValue - downPayment);
    }, [propertyValue, downPayment]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const chartData = {
        labels: ['Principal', 'Interest', 'Down Payment'],
        datasets: [
            {
                data: [loanAmount, totalInterest, downPayment],
                backgroundColor: ['#2196f3', '#f50057', '#4caf50'],
                borderColor: ['#1769aa', '#ab003c', '#357a38'],
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
                        Housing Loan Calculator
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Property Details
                            </Typography>

                            <Typography gutterBottom>Property Value: {formatCurrency(propertyValue)}</Typography>
                            <Slider
                                value={propertyValue}
                                onChange={(e, value) => setPropertyValue(value)}
                                min={1000000}
                                max={50000000}
                                step={500000}
                                valueLabelDisplay="auto"
                                valueLabelFormat={value => formatCurrency(value)}
                            />
                            <TextField
                                fullWidth
                                label="Property Value"
                                type="number"
                                value={propertyValue}
                                onChange={(e) => setPropertyValue(Number(e.target.value))}
                                margin="normal"
                            />

                            <Typography gutterBottom>Down Payment: {formatCurrency(downPayment)}</Typography>
                            <Slider
                                value={downPayment}
                                onChange={(e, value) => setDownPayment(value)}
                                min={propertyValue * 0.1}
                                max={propertyValue * 0.9}
                                step={100000}
                                valueLabelDisplay="auto"
                                valueLabelFormat={value => formatCurrency(value)}
                            />
                            <TextField
                                fullWidth
                                label="Down Payment"
                                type="number"
                                value={downPayment}
                                onChange={(e) => setDownPayment(Number(e.target.value))}
                                margin="normal"
                            />

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Employment Type</InputLabel>
                                <Select
                                    value={employmentType}
                                    label="Employment Type"
                                    onChange={(e) => setEmploymentType(e.target.value)}
                                >
                                    <MenuItem value="salaried">Salaried</MenuItem>
                                    <MenuItem value="self-employed">Self Employed</MenuItem>
                                    <MenuItem value="business">Business Owner</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography gutterBottom>Interest Rate: {interestRate}%</Typography>
                            <Slider
                                value={interestRate}
                                onChange={(e, value) => setInterestRate(value)}
                                min={5}
                                max={15}
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
                                min={5}
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
                                Loan Summary
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
                                        Loan Amount
                                    </Typography>
                                    <Typography variant="h6">
                                        {formatCurrency(loanAmount)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        Down Payment
                                    </Typography>
                                    <Typography variant="h6">
                                        {formatCurrency(downPayment)}
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
                                <Grid item xs={6}>
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
                                                text: 'Cost Breakdown'
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
