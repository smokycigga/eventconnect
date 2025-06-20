import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SecondarySearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() || locationQuery.trim()) {
      onSearch(searchQuery.trim(), locationQuery.trim());
    }
  };

  const popularCategories = [
    { name: "Wedding Planners", icon: "Heart", color: "bg-pink-50 text-pink-600" },
    { name: "Birthday Parties", icon: "Gift", color: "bg-purple-50 text-purple-600" },
    { name: "Corporate Events", icon: "Briefcase", color: "bg-blue-50 text-blue-600" },
    { name: "Baby Showers", icon: "Baby", color: "bg-green-50 text-green-600" },
    { name: "Graduations", icon: "GraduationCap", color: "bg-yellow-50 text-yellow-600" },
    { name: "Anniversary", icon: "Calendar", color: "bg-red-50 text-red-600" }
  ];

  return (
    <section className="py-16 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Still Looking for the Perfect Organizer?
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Try another search or browse by popular event categories
          </p>
        </div>

        {/* Secondary Search Form */}
        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="Search" size={20} className="text-text-muted" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What type of event are you planning?"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="MapPin" size={20} className="text-text-muted" />
                  </div>
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="Where is your event?"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-smooth hover-lift flex items-center justify-center space-x-2 md:min-w-[140px]"
              >
                <Icon name="Search" size={18} />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        {/* Popular Categories */}
        <div>
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Browse by Category
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => onSearch(category.name, '')}
                className="group p-6 bg-surface border border-gray-200 rounded-2xl hover:shadow-card transition-smooth hover-lift text-center"
              >
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-layout`}>
                  <Icon name={category.icon} size={24} />
                </div>
                <h4 className="font-semibold text-text-primary text-sm group-hover:text-primary transition-smooth">
                  {category.name}
                </h4>
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-xl mb-6 opacity-90">
            Let us help you find the perfect event organizer for your special occasion
          </p>
          <button
            onClick={() => window.location.href = '/contact'}
            className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-smooth hover-lift inline-flex items-center space-x-2"
          >
            <Icon name="MessageCircle" size={20} />
            <span>Contact Us</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SecondarySearch;