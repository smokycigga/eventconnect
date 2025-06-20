import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import HeroSection from './components/HeroSection';
import FeaturedOrganizers from './components/FeaturedOrganizers';
import PlatformIntroduction from './components/PlatformIntroduction';
import SecondarySearch from './components/SecondarySearch';

const Homepage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const handleSearch = (query, location) => {
    const searchParams = new URLSearchParams();
    if (query) searchParams.append('q', query);
    if (location) searchParams.append('location', location);
    navigate(`/search-results?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />
      
      {/* Featured Organizers */}
      <FeaturedOrganizers />
      
      {/* Platform Introduction */}
      <PlatformIntroduction />
      
      {/* Secondary Search */}
      <SecondarySearch onSearch={handleSearch} />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold">EventFul</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Your trusted platform for connecting with professional event organizers across Bhubaneswar and Odisha. We mediate every booking to ensure quality service and peace of mind.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                  <Icon name="Facebook" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                  <Icon name="Instagram" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                  <Icon name="Linkedin" size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/homepage" className="text-gray-400 hover:text-white transition-smooth">Home</Link></li>
                <li><Link to="/search-results" className="text-gray-400 hover:text-white transition-smooth">Find Organizers</Link></li>
                <li><Link to="/contact-us" className="text-gray-400 hover:text-white transition-smooth">Contact Us</Link></li>
                <li><Link to="/user-dashboard" className="text-gray-400 hover:text-white transition-smooth">My Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-smooth">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-smooth">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-smooth">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-smooth">Become an Organizer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 mb-2">
              © {new Date().getFullYear()} EventFul. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Platform developed by <span className="text-primary font-medium">Gorakhnath Samal</span> and <span className="text-primary font-medium">Sumit Kumar Jena</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;