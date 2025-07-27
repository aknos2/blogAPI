import { useState } from 'react';
import { articles } from '../../services/articles';
import { CommentsIcon, HeartIcon } from '../Icons';
import './library.css';
import './search-articles.css';
import SearchDate from './SearchArticles';
import Button from '../Button';
import { latestMonth, latestYear } from '../../services/getLatestDates';
import SelectedFilters from './SelectedFilters';

function Library() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const allTags = [...new Set(articles.flatMap(article => article.tags || []))];

  const filteredArticles = articles.filter(article => {
    const matchesYear = !selectedYear || article.year === selectedYear;
    const matchesMonth = !selectedMonth || article.month.toLowerCase() === selectedMonth.toLowerCase();
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => article.tags.includes(tag));
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      article.pages.some(page => page.content.toLowerCase().includes(searchQuery.trim().toLowerCase()));

    return matchesYear && matchesMonth && matchesTags && matchesSearch;
  })

  const handleMonthSelect = (year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  const handleNewPostsClick = () => {
    setSelectedYear(latestYear);
    setSelectedMonth(latestMonth);
  };

  const handleTagsSelect = (tag) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag) // remove if already selected (toggle off)
        : [...prevTags, tag]              // add if not selected
    );
  };


  return (
    <div className='library-container'>
      <div className='library-content'>
        <div className='search-menu'>
          <div className="search">
            <label htmlFor="category">Search</label>
            <input type="search" id="category" name="category" placeholder="Search categories..." />
          </div>
          <nav className="nav-links">
            <Button onClick={handleNewPostsClick} 
                    text="NEW POSTS"
                    className={`new-posts-btn ${selectedYear === latestYear && selectedMonth === latestMonth ? 'active-underline' : ''}`}
                    />
            <div className='date-wrap'>
              <p>DATE</p>
              <SearchDate onMonthSelect={handleMonthSelect}/>
            </div>
            <div className='category-wrap'>
              <p>CATEGORIES</p>
              <div className='category-tags'>
                {allTags.map((tag, index) => (
                  <Button text={tag} 
                          key={index} 
                          onClick={() => handleTagsSelect(tag)}
                          className={selectedTags.includes(tag) ? 'active-tag' : ''}
                          />
                ))}
              </div>
            </div>
          </nav>
        </div>
        
          <div className='articles-compilation'>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <figure className="article-card" key={index}>
                  <img src={article.thumbnail} alt="Article thumbnail" />
                  <figcaption>
                    <h3 className='card-date'>{article.date}</h3>
                    <div className='card-stats'>
                      <div className='stats-wrap'><HeartIcon/> <p>3</p></div>
                      <div className='stats-wrap'><CommentsIcon/> <p>20</p></div>
                    </div>
                    {/* ✅ Only show this extra text on the first article */}
                     {index === 0 &&  
                     <SelectedFilters
                      className="month-title"
                      selectedYear={selectedYear}
                      setSelectedYear={setSelectedYear}
                      selectedMonth={selectedMonth}
                      setSelectedMonth={setSelectedMonth}
                      selectedTags={selectedTags}
                      setSelectedTags={setSelectedTags}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                    />}
                  </figcaption>
                </figure>
              ))
            ) : (
              <p className='not-found'>No articles found</p>
            )}
          </div>
      </div>
    </div>
  )
}

export default Library;
