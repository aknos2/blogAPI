import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Add useOutletContext
import { ArrowLeftIcon, ArrowRightIcon, ChatIcon, HeartIcon } from '../Icons';
import Button from '../Button';
import './article.css';
import { fetchPosts, togglePostLike } from '../../../api/posts';
import parse from 'html-react-parser';
import { useAuth } from '../../context/useAuthContext';
import ResponsiveImage from '../ResponsiveImage';
import LoadingSpinner from '../LoadingAnimation/LoadingSpinner';

function Article({ onToggleChat, onPostChange }) { 
  const { articleId } = useParams();
  const { isAuthenticated, user, authLoading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [likeCounts, setLikeCounts] = useState({});
  const [isLiking, setIsLiking] = useState(false);
  const [loginMessage, setLoginMessage] = useState(false);

  // Load posts - this should work regardless of authentication status
  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetchPosts(); // backend decides what to send
        setPosts(res.data);
        
        // Initialize like counts
        const counts = {};
        res.data.forEach(post => {
          counts[post.id] = post.Like?.length || 0;
        });
        setLikeCounts(counts);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []); // Removed auth dependencies

  // Separate effect to handle user's liked posts when auth state changes
  useEffect(() => {
    if (!posts.length) return;
    
    const userLiked = new Set();
    if (isAuthenticated && user) {
      posts.forEach(post => {
        if (post.Like) {
          const hasLiked = post.Like.some(like => like.userId === user.userId);
          if (hasLiked) {
            userLiked.add(post.id);
          }
        }
      });
    }
    setLikedPosts(userLiked);
  }, [isAuthenticated, user, posts]);

  // Select article based on ID from URL, or default to latest
  const currentArticle = posts?.find(post => post.id === articleId) || posts?.[0] || null;

  // Notify parent component when current article changes
  useEffect(() => {
    if (currentArticle && currentArticle.id && onPostChange) {
      onPostChange(currentArticle.id);
    }
  }, [currentArticle, onPostChange]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      setLoginMessage(true);
      setTimeout(() => {
        setLoginMessage(false)
      }, 3000)
      return;
    }; 
  
    if (!currentArticle || isLiking) return;

    setIsLiking(true);
    const postId = currentArticle.id;

    try {
      const response = await togglePostLike(postId);
      const { liked, totalLikes } = response.data;
      
      // Update liked posts set
      if (liked) {
        setLikedPosts(prev => new Set([...prev, postId]));
      } else {
        setLikedPosts(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
      }
      
      // Update like count with server response
      setLikeCounts(prev => ({
        ...prev,
        [postId]: totalLikes
      }));
      
    } catch (err) {
      console.error('Failed to update like:', err);
    } finally {
      setIsLiking(false);
    }
  };

  const totalPages = currentArticle?.postPage.length;
  const currentPageData = currentArticle?.postPage[currentPage];

  // Only show loading for post loading, not auth loading for viewing posts
  if (loading || !posts) return <LoadingSpinner/>;
  
  // Handle case where article with specific ID is not found
  if (articleId && !currentArticle) {
    return <div>Article not found.</div>;
  }
  
  // Additional safety check for postPage
  if (!currentArticle || !currentArticle.postPage || currentArticle.postPage.length === 0) {
    return <div>No article content available.</div>;
  }

  const isCurrentlyLiked = likedPosts.has(currentArticle.id);
  const likeCount = likeCounts[currentArticle.id] || 0;

  const renderLayout = (pageData) => {
    // Get the first image from PageImage array
    const pageImage = pageData.PageImage?.[0]?.image;

    switch (pageData.layout) {
      case "titlePage":
        return (
          <div className='title-container'>
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
                <div className="img-content no-select">
                 {currentArticle.thumbnail?.url && (
                     <ResponsiveImage
                      url={currentArticle.thumbnail.url}
                      alt="Post thumbnail"
                      widths={[400, 800, 1200]}
                      sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px, (min-width: 1290px) 800px, 1200px"
                    />
                  )}
                </div>
               <div className="text-content">
                  <h3>{pageData.heading || ''}</h3>
                  <h4>{pageData.subtitle || ''}</h4>
                  <div className="article-content">{parse(pageData.content || '')}</div>                
                </div>
              </div>
            </div>
          </div>
        );

      case "horizontalImage":
        return (
          <div className="content-grid-horizontalImage">
            <div className="img-content no-select">
               {pageImage && (
                  <ResponsiveImage
                    url={pageImage.url}
                    alt={pageImage.altText || pageData.PageImage?.[0]?.caption || 'image'}
                    widths={[600, 1200, 1600]}
                    sizes="(max-width: 768px) 600px, (max-width: 1440px) 1200px, 1000px"
                  />
                )}
            </div>
              <div className="text-content">
                   <p>{pageData.subtitle || ''}</p>
                 <div className="article-content">
                   {parse(pageData.content || '')}
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
      {renderLayout(totalPages > 0 ? currentPageData : currentArticle)}

      <div className='content-bottom'>
        <div className='page-indicator'>
          <span>Page {currentPage + 1} of {totalPages}</span>
        </div>

        <div className='right-wrap no-select'>
          <div className='like-section'>
            <button 
              className={`heart-btn ${isCurrentlyLiked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
              <HeartIcon className="heart-icon" />
              { loginMessage && (
                <span className='login-like-message'>Login to like post</span>
              )}
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