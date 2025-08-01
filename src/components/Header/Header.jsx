import './header.css'
import { Link } from 'react-router-dom';
import corgiHeader from '/assets/corgi/corgi-header.webp';
import Button from '../Button';

function Header({ onMenuToggle, menuBtnRef, headerRef }) {
  return (
    <header className="header-container" ref={headerRef}>
      <div className="top-section">
        <img className="corgi-header-img" src={corgiHeader} alt="corgi face" />
        <div className="header-title">
        <Link to="/">
          <h1>Doggo</h1>
        </Link>
        <Link to="/">
          <h1>Diary</h1>
        </Link>
        </div>
      </div>

      <nav>
        <ul>
          <div className="left-side-nav">
            <li>
              <button 
                onClick={onMenuToggle} 
                className='menu-toggle-btn'
                ref={menuBtnRef}
                >☰ Menu
              </button>
            </li>
            <li>
              <Button className='theme-btn' text="Theme"/>
            </li>
          </div>
          <div className="right-side-nav">
            <li><Link to="library">Articles</Link></li>
            <li><Link to="about">About</Link></li>
          </div>
        </ul>
      </nav>
    </header>
  );
}


export default Header;