import './article.css'
import day1Title from '/assets/corgi/articles/day1/corgi-running.webp'

function Article() {
  return (
      <div className="article-container">
        <div className="title">
          <h2>Running around the park</h2>
          <div className='sub-title'>
            <p>Thursday, 17 July 2025</p>
            <div className='tags'>
              <a>Activities</a>
              <a>Nature</a>
            </div>
          </div>
        </div>

        <div className="content-grid">

          <div className="img-content">
            <img src={day1Title} alt="Corgi running" />
          </div>

          <div className="text-content">
            <h1>hehefefe</h1>
            <p>jenjaenfjafnejn</p>
            <div className="article-content">
              <p>balblablal</p>
            </div>
          </div>

        </div>
      </div>

  )
}

export default Article;