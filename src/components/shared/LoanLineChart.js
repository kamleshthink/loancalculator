import React from 'react';
import { Line } from 'react-chartjs-2';
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
import { Box, useTheme } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LoanLineChart({ amortizationSchedule }) {
    const theme = useTheme();

    const labels = amortizationSchedule.map((_, index) => `Month ${index + 1}`);
    const remainingPrincipal = amortizationSchedule.map(item => item.remainingPrincipal);
    const cumulativeInterest = amortizationSchedule.map(item => item.cumulativeInterest);

    const data = {
        labels,
        datasets: [
            {
                label: 'Remaining Principal',
                data: remainingPrincipal,
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.light,
                tension: 0.4,
            },
            {
                label: 'Cumulative Interest',
                data: cumulativeInterest,
                borderColor: theme.palette.secondary.main,
                backgroundColor: theme.palette.secondary.light,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.raw || 0;
                        return `${label}: ₹${value.toLocaleString()}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `₹${value.toLocaleString()}`,
                },
            },
        },
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Line data={data} options={options} />
        </Box>
    );
}
