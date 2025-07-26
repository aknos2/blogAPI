import { articles } from '../../services/articles';
import { CommentsIcon, HeartIcon } from '../Icons';
import './library.css';

function Library() {
  return (
    <div className='library-container'>
      <div className='library-content'>
        <div className='search-menu'>
          <div className="search">
            <label htmlFor="category">Search</label>
            <input type="search" id="category" name="category" placeholder="Search categories..." />
          </div>
          <nav className="nav-links">
            <a href="#">NEW POSTS</a>
            <a href="#">DATE</a>
            <a href="#">CATEGORIES</a>
          </nav>
        </div>
        
          <div className='articles-compilation'>
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <figure className="article-card" key={index}>
                  <img src={article.thumbnail} alt="Article thumbnail" />
                  <figcaption>
                    <h3 className='card-date'>{article.date}</h3>
                    <div className='card-stats'>
                      <div className='stats-wrap'><HeartIcon/> <p>3</p></div>
                      <div className='stats-wrap'><CommentsIcon/> <p>20</p></div>
                    </div>
                    {/* ✅ Only show this extra text on the first article */}
                     {index === 0 && <h2 className="month-title">August</h2>}
                  </figcaption>
                </figure>
              ))
            ) : (
              <p>No articles found</p>
            )}
          </div>
      </div>
    </div>
  )
}

export default Library;
