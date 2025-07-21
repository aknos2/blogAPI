import './header.css'
import corgiHeader from '/assets/corgi/corgi-header.webp';

function Header({ onMenuToggle, menuBtnRef }) {
  return (
    <header className="header-container">
      <div className="top-section">
        <img className="corgi-header-img" src={corgiHeader} alt="corgi face" />
        <div className="header-title">
          <h1>Doggo</h1>
          <h1>Diary</h1>
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <button 
              onClick={onMenuToggle} 
              className='menu-toggle-btn'
              ref={menuBtnRef}
              >☰ Menu
            </button>
          </li>
          <div className="right-side-nav">
            <li><a href="#">Diary</a></li>
            <li><a href="#">About</a></li>
          </div>
        </ul>
      </nav>
    </header>
  );
}


export default Header;