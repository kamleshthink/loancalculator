import React from 'react';
import {
    Grid,
    TextField,
    Slider,
    Typography,
    MenuItem,
    Card,
    CardContent,
} from '@mui/material';

export default function LoanForm({
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    paymentFrequency,
    setPaymentFrequency,
    loanType
}) {
    const frequencies = [
        { value: 12, label: 'Monthly' },
        { value: 4, label: 'Quarterly' },
        { value: 2, label: 'Semi-Annual' },
        { value: 1, label: 'Annual' }
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <Card>
            <CardContent>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography gutterBottom>Loan Amount</Typography>
                        <TextField
                            fullWidth
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            type="number"
                            InputProps={{
                                startAdornment: '₹',
                            }}
                        />
                        <Slider
                            value={loanAmount}
                            onChange={(_, value) => setLoanAmount(value)}
                            min={0}
                            max={10000000}
                            step={10000}
                            valueLabelDisplay="auto"
                            valueLabelFormat={formatCurrency}
                            sx={{ mt: 2 }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography gutterBottom>Interest Rate (%)</Typography>
                        <TextField
                            fullWidth
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            type="number"
                            InputProps={{
                                endAdornment: '%',
                            }}
                        />
                        <Slider
                            value={interestRate}
                            onChange={(_, value) => setInterestRate(value)}
                            min={1}
                            max={30}
                            step={0.1}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `${value}%`}
                            sx={{ mt: 2 }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography gutterBottom>Loan Term (Years)</Typography>
                        <TextField
                            fullWidth
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                            type="number"
                            InputProps={{
                                endAdornment: 'Years',
                            }}
                        />
                        <Slider
                            value={loanTerm}
                            onChange={(_, value) => setLoanTerm(value)}
                            min={1}
                            max={30}
                            step={1}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `${value} Years`}
                            sx={{ mt: 2 }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography gutterBottom>Payment Frequency</Typography>
                        <TextField
                            select
                            fullWidth
                            value={paymentFrequency}
                            onChange={(e) => setPaymentFrequency(Number(e.target.value))}
                        >
                            {frequencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
