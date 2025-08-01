import './mainContent.css';
import Article from "./Article";
import MessageBoard from './MessageBoard';
import { useState } from 'react';
import { useHeader } from '../Header/HeaderContext';

function MainContent() {
  const { headerPosition } = useHeader();  // ✅ use context instead of prop
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  const toggleChat = () => {
      setIsChatOpen(prev => !prev);
  }

  const handlePostChange = (postId) => {
    setCurrentPostId(postId);
  }

  return (
    <main>
      <div></div>
      <Article 
        onToggleChat={toggleChat} 
        onPostChange={handlePostChange}
      />
      <MessageBoard 
        isChatOpen={isChatOpen} 
        headerPosition={headerPosition} 
        onToggleChat={toggleChat}
        postId={currentPostId}
      />
    </main>
  )
}

export default MainContent;