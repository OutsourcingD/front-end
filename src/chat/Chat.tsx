import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../bottom/Footer";
import "./Chat.css";
import * as StompJs from "@stomp/stompjs";
import MyChatting from "../components/MyChatting";
import OtherChatting from "../components/OtherChatting";

interface Chat {
    id: number;
    roomId: string;
    fromId: number;
    toId: number;
    profileImg: string;
    content: string;
    createdAt: string;
}

interface Room {
    roomId: string;
    content: string;
    createdAt: string;
    profileImg: string;
    nickname: string;
    memberId: string;
}

function Chatting() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const [nickname, setNickname] = React.useState<string>("");
    const [profile, setProfile] = React.useState<string>("");
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 1];
    const [roomId, setRoomId] = React.useState<string>("1");
    const [client, setClient] = React.useState<StompJs.Client | null>(null);
    const [chats, setChatList] = React.useState<Chat[]>([]);
    const [chat, setChat] = React.useState<string>("");
    const [subscription, setSubscription] = React.useState<StompJs.StompSubscription | null>(null);
    const [rooms, setRooms] = React.useState<Room[]>([]);

    const [destinationNickname, setDestinationNickname] = React.useState<string>("");
    const [destinationId, setDestinationId] = React.useState<number>(0);
    const [destinationProfile, setDestinationProfile] = React.useState<string>("");

    const getRoom = () => {
        axios({
            method: "get",
            url: `/api/member-chat/room`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setRooms(res.data);
        }).catch((err) => {
            console.log(err.status);
        })
    };

    const connect = () => {
        // 소켓 연결
        try {
            const clientdata = new StompJs.Client({
                brokerURL: `/api/chat`,
                debug: function (str) {
                    console.log("debug: ", str);
                },
                reconnectDelay: 5000, // 자동 재 연결
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });

            // 구독
            clientdata.onConnect = function () {
                console.log("connect success");
                clientdata.subscribe("/topic/" + roomId, callback);
            };

            clientdata.activate(); // 클라이언트 활성화
            setClient(clientdata); // 클라이언트 갱신
        } catch (err) {
            console.log("client 갱신 오류: ", err);
        }
    };

    const disConnect = () => {
        // 연결 끊기
        if (client === null) {
            return;
        }
        client.deactivate();
    };

    const subscribe = (id: string) => {
        if (subscription) {
            subscription.unsubscribe();
        }
    
        const newSubscription = client?.subscribe("/topic/" + id, callback);

        if(newSubscription)
            setSubscription(newSubscription);
    
        if (newSubscription) {
            console.log(`Subscription to /topic/${roomId} was successful!`);
        } else {
            console.log(`Subscription to /topic/${roomId} failed.`);
        }
    }

    // 콜백함수 => ChatList 저장하기
    const callback = function (message: StompJs.IMessage) {
        if (message.body) {
            let msg = JSON.parse(message.body);
            console.log("from: ", msg.fromId);
            console.log("my: ", localStorage.getItem("member_id"));
            setChatList((chats) => [...chats, msg]);
        }
    };

    const sendChat = () => {
        if (chat === "") {
            return;
        }

        client?.publish({
            destination: "/app/message",
            body: JSON.stringify({
                roomId: roomId,
                fromId: localStorage.getItem("member_id"),
                toId: localStorage.getItem("member_id"),
                profileImg: profile,
                content: chat,
            }),
        });

        setChat("");
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendChat();
    }

    const selectRoom = (room: Room) => {
        setRoomId(() => room.roomId);

        setDestinationId(() => parseInt(room.memberId));
        setDestinationNickname(() => room.nickname);
        setDestinationProfile(() => room.profileImg);

        subscribe(roomId);
    }

    React.useEffect(() => {
        setChatList([]);
        console.log(roomId)
    }, [roomId]);

    React.useEffect(() => {
        const memberId = queryParams.get("memberId");

        axios({
            method: "get",
            url: `/api/member/info`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((res) => {
                localStorage.setItem("member_id", res.data.memberId);
                setNickname(res.data.nickname);
                setProfile(res.data.profile);

                if (queryParams.get("memberId") != res.data.memberId) {
                    navigate("/notfound");
                }
            })
            .catch((err) => {
                console.log(err.status);
            });

        connect();

        getRoom();

        return () => {
            disConnect();
        };
    }, []);

    return (
        <div className="chatting_div">
            <div className="chatting_wrapper">
                <div className="chatting_page_header">
                    <img src={profile} alt="" id="chatting_page_profile" />
                    <p id="chatting_page_nickname">{nickname}</p>
                    <p id="chatting_room_text">Chatting Room</p>
                </div>
                <div className="chatting_container">
                    <div className="chatting_left_div">
                        {rooms.map((item, index) => {
                            return (
                                <div
                                    className="chatting_left_item_div"
                                    key={index}
                                    onClick={() => selectRoom(item)}
                                >
                                    <img
                                        src={item.profileImg}
                                        alt=""
                                        id="chatting_left_item_profile"
                                    />
                                    <div className="chatting_info_div">
                                        <p id="chatting_left_item_nickname">
                                            {item.nickname}
                                        </p>
                                        <p id="chatting_left_item_content">
                                            {item.content}
                                        </p>
                                    </div>
                                    <div className="chatting_day_div">
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {subscription !== null ? (
                        <div className="chatting_right_div">
                            <div className="chatting_right_header">
                                <img
                                    src={destinationProfile}
                                    alt=""
                                    id="chatting_left_item_profile"
                                />
                                <p id="chatting_right_item_nickname">
                                    {destinationNickname}
                                </p>
                                <img
                                    src="/trash.png"
                                    alt=""
                                    id="chatting_right_item_trash"
                                />
                            </div>
                            <div className="chat_body">
                                {
                                    chats.map((item, index) => {
                                        return (
                                                item.fromId.toString() == localStorage.getItem("member_id") ? 
                                                <MyChatting key={index} {...item} />
                                                : <OtherChatting key={index} {...item} />
                                            
                                        )
                                    })
                                }
                            </div>
                            <div className="chatting_bottom_div">
                                <div className="chatting_bottom_left_div">
                                    <img
                                        src="/chatting_camera.png"
                                        alt=""
                                        id="chatting_camera"
                                    />
                                    <form
                                        id="chatting_form"
                                        onSubmit={onSubmit}
                                    >
                                        <input
                                            type="text"
                                            id="chatting_input"
                                            placeholder="Input message."
                                            value={chat}
                                            onChange={(e) => setChat(e.target.value)}
                                        />
                                    </form>
                                </div>
                                <img
                                    src="/Send.png"
                                    alt=""
                                    id="chatting_send"
                                    onClick={sendChat}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Chatting;
