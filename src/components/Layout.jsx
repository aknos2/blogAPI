import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import SideMenu from "./SideMenu/SideMenu";
import { HeaderProvider } from "./Header/HeaderContext";

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [headerPosition, setHeaderPosition] = useState({ top: 0, left: 0, height: 0 });
  
  const menuBtnRef = useRef(null);
  const headerRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
    const updatePositions = () => {
      if (menuBtnRef.current) {
        const rect = menuBtnRef.current.getBoundingClientRect();
        setMenuPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX
        });
      }
      
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setHeaderPosition({
          top: rect.bottom + window.scrollY,
          left: rect.right + window.scrollX,
          height: rect.height
        });
      }
    };

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
      <HeaderProvider headerPosition={headerPosition}>
        <Outlet />
      </HeaderProvider>
      <SideMenu isOpen={isMenuOpen} position={menuPosition} />
    </>
  )
}

export default Layout;
