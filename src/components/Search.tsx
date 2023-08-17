import React, { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { User } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";

import "../styles/Search.css"

const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState(false);

    const { currentUser } = useContext(AuthContext);

    // handle search input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.value;
        setUsername(name);
    };

    // handle search in database for User
    const handleSearch = async () => {
        // Create a query against the collection.
        const q = query(
            collection(db, "users"),
            where("displayName", "==", username));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data() as User);
            });

        } catch (error) {
            console.log(error);
            setError(true);
        };

    };

    // handle key press search
    const handleKey = (e: { code: string; }) => {
        e.code === "Enter" && handleSearch();
    };

    // handle user selection after search
    const handleSelect = async () => {
        // create combinedId between two users
        const combinedId: string =
            currentUser!.uid > user!.uid
                ? currentUser!.uid + user!.uid
                : user!.uid + currentUser!.uid;
        try {
            // query for chat between currentUser and user
            const res = await getDoc(doc(db, "chats", combinedId));

            // Check if query does not exists
            if (!res.exists()) {
                // create chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                // create user chats
                await updateDoc(doc(db, "userChats", currentUser!.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user!.uid,
                        displayName: user!.displayName,
                        photoURL: user!.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

                // create user chats for complementary user
                await updateDoc(doc(db, "userChats", user!.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser!.uid,
                        displayName: currentUser!.displayName,
                        photoURL: currentUser!.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

            }
        } catch (error) {
            // error
            console.log(error);
        }
        // reset search bar
        setUser(null);
        setUsername("");
    };

    return (
        <div className="search">
            <div className="searchForm">
                <input className="input"
                    type="text"
                    placeholder="Find a user"
                    name="search"
                    onChange={handleChange}
                    onKeyDown={handleKey}
                    value={username} />
            </div>
            {error && <span>User not found.</span>}
            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL!} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search