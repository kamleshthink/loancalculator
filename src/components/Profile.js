import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Avatar,
    Button,
    Grid,
    TextField,
    Divider,
    Alert,
    CircularProgress,
    Card,
    CardContent,
    Switch,
    FormControlLabel
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import LoadingSpinner from './LoadingSpinner';

export default function Profile({ onToast }) {
    const { currentUser, signout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userPreferences, setUserPreferences] = useState({
        darkMode: false,
        emailNotifications: true,
        currency: 'INR',
        language: 'en'
    });

    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const loadUserData = async () => {
            if (currentUser) {
                setFormData(prev => ({
                    ...prev,
                    displayName: currentUser.displayName || '',
                    email: currentUser.email || ''
                }));

                // Load user preferences from Firestore
                try {
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    if (userDoc.exists()) {
                        setUserPreferences(prev => ({
                            ...prev,
                            ...userDoc.data().preferences
                        }));
                    }
                } catch (error) {
                    console.error('Error loading user preferences:', error);
                }
            }
        };

        loadUserData();
    }, [currentUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePreferenceChange = async (name, value) => {
        try {
            setUserPreferences(prev => ({
                ...prev,
                [name]: value
            }));

            // Save to Firestore
            await setDoc(doc(db, 'users', currentUser.uid), {
                preferences: {
                    ...userPreferences,
                    [name]: value
                }
            }, { merge: true });

            onToast('Preferences updated successfully', 'success');
        } catch (error) {
            console.error('Error updating preferences:', error);
            onToast('Failed to update preferences', 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Update display name if changed
            if (formData.displayName !== currentUser.displayName) {
                await updateProfile(currentUser, {
                    displayName: formData.displayName
                });
            }

            // Update email if changed
            if (formData.email !== currentUser.email) {
                await updateEmail(currentUser, formData.email);
            }

            // Update password if provided
            if (formData.newPassword) {
                if (formData.newPassword !== formData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                await updatePassword(currentUser, formData.newPassword);
                // Sign out user after password change
                await signout();
                navigate('/login');
                return;
            }

            onToast('Profile updated successfully', 'success');
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.message);
            onToast('Failed to update profile', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) {
        return <LoadingSpinner />;
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Profile Settings
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Avatar
                                    src={currentUser.photoURL}
                                    alt={currentUser.displayName}
                                    sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                                />
                                <Typography variant="h6">
                                    {currentUser.displayName || 'User'}
                                </Typography>
                                <Typography color="text.secondary">
                                    {currentUser.email}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3 }}>
                            <form onSubmit={handleSubmit}>
                                <Typography variant="h6" gutterBottom>
                                    Personal Information
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Display Name"
                                            name="displayName"
                                            value={formData.displayName}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                        />
                                    </Grid>
                                </Grid>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="h6" gutterBottom>
                                    Change Password
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="New Password"
                                            name="newPassword"
                                            type="password"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Confirm New Password"
                                            name="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                        />
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 3 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        sx={{ mr: 2 }}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                                    </Button>
                                </Box>
                            </form>
                        </Paper>

                        <Paper sx={{ p: 3, mt: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Preferences
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={userPreferences.darkMode}
                                                onChange={(e) => handlePreferenceChange('darkMode', e.target.checked)}
                                            />
                                        }
                                        label="Dark Mode"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={userPreferences.emailNotifications}
                                                onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                                            />
                                        }
                                        label="Email Notifications"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Currency"
                                        value={userPreferences.currency}
                                        onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                                        SelectProps={{
                                            native: true
                                        }}
                                    >
                                        <option value="INR">Indian Rupee (₹)</option>
                                        <option value="USD">US Dollar ($)</option>
                                        <option value="EUR">Euro (€)</option>
                                        <option value="GBP">British Pound (£)</option>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Language"
                                        value={userPreferences.language}
                                        onChange={(e) => handlePreferenceChange('language', e.target.value)}
                                        SelectProps={{
                                            native: true
                                        }}
                                    >
                                        <option value="en">English</option>
                                        <option value="hi">Hindi</option>
                                        <option value="bn">Bengali</option>
                                        <option value="te">Telugu</option>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
