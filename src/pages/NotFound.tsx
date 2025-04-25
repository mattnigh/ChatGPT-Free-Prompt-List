
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-github-dark">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-github-text">404</h1>
        <p className="text-xl text-github-text mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-400 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
