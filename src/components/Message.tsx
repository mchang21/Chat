import { useContext } from "react";
import "../styles/Message.css"
import { AuthContext } from "../context/AuthContext";
import { ChatAction, ChatContext, ChatState } from "../context/ChatContext";

interface MessageProps {
    message: {
        // Define the properties of the message object
        // For example:
        text: string;
        imageUrl: string;
        timestamp: string;
    };
}

const Message: React.FC<MessageProps> = ({ message }) => {
    console.log("message: ", message);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext) as { data: ChatState; dispatch: React.Dispatch<ChatAction> };

    return (
        <div className="message owner">
            {/* <div className="messageInfo">
                <img
                    src=""
                    alt=""
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>Hello</p>
                <img src="https://nationaltoday.com/wp-content/uploads/2022/10/456841000-min.jpg" alt="" />
            </div> */}
        </div>
    )
}

export default Message