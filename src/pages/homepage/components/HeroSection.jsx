import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const HeroSection = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const searchRef = useRef(null);
  const locationRef = useRef(null);

  const searchSuggestions = [
    "Wedding Planners",
    "Birthday Party Organizers",
    "Corporate Event Specialists",
    "Anniversary Celebrations",
    "Baby Shower Planners",
    "Graduation Party Organizers"
  ];

  const locationSuggestions = [
    "Bhubaneswar, Odisha",
    "Cuttack, Odisha",
    "Puri, Odisha",
    "Khordha, Odisha",
    "Berhampur, Odisha",
    "Sambalpur, Odisha",
    "Rourkela, Odisha",
    "Konark, Odisha"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() || locationQuery.trim()) {
      onSearch(searchQuery.trim(), locationQuery.trim());
    }
  };

  const handleSuggestionClick = (suggestion, type) => {
    if (type === 'search') {
      setSearchQuery(suggestion);
      setShowSuggestions(false);
    } else {
      setLocationQuery(suggestion);
      setShowLocationSuggestions(false);
    }
  };

  const filteredSearchSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLocationSuggestions = locationSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(locationQuery.toLowerCase())
  );

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-16 lg:py-24">
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Find Perfect
            <span className="text-primary block">Event Organizers in Odisha</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-8">
            Connect with trusted professionals across Bhubaneswar and Odisha who bring your vision to life. From weddings to corporate events, we've got you covered.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="bg-surface rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative" ref={searchRef}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="Search" size={20} className="text-text-muted" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search for event organizers..."
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                  />
                </div>
                
                {showSuggestions && searchQuery && filteredSearchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-gray-200 rounded-xl shadow-dropdown z-50 max-h-60 overflow-y-auto">
                    {filteredSearchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion, 'search')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-smooth first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name="Search" size={16} className="text-text-muted" />
                          <span className="text-text-primary">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Location Input */}
              <div className="flex-1 relative" ref={locationRef}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="MapPin" size={20} className="text-text-muted" />
                  </div>
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => {
                      setLocationQuery(e.target.value);
                      setShowLocationSuggestions(true);
                    }}
                    onFocus={() => setShowLocationSuggestions(true)}
                    placeholder="Enter location in Odisha..."
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                  />
                </div>
                
                {showLocationSuggestions && locationQuery && filteredLocationSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-gray-200 rounded-xl shadow-dropdown z-50 max-h-60 overflow-y-auto">
                    {filteredLocationSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion, 'location')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-smooth first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name="MapPin" size={16} className="text-text-muted" />
                          <span className="text-text-primary">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-smooth hover-lift flex items-center justify-center space-x-2 lg:min-w-[160px]"
              >
                <Icon name="Search" size={20} />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Quick Search Tags */}
          <div className="mt-8 text-center">
            <p className="text-text-secondary mb-4">Popular searches in Odisha:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Wedding Planners', 'Birthday Parties', 'Corporate Events', 'Baby Showers'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    onSearch(tag, locationQuery);
                  }}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-text-secondary hover:text-primary hover:border-primary transition-smooth text-sm"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;