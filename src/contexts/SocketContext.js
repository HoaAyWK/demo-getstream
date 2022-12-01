import React, { useState, useContext } from 'react';

const SocketContext = React.createContext();
const SocketUpdateContext = React.createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const useSocketUpdate = () => {
    return useContext(SocketUpdateContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    const setupSocket = (sk) => {
        setSocket(sk);
    };

    return (
        <SocketContext.Provider value={socket}>
            <SocketUpdateContext.Provider value={setupSocket}>
                {children}
            </SocketUpdateContext.Provider>
        </SocketContext.Provider>
    )
};

