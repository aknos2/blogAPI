import { useEffect, useState } from 'react';
import './sideMenu.css'
import profileImg from '/assets/corgi/profile/white-cat-icon.png'
import Button from '../Button';
import { Link } from 'react-router-dom';

function SideMenu({isOpen, position, onToggleLogin, onMenuToggle}) {
  const [visible, setVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

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
        {loggedIn ? (
          <div className="profile">
            <h3>Profile</h3>
            <img src={profileImg} alt="User avatar" />
            <div className="stats">
              <p>1 Comment</p>
              <p>2 Likes</p>
            </div>
          </div>
        ) : (
          <div className="profile-demo">
            <h3>Profile</h3>
            <img src={profileImg} alt="User avatar" />
            <div className="stats">
              <p>10 Comments</p>
              <p>7 Likes</p>
            </div>
            <div className='subscribe-msg'>
              <span>Create an account or login to access more options</span>
            </div>
          </div>
        )}

        <div className="categories-menu">
          <nav className="nav-links">
            <p className='not-used'>Profile</p>
            <p className='not-used'>Create post</p>
            <p className='not-used'>My posts</p>
            {loggedIn ? (
              <a href="#">Log out</a>
            ) : (
              <>
                <Link to="signup">
                  <Button onClick={onMenuToggle} className="create-account-btn" text="Create account"/>
                </Link>
                <Button onClick={onToggleLogin} className='login-btn' text="Login"/>
              </>
            )}
          </nav>
        </div>
      </div>
    </aside>
  );
}


export default SideMenu;