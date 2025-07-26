import { useState } from 'react';
import './messageBoard.css';
import profileImg from '/assets/corgi/profile/white-cat-icon.png'
import { CloseIcon, SendMsgIcon } from '../Icons';
import Button from '../Button';

function MessageBoard({isChatOpen, headerPosition, onToggleChat }) {
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

  // Position the message board right below the header on the right side
  const style = {
    position: 'fixed',
    top: `${headerPosition.top}px`,
    right: '0', // Keep some margin from the right edge
    zIndex: 998,
  };

  return(
    <div className={`message-board-container ${isChatOpen ? 'slide-in-chat' : 'slide-out-chat'}`} style={style}>
        <Button onClick={onToggleChat} 
                ariaLabel='Close chat'
                className='close-chat-btn'
                text={<CloseIcon className={'close-icon'} />}
                />
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

        <Button onClick={handleSend} 
                ariaLabel='Send message'
                text={<SendMsgIcon className={'send-msg-icon'} />}
                />
      </div>
    </div>
  )
}

export default MessageBoard;