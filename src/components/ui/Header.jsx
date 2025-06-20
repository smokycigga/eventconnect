import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Search', path: '/search-results', icon: 'Search' },
    { label: 'Contact', path: '/contact-us', icon: 'MessageCircle' },
  ];

  const userMenuItems = [
    { label: 'My Dashboard', path: '/user-dashboard', icon: 'User' },
    { label: 'My Bookings', path: '/bookings', icon: 'Calendar' },
    { label: 'Profile Settings', path: '/profile', icon: 'Settings' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen, isMobileMenuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search-results?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        document.querySelector('.mobile-search-input')?.focus();
      }, 150);
    }
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-100 bg-surface shadow-card">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/homepage" className="flex items-center space-x-2 transition-smooth hover:opacity-80">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary hidden sm:block">
                EventConnect Odisha
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth hover-lift ${
                    isActiveRoute(item.path)
                      ? 'bg-primary-50 text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" size={16} className="text-text-muted" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for event organizers in Bhubaneswar..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-text-muted focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                />
              </div>
            </form>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <div className="relative user-menu-container">
                  <button
                    onClick={handleUserMenuToggle}
                    className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-smooth hover-lift"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <Icon name="ChevronDown" size={16} className="text-text-muted" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-dropdown bg-surface ring-1 ring-black ring-opacity-5 z-150">
                      <div className="py-1">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-gray-50 hover:text-text-primary transition-smooth"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Icon name={item.icon} size={16} className="mr-3" />
                            {item.label}
                          </Link>
                        ))}
                        <hr className="my-1 border-gray-200" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:bg-gray-50 hover:text-text-primary transition-smooth"
                        >
                          <Icon name="LogOut" size={16} className="mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login-register"
                    className="text-text-secondary hover:text-text-primary transition-smooth"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/login-register"
                    className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-smooth hover-lift"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleSearchToggle}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-smooth"
            >
              <Icon name="Search" size={20} />
            </button>
            <button
              onClick={handleMobileMenuToggle}
              className="mobile-menu-container p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchExpanded && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" size={16} className="text-text-muted" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for event organizers in Bhubaneswar..."
                  className="mobile-search-input block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-text-muted focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                />
              </div>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-200 bg-black bg-opacity-50 transition-smooth">
          <div className="mobile-menu-container fixed inset-y-0 right-0 max-w-xs w-full bg-surface shadow-modal transform transition-layout">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-lg font-semibold text-text-primary">Menu</span>
              <button
                onClick={handleMobileMenuToggle}
                className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-smooth ${
                    isActiveRoute(item.path)
                      ? 'bg-primary-50 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}

              <hr className="my-4 border-gray-200" />

              {isAuthenticated ? (
                <div className="space-y-2">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-smooth"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon name={item.icon} size={20} />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-smooth"
                  >
                    <Icon name="LogOut" size={20} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login-register"
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-smooth"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/login-register"
                    className="w-full bg-primary text-white px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700 transition-smooth text-center block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;