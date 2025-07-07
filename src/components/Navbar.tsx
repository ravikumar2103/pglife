import React from 'react';
import { User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  onSignupClick: () => void;
  onLoginClick: () => void;
  onLogoClick?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onSignupClick, 
  onLoginClick, 
  onLogoClick
}) => {
  const { isAuthenticated, userData, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Extract first name from full name
  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };

  return (
    <nav className="navbar bg-white shadow-sm border-b border-gray-100 sticky-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-100">
        <div className="flex justify-between items-center h-16 w-100">
          <div className="flex items-center">
            {/* Logo - Fixed size for mobile */}
            <button 
              onClick={onLogoClick}
              className="flex items-center hover:opacity-80 transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 rounded-lg p-1"
            >
              <img 
                src="/logo.png" 
                alt="PG Life Logo" 
                className="h-10 w-auto transition-transform duration-300"
                style={{ 
                  minWidth: '120px', // Prevent shrinking on mobile
                  maxWidth: '120px', // Consistent size across devices
                  height: '40px',
                  objectFit: 'contain'
                }}
              />
            </button>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 px-3 py-2 bg-teal-50 rounded-lg">
                  <User className="h-4 w-4 text-teal-600" />
                  <span className="text-sm font-medium text-teal-700">
                    {userData?.fullName ? getFirstName(userData.fullName) : 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-600 hover:text-red-600 transition-all duration-300 rounded-lg hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                >
                  <LogOut className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                  <span className="font-medium hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onSignupClick}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-600 hover:text-teal-600 transition-all duration-300 rounded-lg hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                >
                  <User className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                  <span className="font-medium hidden sm:inline">Signup</span>
                </button>
                <button
                  onClick={onLoginClick}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-600 hover:text-teal-600 transition-all duration-300 rounded-lg hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                >
                  <LogIn className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                  <span className="font-medium hidden sm:inline">Login</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;