import React from 'react';
import './OtherChatting.css';

interface Chat {
    id: number;
    roomId: string;
    fromId: number;
    toId: number;
    profileImg: string;
    content: string;
    createdAt: string;
}

const OtherChatting = (props: Chat) => {
    const [time, setTime] = React.useState<string>("");

    React.useEffect(() => {
        const dateTimeStr = '2023-10-31T22:59:29';
        const dateTime = new Date(dateTimeStr);
        const timeStr = dateTime.toLocaleTimeString('en-US', { hour12: false });
        setTime(timeStr);
    }, [props]);

    return (
        <div className="other_chatting_div">
            <div className='other_chatting_profile'>
                <img src={props.profileImg} alt="profile" id='other_chatting_profile_img' />
            </div>
            <div className='other_chatting_wrapper'>
                <p id='other_chatting_content'>{props.content + "other"}</p>
            </div>
            <p id='other_chatting_date'>{time}</p>
        </div>
    );
};

export default OtherChatting;