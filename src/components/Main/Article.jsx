import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ChatIcon, HeartIcon } from '../Icons';
import Button from '../Button';
import './article.css';
import { articles } from '../../services/articles';

function Article({ onToggleChat }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const currentArticle = articles[0]; // You can change this logic later
  const totalPages = currentArticle.pages.length;
  const currentPageData = currentArticle.pages[currentPage];

  const renderLayout = (pageData) => {
    switch (pageData.layout) {
      case "titlePage":
        return (
          <>
            <div className="title">
              <h2>{pageData.title}</h2>
              <div className='sub-title'>
                <p>{pageData.date}</p>
                <div className='tags'>
                  {pageData.tags.map((tag, index) => (
                    <a key={index}>{tag}</a>
                  ))}
                </div>
              </div>
            </div>

            <div className={`page-content ${isSliding ? 'sliding' : ''}`}>
              <div className="content-grid-titlePage">
                <div className="img-content">
                  <img src={pageData.image} alt={pageData.imageAlt} />
                </div>
                <div className="text-content">
                  <h4>{pageData.heading}</h4>
                  <p>{pageData.subtitle}</p>
                  <div className="article-content">
                    <p>{pageData.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "horizontalImage":
        return (
          <div className="content-grid-horizontalImage">
            <div className="img-content">
              <img src={pageData.image} alt={pageData.imageAlt} />
            </div>
            <div className="text-content">
              <p>{pageData.subtitle}</p>
              <div className="article-content">
                <p>{pageData.content}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsSliding(false);
      }, 150);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsSliding(false);
      }, 150);
    }
  };

  return (
    <div className={`article-container page-content ${isSliding ? 'sliding' : ''}`}>
      {renderLayout(currentPageData)}

      <div className='content-bottom'>
        <div className='page-indicator'>
          <span>Page {currentPage + 1} of {totalPages}</span>
        </div>

        <div className='right-wrap'>
          <div className='like-section'>
            <button className="heart-btn">
              <span>Like</span>
              <HeartIcon className="heart-icon" />
            </button>
          </div>
          <div className='comment-chat-wrap' onClick={onToggleChat}>
            <span>10 Comments</span>
            <ChatIcon className='chat-icon' />
          </div>
        </div>
      </div>

      {currentPage > 0 && (
        <Button
          className="arrow-left-btn"
          text={<ArrowLeftIcon className='arrow-left-icon' />}
          onClick={goToPrevPage}
        />
      )}
      {currentPage < totalPages - 1 && (
        <Button
          className="arrow-right-btn"
          text={<ArrowRightIcon className='arrow-right-icon' />}
          onClick={goToNextPage}
        />
      )}
    </div>
  );
}

export default Article;
