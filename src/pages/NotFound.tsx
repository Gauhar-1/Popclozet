import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="mb-4 text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900">404</h1>
        <p className="mb-6 text-lg sm:text-xl md:text-2xl text-gray-600">Oops! Page not found</p>
        <a href="/" className="inline-block text-[#8B1A3D] underline hover:text-[#6d1430] text-base sm:text-lg font-medium transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
