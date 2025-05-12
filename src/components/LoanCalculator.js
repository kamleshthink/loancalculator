import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Button
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoanForm from './shared/LoanForm';
import LoanResults from './shared/LoanResults';

export default function LoanCalculator() {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [interestRate, setInterestRate] = useState(10);
    const [loanTerm, setLoanTerm] = useState(20);
    const [paymentFrequency, setPaymentFrequency] = useState(12);
    const [anchorEl, setAnchorEl] = useState(null);
    const { currentUser, signout } = useAuth();
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = async () => {
        try {
            await signout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to sign out:', error);
        }
    };

    const calculateLoan = () => {
        const monthlyRate = (interestRate / 100) / paymentFrequency;
        const numberOfPayments = loanTerm * paymentFrequency;
        
        // Calculate EMI
        const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) 
                   / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        
        const totalPayment = emi * numberOfPayments;
        const totalInterest = totalPayment - loanAmount;

        // Generate amortization schedule
        let remainingPrincipal = loanAmount;
        let cumulativeInterest = 0;
        const schedule = [];

        for (let i = 1; i <= numberOfPayments; i++) {
            const interest = remainingPrincipal * monthlyRate;
            const principal = emi - interest;
            remainingPrincipal -= principal;
            cumulativeInterest += interest;

            schedule.push({
                emi: emi,
                principal: principal,
                interest: interest,
                remainingPrincipal: Math.max(0, remainingPrincipal),
                cumulativeInterest: cumulativeInterest
            });
        }

        return {
            emi,
            totalPayment,
            totalInterest,
            schedule
        };
    };

    const loanDetails = calculateLoan();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Loan Calculator
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/dashboard')}>
                        Dashboard
                    </Button>
                    <IconButton
                        size="large"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem disabled>
                            {currentUser?.email}
                        </MenuItem>
                        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Calculate Your Loan
                </Typography>
                
                <LoanForm
                    loanAmount={loanAmount}
                    setLoanAmount={setLoanAmount}
                    interestRate={interestRate}
                    setInterestRate={setInterestRate}
                    loanTerm={loanTerm}
                    setLoanTerm={setLoanTerm}
                    paymentFrequency={paymentFrequency}
                    setPaymentFrequency={setPaymentFrequency}
                    loanType="personal"
                />

                <LoanResults
                    emi={loanDetails.emi}
                    totalPayment={loanDetails.totalPayment}
                    totalInterest={loanDetails.totalInterest}
                    loanAmount={loanAmount}
                    amortizationSchedule={loanDetails.schedule}
                />
            </Container>
        </Box>
    );
}
