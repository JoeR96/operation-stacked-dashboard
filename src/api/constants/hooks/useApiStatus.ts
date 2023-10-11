/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';
import { IDLE, defaultStatuses } from '../apiStatus';

const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

const prepareStatuses = (currentStatus: string): any => {
    const statuses: Record<string, boolean> = {};

    for (const status of defaultStatuses){
        const normalisedStatus = capitalize(status.toLowerCase());
        const normalisedStatusKey = `is${normalisedStatus}`;
        statuses[normalisedStatusKey] = status === currentStatus;
    }

    return statuses;
}

export const useApiStatus = (currentStatus: string = IDLE) => {
    const [apiStatus, setApiStatus] = useState<string>(currentStatus);
    const statuses = useMemo(() => prepareStatuses(apiStatus), [apiStatus]);

    return {
        apiStatus,
        setApiStatus,
        ...statuses
    }
}
