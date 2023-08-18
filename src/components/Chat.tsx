import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatAction, ChatContext, ChatState } from "../context/ChatContext";

import "../styles/Chat.css";
import "../styles/Chats.css";

const Chat = () => {

    const { data } = useContext(ChatContext) as { data: ChatState; dispatch: React.Dispatch<ChatAction> };

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                {/* Currently unused */}
                {/* <div className="chatIcons">
                </div> */}
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat