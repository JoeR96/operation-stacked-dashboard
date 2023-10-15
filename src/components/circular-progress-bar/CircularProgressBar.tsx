// CircularProgressBar.tsx
import React from 'react';

interface Props {
    value: number;    // Current value
    maxValue: number; // Max value
    title: string;    // Title to display in the center
    size?: number;    // Size of the circle
    strokeWidth?: number;  // Width of the circle stroke
}

const CircularProgressBar: React.FC<Props> = ({ value, maxValue, title, size = 100, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - ((value / maxValue) * circumference);

    return (
        <svg width={size} height={size}>
            <circle
                stroke="gray"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                stroke="blue"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="black">{title}</text>
        </svg>
    );
};

export default CircularProgressBar;
