import React from 'react';
import { Typography } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props {
    value: number;
    maxValue: number;
    title: string;
    strokeWidth?: number;
}

const CircularProgressBar: React.FC<Props> = ({
                                                  value,
                                                  maxValue,
                                                  title,
                                                  strokeWidth = 10
                                              }) => {
    return (
        <div style={{ width: '75%', height: '75%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white', letterSpacing: '1px', marginBottom: '10px' }}>{title}</Typography>
            <CircularProgressbar
                value={(value / maxValue) * 100}
                text={`${value}/${maxValue}`}
                styles={buildStyles({
                    textSize: '40px',
                    textColor: 'white',
                    pathColor: 'white',
                    trailColor: 'black',
                    strokeLinecap: 'round',
                    pathTransitionDuration: 0.5,
                    strokeWidth: strokeWidth
                })}
            />
        </div>
    );
};

export default CircularProgressBar;
