import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import SideMenu from "./SideMenu/SideMenu";
import LoginScreen from "./Login-Subscribe/Login";
import { useAuth } from "../context/useAuthContext";

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginScreenOpen, setIsLoginScreenOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { isAuthenticated } = useAuth();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleLogin = () => {
    setIsLoginScreenOpen((prev) => !prev);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Handle login success when auth state changes
  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");

    if (loginSuccess === "true" && isAuthenticated) {
      setSuccessMessage("Login successful! ✓");
      setShowSuccessMessage(true);
      localStorage.removeItem("loginSuccess");
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  }, [isAuthenticated]);

  // Handle signup success on mount (after navigation from signup)
  useEffect(() => {
    const signupSuccess = localStorage.getItem("signupSuccess");
    if (signupSuccess === "true") {
      setSuccessMessage("Account created successfully! \n You can now log in. ✓");
      setShowSuccessMessage(true);
      localStorage.removeItem("signupSuccess");
      setTimeout(() => setShowSuccessMessage(false), 4000);
    }
  }, []);

  // Listen for custom auth state change events (backup for signup success)
  useEffect(() => {
    const handleAuthStateChange = () => {
      // This is a backup in case the mount effect doesn't catch it
      const signupSuccess = localStorage.getItem("signupSuccess");
      if (signupSuccess === "true") {
        setSuccessMessage("Account created successfully! \n You can now log in. ✓");
        setShowSuccessMessage(true);
        localStorage.removeItem("signupSuccess");
        setTimeout(() => setShowSuccessMessage(false), 4000);
      }
    };

    window.addEventListener('authStateChange', handleAuthStateChange);
    
    return () => {
      window.removeEventListener('authStateChange', handleAuthStateChange);
    };
  }, []);

  return (
    <>
      <Header onMenuToggle={toggleMenu} />
      <Outlet />
      <SideMenu
        isOpen={isMenuOpen}
        onToggleLogin={toggleLogin}
        onMenuToggle={toggleMenu}
      />
      {isLoginScreenOpen && (
        <div className="background-overlay">
          <LoginScreen onToggleLogin={toggleLogin} />
        </div>
      )}
      {showSuccessMessage && (
        <div className="success-login-message slide-in-message">
          <span>{successMessage}</span>
        </div>
      )}
    </>
  );
}

export default Layout;