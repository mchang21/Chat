import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Chats = () => {

    interface Chat {
        date: Object,
        userInfo: Object
    }

    const [chats, setChats] = useState<any[]>([]);

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const getChats = () => {
            // get chats from database
            const unsubscribe = onSnapshot(doc(db, "userChats", currentUser!.uid), (doc) => {
                setChats(doc.data() as Chat[] || []);
            });

            return () => {
                unsubscribe();
            };
        };

        currentUser!.uid && getChats()
    }, [currentUser!.uid]);

    console.log(Object.entries(chats));

    return (
        <div className="chats">
            {Object.entries(chats)?.map(chat => (
                <div className="userChat" key={chat[0]}>
                    <img className="img" src={chat[1].userInfo.photoURL} />
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].userInfo.lastMessage?.text}</p>
                    </div>
                </div>

            ))};
        </div>
    )
}

export default Chats