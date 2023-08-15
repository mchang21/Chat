import "../styles/Message.css"

const Message = () => {
    return (
        <div className="message owner">
            <div className="messageInfo">
                <img 
                    src="https://nationaltoday.com/wp-content/uploads/2022/10/456841000-min.jpg"
                    alt="" 
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>Hello</p>
                <img src="https://nationaltoday.com/wp-content/uploads/2022/10/456841000-min.jpg" alt="" />
            </div>
        </div>
    )
}

export default Message