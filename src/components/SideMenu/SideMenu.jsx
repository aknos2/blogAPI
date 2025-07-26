import { useEffect, useState } from 'react';
import './sideMenu.css'
import profileImg from '/assets/corgi/profile/white-cat-icon.png'

function SideMenu({isOpen, position}) {
  const [visible, setVisible] = useState(false);

  // delay unmount until after exit animation
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timeOut = setTimeout(() => setVisible(false), 300);// match animation duration
      return () => clearTimeout(timeOut);
    }
  }, [isOpen]);

  if (!visible) return null;

  const style = {
    position: 'absolute',
    top: `${position.top}px`,
    left: `${position.left}px`,
    width: '17rem',
    background: '#f9f9f9',
    boxShadow: '4px 0 8px rgba(0, 0, 0, 0.05)',
    zIndex: 999,
  }

  return (
    <aside style={style} className={`side-menu ${isOpen ? 'slide-in' : 'slide-out'}`}>
      <div >
        <div className="profile">
          <h3>Profile</h3>
          <img src={profileImg} alt="User avatar" />
          <div className="stats">
            <p>1 Comment</p>
            <p>2 Likes</p>
          </div>
        </div>

        <div className="categories-menu">
          <nav className="nav-links">
            <a href="#">Profile</a>
            <a href="#">Create post</a>
            <a href="#">My posts</a>
            <a href="#">Log out</a>
          </nav>
        </div>
      </div>
    </aside>
  );
}


export default SideMenu;