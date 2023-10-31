import React from 'react';
import './MyChatting.css';

interface Chat {
    id: number;
    roomId: string;
    fromId: number;
    toId: number;
    profileImg: string;
    content: string;
    createdAt: string;
}

const MyChatting = (props: Chat) => {
    return (
        <div className="my_chatting_div">
            <p id='my_chatting_date'>{props.createdAt}</p>
            <div className='my_chatting_wrapper'>
                <p id='my_chatting_content'>{props.content}</p>
            </div>
        </div>
    );
};

export default MyChatting;