import { useContext, useState } from "react";
import { ChatAction, ChatContext, ChatState } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

import Img from "../images/img.svg"
// import Attachment from "../images/attachment.svg"

import "../styles/Input.css"

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState<File | null>(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext) as { data: ChatState; dispatch: React.Dispatch<ChatAction> };

    // handle key press search
    const handleKey = (e: { code: string; }) => {
        e.code === "Enter" && handleSend();
    };

    const handleSend = async () => {

        if (img) {
            // upload image with text
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                "state_changed",
                null,
                // error observer
                (error) => {
                    console.log(error);
                },
                // completion observer
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser?.uid,
                                date: Timestamp.now(),
                                img: downloadURL
                            })
                        });
                    });
                }
            );

        } else {
            // upload text
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: text,
                    senderId: currentUser?.uid,
                    date: Timestamp.now()
                })
            });
        }

        await updateDoc(doc(db, "userChats", currentUser!.uid), {
            [data.chatId + ".lastMessage"]: {
                text: text,
            },
            [data.chatId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text: text,
            },
            [data.chatId + ".date"]: serverTimestamp()
        });

        setText("");
        setImg(null);

    }

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => { setText(e.target.value) }}
                onKeyDown={handleKey}
                value={text} />
            <div className="send">
                {/* <img src={Attachment} alt="" /> */}
                <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={(e) => { setImg(e.target.files ? e.target.files[0] : null) }} />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input