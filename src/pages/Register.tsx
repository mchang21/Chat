import "../styles/Register.css";

const Register = () => {
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Chat</span>
            <span className="title">Register</span>
            <form className="form">
                <input className="input" type="text" placeholder='Username' />
                <input className="input" type="email" placeholder='Email'/>
                <input className="input" type="password" placeholder='Password' />
                {/* <input className="input" type="file" /> */}
                <button className="button">Sign up</button>
            </form>
            <p>You do have an account? Login</p>
        </div>
    </div>
  );
};

export default Register;