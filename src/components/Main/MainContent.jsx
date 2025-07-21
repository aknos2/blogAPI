import './mainContent.css';
import Article from "./Article";
import MessageBoard from './MessageBoard';
import { useState } from 'react';

function MainContent() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
      setIsChatOpen(prev => !prev);
  }

  return (
    <main>
      <div></div>
      <Article onToggleChat={toggleChat} />
      <MessageBoard isChatOpen={isChatOpen}/>
    </main>
  )
}

export default MainContent;