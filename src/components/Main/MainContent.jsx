import './mainContent.css';
import Article from "./Article";
import MessageBoard from './MessageBoard';
import { useState } from 'react';
import { useHeader } from '../Header/HeaderContext';

function MainContent() {
  const { headerPosition } = useHeader();  // ✅ use context instead of prop
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
      setIsChatOpen(prev => !prev);
  }

  return (
    <main>
      <div></div>
      <Article onToggleChat={toggleChat} />
      <MessageBoard isChatOpen={isChatOpen} headerPosition={headerPosition} onToggleChat={toggleChat}/>
    </main>
  )
}

export default MainContent;