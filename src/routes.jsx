import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './views/Layout';
import Home from './views/Home';
import SearchList from './views/SearchList';
import ManageForCustomer from './views/ManageForCustomer';
import ProtectedChat from './views/ProtectedChat';
import ChatPage from './views/ChatPage';

const Router = () => {

    return (useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '/', element: <Home />},
                { path: 'search', element: <SearchList />},
                { path: 'manage', element: <ManageForCustomer />},
                { path: 'chat', element: <ChatPage />}
            ],
        },
    ]));
}

export default Router;
