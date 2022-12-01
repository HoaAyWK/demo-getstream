import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedChat = () => {
    const userToken = JSON.parse(localStorage.getItem('streamToken'));
    const user = JSON.parse(localStorage.getItem('user'));

    if (!userToken || !user) {
        return <Navigate to='/' />
    }

    return (
        <>
            <Outlet />
        </>
    )
};

export default ProtectedChat;