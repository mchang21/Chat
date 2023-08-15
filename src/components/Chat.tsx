import "../styles/Chat.css";
import "../styles/Chats.css";

import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>Toast</span>
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