import React, { useState, useRef, useEffect } from "react";
import Header from "./Header/Header";
import SideMenu from "./SideMenu/SideMenu";

function Layout({children}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [headerPosition, setHeaderPosition] = useState({ top: 0, left: 0, height: 0 });
  
  const menuBtnRef = useRef(null);
  const headerRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
    const updatePositions = () => {
      // Update menu button position
      if (menuBtnRef.current) {
        const rect = menuBtnRef.current.getBoundingClientRect();
        setMenuPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX
        });
      }
      
      // Update header position
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setHeaderPosition({
          top: rect.bottom + window.scrollY,
          left: rect.right + window.scrollX,
          height: rect.height
        });
      }
    };

    // Update positions on mount and resize
    updatePositions();
    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions);

    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions);
    };
  }, []);

  return (
    <>
      <Header 
        onMenuToggle={toggleMenu}
        menuBtnRef={menuBtnRef}
        headerRef={headerRef}
      />
      <SideMenu isOpen={isMenuOpen} position={menuPosition} />
      {/* Pass header position to children */}
      {React.cloneElement(children, { headerPosition })}
    </>
  )
}

export default Layout;