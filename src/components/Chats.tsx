const toast = "https://nationaltoday.com/wp-content/uploads/2022/10/456841000-min.jpg"

const Chats = () => {
    return (
        <div className="chats">
            <div className="userChat">
                <img className="img" src={toast} />
                <div className="userChatInfo">
                    <span>Toast</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img className="img" src={toast} />
                <div className="userChatInfo">
                    <span>Toast</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img className="img" src={toast} />
                <div className="userChatInfo">
                    <span>Toast</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    )
}

export default Chats