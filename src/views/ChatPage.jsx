import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { LoadingIndicator, Chat, useChatContext } from 'stream-chat-react';

import ChannelContainer from '../components/stream/ChannelContainer';
import ChannelListContainer from '../components/stream/ChannelListContainer';

import 'stream-chat-react/dist/css/v2/index.css';
// import { useClient } from '../hooks/useClient';
import './chat-layout.css';

const ChatPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { id, email, role } = user;
    const userData = { id, email };
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if (role === 'Employer') {
        userData.name = user.employer.companyName;
    } else {
        userData.name = user.freelancer.firstName + " " + user.freelancer.lastName;
    } 

    useEffect(() => {
        document.getElementById("header").style.display = 'none';
        document.getElementById("footer").style.display = 'none';

        return () => {
            document.getElementById("header").style.display = 'block';
            document.getElementById("footer").style.display = 'block';
        }
    }, [])

    const filters = { type: 'messaging', members: { $in: [user?.id] } };
    const sort = { last_message_at: -1 };

    return (
        <div className='app__wrapper'>
            <ChannelListContainer
                filters={filters}
                sort={sort}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
            />
            <ChannelContainer
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
            />
        </div>
    )
};

export default ChatPage;