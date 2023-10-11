import React from 'react'
import { useApi } from '../../api/constants/hooks/useApi.ts'
import LoginForm from '../../components/LoginForm/LoginForm.tsx'

const LoginPage = () => {

    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data: any,
        exec: login,
        isPending,
        isIdle,
        isError,
        isSuccess,
    } = useApi(() => login())


return (
    <>
        {isIdle && <LoginForm />}
        {isPending && <p>Loading Data</p>}
        {isError && <p> There is aids</p>}
        {isSuccess && console.log('console boobs')} 
    </>
)
}

export default LoginPage