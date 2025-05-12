import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null, errorInfo: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });
        // You can also log the error to an error reporting service here
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container maxWidth="sm">
                    <Box sx={{ mt: 8 }}>
                        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="h4" gutterBottom color="error">
                                Oops! Something went wrong
                            </Typography>
                            <Typography color="text.secondary" paragraph>
                                We're sorry for the inconvenience. Please try refreshing the page or go back to the dashboard.
                            </Typography>
                            <Box sx={{ mt: 4 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => window.location.reload()}
                                    sx={{ mr: 2 }}
                                >
                                    Refresh Page
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => window.location.href = '/dashboard'}
                                >
                                    Go to Dashboard
                                </Button>
                            </Box>
                            {process.env.NODE_ENV === 'development' && (
                                <Box sx={{ mt: 4, textAlign: 'left' }}>
                                    <Typography variant="h6" color="error" gutterBottom>
                                        Error Details:
                                    </Typography>
                                    <pre style={{ 
                                        overflow: 'auto', 
                                        padding: '1rem',
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: '4px'
                                    }}>
                                        {this.state.error?.toString()}
                                        {'\n'}
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </Box>
                            )}
                        </Paper>
                    </Box>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
