import { useRef, useState } from "react";
import Header from "./Header/Header";
import SideMenu from "./SideMenu/SideMenu";

function Layout({children}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0});
  const menuBtnRef = useRef(null);

  const toggleMenu = () => {
    if (!isMenuOpen && menuBtnRef.current) {
      const rect = menuBtnRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setIsMenuOpen(prev => !prev);
  }

  return (
    <>
      <Header onMenuToggle={toggleMenu} menuBtnRef={menuBtnRef}/>
      <SideMenu isOpen={isMenuOpen} position={menuPosition}/>
      {children}
    </>
  )
}

export default Layout;