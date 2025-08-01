import { useEffect, useState } from 'react';
import './messageBoard.css';
import profileImg from '/assets/corgi/profile/white-cat-icon.png'
import { CloseIcon, SendMsgIcon } from '../Icons';
import Button from '../Button';
import { createComment, fetchCommentsByPostId } from '../../../api/posts';

function MessageBoard({isChatOpen, headerPosition, onToggleChat, postId }) {
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadComments() {
      try {
        const res = await fetchCommentsByPostId(postId);
        console.log('Post comments response:', res.data);
        setComments(res.data);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      } finally {
        setLoading(false);
      }
    }
    if (postId) {
      loadComments();
    }
  }, [postId]);
 
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (message.trim() === '') return;
    
    try {
      const res = await createComment(message, postId);
      setComments(prev => [...prev, res.data]);
      setMessage('')
    } catch(err) {
      console.error('Failed to send comment:', err);
      alert('Failed to send message');
    }
  };

  useEffect(() => {
    const container = document.querySelector('.message-board-container');
    if (container) container.scrollTop = container.scrollHeight;
  }, [comments]);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Position the message board right below the header on the right side
  const style = {
    position: 'fixed',
    top: `${headerPosition.top}px`,
    right: '0', // Keep some margin from the right edge
    zIndex: 998,
  };

  return (
  <div
    className={`message-board-container ${isChatOpen ? 'slide-in-chat' : 'slide-out-chat'}`}
    style={style}
  >
    <Button
      onClick={onToggleChat}
      ariaLabel="Close chat"
      className="close-chat-btn"
      text={<CloseIcon className={'close-icon'} />}
    />

    {loading ? (
      <div className='no-comments'>Loading...</div>
    ) : comments.length === 0 ? (
      <div className='no-comments'>
        <p>No comments yet.</p> 
        <p>Be the first to post a comment.</p>
      </div>
    ) : (
      comments.map((comment) => (
        <div key={comment.id} className="message-wrap">
          <img src={profileImg} alt="user icon" />
          <div>
            <div className="upper-part">
              <p className="username">{comment.user?.username || 'Anonymous'}</p>
              <p className="message">{comment.content}</p>
            </div>
            <div className="lower-part">
              <p className="date">{formatDate(comment.createdAt)}</p>
            </div>
          </div>
        </div>
      ))
    )}

    <div className="message-input">
      <textarea
        value={message}
        onChange={handleChange}
        placeholder="Message..."
        rows={1}
      />

      <Button
        onClick={handleSend}
        ariaLabel="Send message"
        text={<SendMsgIcon className={'send-msg-icon'} />}
      />
    </div>
  </div>
);

}

export default MessageBoard;