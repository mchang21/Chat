import { ChatAction, ChatContext, ChatState } from "../context/ChatContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Img from "../images/img.svg"
import Attachment from "../images/attachment.svg"

import "../styles/Input.css"

const Input = () => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext) as { data: ChatState; dispatch: React.Dispatch<ChatAction> };
  return (
    <div className="input">
        <input type="text" placeholder="Type something..." />
        <div className="send">
            <img src={Attachment} alt="" />
            <input type="file" id="file" style={{display:"none"}}/>
            <label htmlFor="file">
                <img src={Img} alt="" />
            </label>
            <button>Send</button>
        </div>
    </div>
  )
}

export default Input