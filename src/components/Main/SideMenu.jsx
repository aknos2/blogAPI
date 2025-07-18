import './sideMenu.css'
import profileImg from '/assets/corgi/profile/white-cat-icon.png'

function SideMenu() {
  return (
    <div className="side-menu-container">
      <div className="profile">
        <h3>Profile</h3>
        <img src={profileImg} alt="User avatar" />
        <div className="stats">
          <p>1 Comment</p>
          <p>2 Likes</p>
        </div>
      </div>

      <div className="categories-menu">
        <div className="search">
          <label htmlFor="category">Search</label>
          <input type="search" id="category" name="category" placeholder="Search categories..." />
        </div>
        <nav className="nav-links">
          <a href="#">Categories</a>
          <a href="#">Log out</a>
        </nav>
      </div>
    </div>
  );
}


export default SideMenu;