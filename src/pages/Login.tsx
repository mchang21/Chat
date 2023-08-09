import "../styles/Register.css";

const Login = () => {
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Chat</span>
            <span className="title">Login</span>
            <form className="form">
                <input className="input" type="email" placeholder='Email'/>
                <input className="input" type="password" placeholder='Password' />
                <button className="button">Login</button>
            </form>
            <p>You don't have an account? Register</p>
        </div>
    </div>
  );
};

export default Login;