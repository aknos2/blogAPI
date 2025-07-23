import { ArrowLeftIcon, ArrowRightIcon, ChatIcon, HeartIcon } from '../Icons';
import './article.css'
import day1Title from '/assets/corgi/articles/day1/corgi-running.webp'
import day1CorgiBreeze  from '/assets/corgi/articles/day1/corgi-breeze.webp';
import day1CorgiPlant from '/assets/corgi/articles/day1/corgi-eating-plant.webp';
import { useState } from 'react';
import Button from '../Button';

function Article({ onToggleChat }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

   const articlePages = [
    {
      id: 1,
      title: "Running around the park",
      date: "Thursday, 17 July 2025",
      tags: ["Activities", "Nature"],
      image: day1Title,
      imageAlt: "Corgi running",
      heading: "Today I run all around the parkie",
      subtitle: "I'm speedy-speed, can't catch me!",
      content: "I wuv nature!",
      layout: "titlePage",
    },
    {
      id: 2,
      image: day1CorgiBreeze,
      imageAlt: "Corgi in breeze",
      subtitle: "The wind feels so nice!",
      content: "Little tired but breeze is great!",
      layout: "horizontalImage",
    },
    {
      id: 3,
      image: day1CorgiPlant,
      imageAlt: "Corgi eating plant",
      subtitle: "Found some yummy plants",
      content: "Today was a good day.",
      layout: "horizontalImage",
    }
  ];

  const renderLayout = (pageData) => {
    switch(pageData.layout) {
      case "titlePage":
        return (
          <>
            <div className="title">
              <h2>{currentPageData.title}</h2>
              <div className='sub-title'>
                <p>{currentPageData.date}</p>
                <div className='tags'>
                  {currentPageData.tags.map((tag, index) => (
                    <a key={index}>{tag}</a>
                  ))}
                </div>
              </div>
            </div>

            <div className={`page-content ${isSliding ? 'sliding' : ''}`}>
              <div className="content-grid-titlePage">
                <div className="img-content">
                  <img src={currentPageData.image} alt={currentPageData.imageAlt} />
                </div>
                <div className="text-content">
                  <h4>{currentPageData.heading}</h4>
                  <p>{currentPageData.subtitle}</p>
                  <div className="article-content">
                    <p>{currentPageData.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      
      case "horizontalImage":
        return (
          <>
              <div className="content-grid-horizontalImage">
                <div className="img-content">
                  <img src={currentPageData.image} alt={currentPageData.imageAlt} />
                </div>
                <div className="text-content">
                  <p>{currentPageData.subtitle}</p>
                  <div className="article-content">
                    <p>{currentPageData.content}</p>
                  </div>
                </div>
              </div>
          </>
        )

    }
  }

  const totalPages = articlePages.length;

  const goToNextPage = () => {
    if ( currentPage < totalPages - 1) {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsSliding(false);
      }, 150); // Half of transition durationc
    }
  }

  const goToPrevPage = () => {
    if ( currentPage > 0 ) {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsSliding(false);
      }, 150); // Half of transition durationc
    }
  }
  
  const currentPageData = articlePages[currentPage];

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
                <HeartIcon className="heart-icon"/>
              </button>
            </div>
            <div className='comment-chat-wrap' onClick={onToggleChat}>
              <span>10 Comments</span>
              <ChatIcon className='chat-icon'/>
            </div>
          </div>
        </div>

        {currentPage > 0  && (
          <Button className="arrow-left-btn" 
                  text={<ArrowLeftIcon className='arrow-left-icon'/>}
                  onClick={goToPrevPage}
                  />
        )}
        {currentPage < totalPages - 1 && (
          <Button className="arrow-right-btn" 
                  text={<ArrowRightIcon className='arrow-right-icon'/>}
                  onClick={goToNextPage}
                  />
        )}
      </div>
  )
}

export default Article;