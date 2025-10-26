import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AppLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const titles = {
      "/Register": "Register Page",
      "/login": "Login Page",
    };

    document.title = titles[path] || "My App";
  }, [location]);

  return <div>{children}</div>;
};

export default AppLayout;

