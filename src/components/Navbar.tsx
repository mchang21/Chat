import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

import "../styles/Navbar.css"

const Navbar = () => {

    const {currentUser} = useContext(AuthContext);

    // checks for a current user
    if (!currentUser) {
        return <Navigate to="/login" />
    }

    return (
        <div className="navbar">
            <span className="logo">Chat</span>
            <div className="user">
                <img src={currentUser.photoURL!} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar