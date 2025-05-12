import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, useTheme } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LoanPieChart({ principal, totalInterest }) {
    const theme = useTheme();

    const data = {
        labels: ['Principal', 'Interest'],
        datasets: [
            {
                data: [principal, totalInterest],
                backgroundColor: [
                    theme.palette.primary.main,
                    theme.palette.secondary.main,
                ],
                borderColor: [
                    theme.palette.primary.dark,
                    theme.palette.secondary.dark,
                ],
                borderWidth: 1,
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
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ₹${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return (
        <Box sx={{ height: 300, width: '100%' }}>
            <Pie data={data} options={options} />
        </Box>
    );
}
