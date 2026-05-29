'use client';
import React from 'react';
import { Navigate, Outlet } from 'next/navigation';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    if (userInfo && userInfo.isAdmin) {
        return children ? children : <Outlet />;
    } else {
        return <Navigate to="/signin" replace />;
    }
};

export default AdminRoute;
