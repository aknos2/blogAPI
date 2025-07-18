import './messageBoard.css';
import profileImg from '/assets/corgi/profile/white-cat-icon.png'

function MessageBoard() {
  return(
    <div className='message-board-container'>
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

    </div>
  )
}

export default MessageBoard;