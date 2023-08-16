import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import addPhoto from "../images/addPhoto.svg";

import "../styles/Register.css";

const Register = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const file = form.file.files[0];

        console.log(username, email, password, file);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, username);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                null,
                // error observer
                (error) => {
                    console.log(error);
                    setError(true);
                },
                // completion observer
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        // updates user profile
                        await updateProfile(res.user, {
                            displayName: username,
                            photoURL: downloadURL
                        });

                        // sets `users` doc with new user
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName: username,
                            email: email,
                            photoURL: downloadURL,
                        });

                        // sets `` doc with new chats
                        await setDoc(doc(db, "userChats", res.user.uid), {});

                        // navigate to home
                        navigate("/");
                    });
                }
            );


        } catch (error) {
            setError(true);
        }

    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Chat</span>
                <span className="title">Register</span>
                <form className="form" onSubmit={handleSubmit}>
                    <input className="input" type="text" name="username" placeholder='Username' />
                    <input className="input" type="email" name="email" placeholder='Email' />
                    <input className="input" type="password" name="password" placeholder='Password' />
                    <input style={{ display: "none" }} name="file" type="file" id="file" />
                    <label className="label" htmlFor="file">
                        <img src={addPhoto} alt="" />
                        <span>Add your own avatar!</span>
                    </label>
                    <button className="button">Sign up</button>
                    {error && <span>Something went wrong!</span>}
                </form>
                <p>You do have an account? Login</p>
            </div>
        </div>
    );
};

export default Register;