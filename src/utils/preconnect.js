export function addPreconnectLinks() {
  const origins = [
    // Backend API
    import.meta.env.NODE_ENV === 'production' 
      ? import.meta.env.REACT_APP_API_URL || 'https://your-api-domain.com'
      : 'http://localhost:5173', 'http://localhost:4173',
    
    // Cloudinary
    'https://res.cloudinary.com',
    
    // Add other third-party origins you use
    // 'https://fonts.googleapis.com',
    // 'https://fonts.gstatic.com'
  ];

  origins.forEach(origin => {
    // Add preconnect
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = origin;
    document.head.appendChild(preconnectLink);

    // Add dns-prefetch as fallback
    const dnsPrefetchLink = document.createElement('link');
    dnsPrefetchLink.rel = 'dns-prefetch';
    dnsPrefetchLink.href = origin;
    document.head.appendChild(dnsPrefetchLink);
  });
}

// Call this early in your app
export default addPreconnectLinks;