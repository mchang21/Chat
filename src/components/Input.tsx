import "../styles/Input.css"

import Img from "../images/img.svg"
import Attachment from "../images/attachment.svg"

const Input = () => {
  return (
    <div className="input">
        <input type="text" placeholder="Type something..." />
        <div className="send">
            <img src={Attachment} alt="" />
            <input type="file" id="file" style={{display:"none"}}/>
            <label htmlFor="file">
                <img src={Img} alt="" />
            </label>
            <button>Send</button>
        </div>
    </div>
  )
}

export default Input