// Enhanced cloudinary.js
export function cloudinaryUrl(originalUrl, width, options = {}) {
  if (!originalUrl) return '';
  
  const {
    crop = 'fill',
    quality = 'auto:good', // Better quality than just 'auto'
    format = 'auto',
    dpr = 'auto', // Device pixel ratio for retina displays
    privacy = true // Add privacy-focused flags
  } = options;
  
  let transformations = `w_${width},c_${crop},q_${quality},f_${format},dpr_${dpr}`;
  
  // Add privacy-focused parameters to reduce tracking
  if (privacy) {
    transformations += ',fl_immutable_cache,fl_preserve_transparency';
  }
  
  return originalUrl.replace(
    '/upload/',
    `/upload/${transformations}/`
  );
}

// New: Generate optimized blur placeholder
export function cloudinaryBlurUrl(originalUrl) {
  if (!originalUrl) return '';
  return originalUrl.replace(
    '/upload/',
    '/upload/w_20,h_20,c_fill,q_auto,f_auto,e_blur:300/'
  );
}