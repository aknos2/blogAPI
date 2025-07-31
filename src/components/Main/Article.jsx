import { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ChatIcon, HeartIcon } from '../Icons';
import Button from '../Button';
import './article.css';
import { fetchPosts } from '../../../api/posts';

function Article({ onToggleChat }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetchPosts();
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  // Show loading state
  if (loading) return <div>Loading...</div>;
  
  // Show no posts message if empty
  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>;
  }

  const currentArticle = posts[posts.length - 1];
  
  // Additional safety check for postPage
  if (!currentArticle || !currentArticle.postPage || currentArticle.postPage.length === 0) {
    return <div>No article content available.</div>;
  }

  const totalPages = currentArticle.postPage.length;
  const currentPageData = currentArticle.postPage[currentPage];

  const renderLayout = (pageData) => {
    // Get the first image from PageImage array
    const pageImage = pageData.PageImage?.[0]?.image;

    switch (pageData.layout) {
      case "titlePage":
        return (
          <>
            <div className="title">
              <h2>{currentArticle.title}</h2>
              <div className='sub-title'>
                <p>{currentArticle.createdAt.slice(0, 10)}</p>
                <div className='tags'>
                  {currentArticle.tags?.map((tag, index) => (
                    <a key={index}>{tag.name}</a>
                  )) || []}
                </div>
              </div>
            </div>

            <div className={`page-content ${isSliding ? 'sliding' : ''}`}>
              <div className="content-grid-titlePage">
                <div className="img-content">
                   {pageImage && (
                  <img 
                    src={pageImage.url} 
                    alt={pageImage.altText || pageData.PageImage?.[0]?.caption || 'image'} 
                  />
                )}
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
               {pageImage && (
                  <img 
                    src={pageImage.url} 
                    alt={pageImage.altText || pageData.PageImage?.[0]?.caption || 'image'} 
                  />
                )}
            </div>
            <div className="text-content">
              <p>{pageData.subtitle}</p>
              <div className="article-content">
                <p>{pageData.content}</p>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Unsupported layout</div>;
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
            <span>{currentArticle.comments?.length || 0} Comments</span>
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