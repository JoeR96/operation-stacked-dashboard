/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useApiStatus } from "./useApiStatus";
import { PENDING, SUCCESS, ERROR } from "../apiStatus";

export function useApi(
    fn: (...args: any[]) => Promise<any>,
    config: { initialData?: any } = {}
): any {
    const { initialData } = config;
    const [data, setData] = useState<any>(initialData);
    const [error, setError] = useState<any>(null);
    const { apiStatus, setApiStatus, ...normalisedStatuses } = useApiStatus();

    const exec = async (...args: any[]) => {
    try {
        setError(null)
        setApiStatus(PENDING)
        const data = await fn(...args)
        setData(data)
        setApiStatus(SUCCESS)
        return {
            data,
            error: null
        }
    } catch (error) {
        setError(error)
        setApiStatus(ERROR)
        return {
            error,
            data:null
        }
    }
}
    return {
        data,
        setData,
        apiStatus,
        setApiStatus,
        error,
        exec,
        normalisedStatuses
    }
}