import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import LoanPieChart from './LoanPieChart';
import LoanLineChart from './LoanLineChart';

export default function LoanResults({
    emi,
    totalPayment,
    totalInterest,
    loanAmount,
    amortizationSchedule
}) {
    const handleDownloadCSV = () => {
        const headers = ['Month', 'EMI', 'Principal', 'Interest', 'Remaining Principal'];
        const csvData = amortizationSchedule.map((row, index) => [
            index + 1,
            row.emi,
            row.principal,
            row.interest,
            row.remainingPrincipal
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'amortization_schedule.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Monthly EMI</Typography>
                            <Typography variant="h4" color="primary">
                                ₹{emi.toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Total Payment</Typography>
                            <Typography variant="h4" color="primary">
                                ₹{totalPayment.toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Total Interest</Typography>
                            <Typography variant="h4" color="secondary">
                                ₹{totalInterest.toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Payment Breakdown</Typography>
                            <LoanPieChart
                                principal={loanAmount}
                                totalInterest={totalInterest}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Payment Timeline</Typography>
                            <LoanLineChart amortizationSchedule={amortizationSchedule} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">Amortization Schedule</Typography>
                                <Button
                                    variant="outlined"
                                    startIcon={<DownloadIcon />}
                                    onClick={handleDownloadCSV}
                                >
                                    Download CSV
                                </Button>
                            </Box>
                            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Month</TableCell>
                                            <TableCell align="right">EMI</TableCell>
                                            <TableCell align="right">Principal</TableCell>
                                            <TableCell align="right">Interest</TableCell>
                                            <TableCell align="right">Balance</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {amortizationSchedule.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell align="right">
                                                    ₹{row.emi.toLocaleString()}
                                                </TableCell>
                                                <TableCell align="right">
                                                    ₹{row.principal.toLocaleString()}
                                                </TableCell>
                                                <TableCell align="right">
                                                    ₹{row.interest.toLocaleString()}
                                                </TableCell>
                                                <TableCell align="right">
                                                    ₹{row.remainingPrincipal.toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
