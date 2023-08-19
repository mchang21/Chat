import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatAction, ChatContext, ChatState } from "../context/ChatContext";
import { Timestamp } from "firebase/firestore";

import "../styles/Message.css"

interface MessageProps {
    message: {
        date: Timestamp,
        id: string,
        img: string,
        senderId: string,
        text: string,
    };
}

const Message: React.FC<MessageProps> = ({ message }) => {
    console.log("message: ", message);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext) as { data: ChatState; dispatch: React.Dispatch<ChatAction> };

    const userPhotoURL = message.senderId === currentUser?.uid
    ? currentUser?.photoURL
    : data.user.photoURL;
    
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"});
    }, [message]);

    return (
        <div
            ref={ref}
            className={`message ${message.senderId === currentUser?.uid && "owner"}`}>
            <div className="messageInfo">
                {userPhotoURL && <img src={userPhotoURL} alt="" style={{}}/>}
                <span>{ message.date.toDate().toLocaleTimeString() }</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    )
}

export default Message