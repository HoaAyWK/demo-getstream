import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { StreamChat } from 'stream-chat';

import Header from '../components/layer/Header';
import Footer from '../components/layer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from '../store/entities/auth';
import socket from '../socket/socket';
import useLocalStorage from '../hooks/useLocalStorage';
import { Chat } from 'stream-chat-react';

const RootStyle = styled('div')({
    minHeight: '100%',
    overflow: 'hidden'
});

const API_KEY = process.env.REACT_APP_STREAM_API_KEY;

const userToken = JSON.parse(localStorage.getItem('streamToken'));
const streamUser = JSON.parse(localStorage.getItem('user'));

const client = StreamChat.getInstance(API_KEY);

if (userToken && streamUser) {
    const { id, email, role } = streamUser;
    const userData = { id, email };

    if (role === 'Employer') {
        userData.name = streamUser.employer.companyName;
    } else {
        userData.name = streamUser.freelancer.firstName + " " + streamUser.freelancer.lastName;
    }

    client.connectUser(userData, userToken);
};

const Layout = () => {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const [sessionId] = useLocalStorage('sessionId', null);
    const { user } = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [unreadStreamMessages, setUnreadStreamMessages] = useState(0);

    useEffect(() => {
        if (!user && token) {
            dispatch(getCurrentUser());
        }
    }, [token, user]);

    useEffect(() => {
        if (user) {
            if (sessionId) {
                socket.auth = { sessionId };
                socket.connect();                
            } else {
                socket.auth = { userId: user.id };
                socket.connect();

                socket.on("session", ({ sessionId, socketId }) => {
                    console.log("listen session event")
                    socket.auth = { sessionId };
                    localStorage.setItem('sessionId', JSON.stringify(sessionId));
                    socket.socketId = socketId;
                });
            }

            socket.on('notifications', ({ notifications, newMessages }) => {
                console.log('listen on notifications')
                setNotifications(notifications);
                console.log(newMessages);
                setUnreadMessages(newMessages);
                console.log(notifications);
            });

            socket.on('apply job', (message) => {
                console.log('listen on apply job')
                setUnreadMessages(prev => prev + 1);
                setNotifications(prev => [...prev, message]);
            });

            socket.on("connect_error", (err) => {
                if (err.message === "invalid userId") {
                    console.log("Your are not logged in")
                }
            });

            return () => {
                socket.off("session");
                socket.off("notifications");
                socket.off("apply job");
                socket.off("read");
                socket.off("connect_error");
            }
        }

    }, [user, sessionId]);

    const handleReadMessages = () => {
        setUnreadMessages(0);
        setNotifications(prev => prev.map((notification) => ({ ...notification, isRead: true })));
    };

    if (client) {
        client.on(event => {
            if (event.unread_channels !== undefined) {
                setUnreadStreamMessages(event.unread_channels);
            }
        })
    }

    if (!userToken) {
        return (
            <RootStyle>
                <Header
                    user={user}
                    notifications={notifications}
                    handleRead={handleReadMessages}
                    unreadMessages={unreadMessages}
                />
                <Outlet />
                <Footer />
            </RootStyle>
        )
    }

    return (
        <RootStyle>
            <Chat client={client}>
                <Header
                    user={user}
                    notifications={notifications}
                    handleRead={handleReadMessages}
                    unreadMessages={unreadMessages}
                    unreadStreamMessages={unreadStreamMessages}
                />
                <Outlet />
                <Footer />
            </Chat>
        </RootStyle>
    )
};

export default Layout;