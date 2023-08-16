import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "../styles/Navbar.css"

const toast = "https://nationaltoday.com/wp-content/uploads/2022/10/456841000-min.jpg";

const Navbar = () => {
    return (
        <div className="navbar">
            <span className="logo">Chat</span>
            <div className="user">
                <img src={toast} />
                <span>Melvin</span>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar