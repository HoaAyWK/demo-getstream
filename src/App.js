import React from 'react';
import { BrowserRouter } from 'react-router-dom';


import { SocketProvider } from './contexts/SocketContext';
import './App.css';
import SearchList from './views/SearchList';
import JobItemsLayer from './views/JobItemsLayer';
import ProfileUser from './views/ProfileUser';
import ManageForCustomer from './views/ManageForCustomer';
import Router from './routes';
import './assets/sass/main.scss'

function App() {
    return (
      <SocketProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </SocketProvider>
    );
}

export default App;
