import { useContext, useEffect, useState } from "react";
import { ChatAction, ChatContext, ChatState } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import Message from "./Message";

import "../styles/Messages.css"

const Messages = () => {
    const [messages, setMessages] =  useState([] as any[]);
    const { data } = useContext(ChatContext) as { data: ChatState; dispatch: React.Dispatch<ChatAction> };

    useEffect(() => {
        const unsubscribe = onSnapshot((doc(db, "chats", data.chatId)), (doc) => {
            doc.exists() && setMessages(doc.data()?.messages)
        });
        return () => {
            unsubscribe();
        }
    }, [data.chatId]);

    return (
        <div className="messages">
            {messages.map((message, index) => (
                <Message message={message} key={index}/>
            ))}
        </div>
    )
}

export default Messages