import { useState } from 'react';
import './messageBoard.css';
import profileImg from '/assets/corgi/profile/white-cat-icon.png'
import { SendMsgIcon } from '../Icons';

function MessageBoard({isChatOpen}) {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim() === '') return;
    // TODO: Handle sending message logic here
    console.log('Send message:', message);
    setMessage('');
  };

  return(
    <div className={`message-board-container ${isChatOpen ? 'slide-out-chat' : 'slide-in-chat'}`}>
      <div className='message-wrap'>
        <img src={profileImg} alt="user icon" />
        <div>
          <div className='upper-part'>
            <p className='username'>Username</p>
            <p className='message'>Hello, I like this article</p>
          </div>
          <div className='lower-part'>
            <p className='date'>18.Jul.2025</p>
          </div>
        </div>
      </div>

      <div className="message-input">
        <textarea
          value={message}
          onChange={handleChange}
          placeholder="Message..."
          rows={1}
        />
        <button onClick={handleSend} aria-label="Send message">
          <SendMsgIcon className={'send-msg-icon'}/>
        </button>
      </div>
    </div>
  )
}

export default MessageBoard;