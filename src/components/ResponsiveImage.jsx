import { useEffect } from 'react';
import { cloudinaryUrl } from '../utils/cloudinary';

function ResponsiveImage({ 
  url, 
  alt, 
  widths = [400, 800, 1200], 
  sizes,
  aspectRatio = null, // Only add this for CLS prevention
  priority = false    // Only add this for LCP images
}) {
  
  const srcSet = widths
  .map((w) => `${cloudinaryUrl(url, w)} ${w}w`)
  .join(', ');
  
  const defaultSizes =
  sizes ||
  `
  (max-width: 480px) ${widths[0]}px,
  (max-width: 1024px) ${widths[1]}px,
  (min-width: 1290px) ${widths[2]}px,
  ${widths[widths.length - 1]}px
  `;
  
  // Only add aspect-ratio when specified
  const imageStyle = {
    width: '100%', 
    height: '100%',
    ...(aspectRatio && { aspectRatio })
  };
  
  // ✅ Inject <link rel="preload"> in <head> for priority images
  useEffect(() => {
    if (!priority || !url) return;
    
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = cloudinaryUrl(url, widths[1]); // fallback mid-size
    preloadLink.setAttribute('imagesrcset', srcSet);
    preloadLink.setAttribute('imagesizes', defaultSizes);
    preloadLink.fetchPriority = 'high';
    
    document.head.appendChild(preloadLink);
    
    return () => {
      document.head.removeChild(preloadLink);
    };
  }, [url, priority, widths, srcSet, defaultSizes]);
  
  if (!url) return null;
  
  return (
    <img
      src={cloudinaryUrl(url, widths[1])} // mid-size fallback
      srcSet={srcSet}
      sizes={defaultSizes}
      alt={alt || ''}
      style={imageStyle}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}

export default ResponsiveImage;
