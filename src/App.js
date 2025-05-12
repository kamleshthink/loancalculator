import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import theme from './theme/theme';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';

// Pages and Components
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import AuthTest from './components/AuthTest';
import LoanCalculator from './components/LoanCalculator';
import EMICalculator from './components/EMICalculator';
import HousingLoanCalculator from './components/HousingLoanCalculator';
import MutualFundCalculator from './components/MutualFundCalculator';

function App() {
    const [toast, setToast] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const handleToast = (message, severity = 'info') => {
        setToast({
            open: true,
            message,
            severity
        });
    };

    const handleCloseToast = () => {
        setToast(prev => ({ ...prev, open: false }));
    };

    return (
        <ErrorBoundary>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<Login onToast={handleToast} />} />
                            <Route path="/signup" element={<Signup onToast={handleToast} />} />
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <AuthTest />
                                </ProtectedRoute>
                            } />
                            <Route path="/home-loan" element={
                                <ProtectedRoute>
                                    <HousingLoanCalculator />
                                </ProtectedRoute>
                            } />
                            <Route path="/car-loan" element={
                                <ProtectedRoute>
                                    <LoanCalculator type="car" />
                                </ProtectedRoute>
                            } />
                            <Route path="/education-loan" element={
                                <ProtectedRoute>
                                    <LoanCalculator type="education" />
                                </ProtectedRoute>
                            } />
                            <Route path="/business-loan" element={
                                <ProtectedRoute>
                                    <LoanCalculator type="business" />
                                </ProtectedRoute>
                            } />
                            <Route path="/personal-loan" element={
                                <ProtectedRoute>
                                    <LoanCalculator type="personal" />
                                </ProtectedRoute>
                            } />
                            <Route path="/emi-calculator" element={
                                <ProtectedRoute>
                                    <EMICalculator />
                                </ProtectedRoute>
                            } />
                            
                            {/* Protected Routes */}
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard onToast={handleToast} />
                                </ProtectedRoute>
                            } />
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile onToast={handleToast} />
                                </ProtectedRoute>
                            } />
                            <Route path="/loan-calculator" element={
                                <ProtectedRoute>
                                    <LoanCalculator onToast={handleToast} />
                                </ProtectedRoute>
                            } />
                            <Route path="/emi-calculator" element={
                                <ProtectedRoute>
                                    <EMICalculator onToast={handleToast} />
                                </ProtectedRoute>
                            } />
                            <Route path="/housing-loan-calculator" element={
                                <ProtectedRoute>
                                    <HousingLoanCalculator onToast={handleToast} />
                                </ProtectedRoute>
                            } />
                            <Route path="/mutual-fund-calculator" element={
                                <ProtectedRoute>
                                    <MutualFundCalculator onToast={handleToast} />
                                </ProtectedRoute>
                            } />

                            {/* Fallback route */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>

                        <Toast
                            open={toast.open}
                            message={toast.message}
                            severity={toast.severity}
                            onClose={handleCloseToast}
                        />
                    </Router>
                </AuthProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default App;
