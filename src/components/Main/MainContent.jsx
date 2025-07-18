import './mainContent.css';
import Article from "./Article";
import SideMenu from "./SideMenu";
import MessageBoard from './MessageBoard';

function MainContent() {
  return (
    <main>
      <SideMenu />
      <Article />
      <MessageBoard />
    </main>
  )
}

export default MainContent;