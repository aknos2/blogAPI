import './header.css'
import corgiHeader from '/assets/corgi/corgi-header.webp';

function Header() {
  return(
    <header>
      <div className="header logo">
        <img className="corgi-header-img" src={corgiHeader} alt="corgi face" />
        <div className='header title'>
          <h1>Doggo</h1>
          <h1>Diary</h1>
        </div>
      </div>
      <nav>
        <ul>
          <div>
            <li><a href="#">Home</a></li>
          </div>
          <div className='right-side-nav'>
            <li><a href="#">Diary</a></li>
            <li><a href="#">About</a></li>
          </div>
        </ul>
      </nav>
      <hr />
    </header>
  );
}

export default Header;