import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterSidebar = ({ filters, onFilterChange, onClearAll, isMobile = false }) => {
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    category: true,
    rating: true,
    availability: true,
    priceRange: true
  });

  const locations = [
    'Mumbai, Maharashtra',
    'Delhi, NCR',
    'Bangalore, Karnataka',
    'Pune, Maharashtra',
    'Chennai, Tamil Nadu',
    'Hyderabad, Telangana',
    'Kolkata, West Bengal',
    'Ahmedabad, Gujarat'
  ];

  const categories = [
    'Wedding Planner',
    'Corporate Events',
    'Birthday Parties',
    'Cultural Events',
    'Theme Parties',
    'Luxury Events',
    'Social Gatherings',
    'Festival Celebrations'
  ];

  const ratings = [
    { label: '4.5+ Stars', value: '4.5' },
    { label: '4.0+ Stars', value: '4.0' },
    { label: '3.5+ Stars', value: '3.5' },
    { label: '3.0+ Stars', value: '3.0' }
  ];

  const availabilityOptions = [
    { label: 'Available Now', value: 'available' },
    { label: 'Busy', value: 'busy' }
  ];

  const priceRanges = [
    { label: 'Under ₹25,000', value: '0-25000' },
    { label: '₹25,000 - ₹75,000', value: '25000-75000' },
    { label: '₹75,000 - ₹1,50,000', value: '75000-150000' },
    { label: '₹1,50,000 - ₹3,00,000', value: '150000-300000' },
    { label: 'Above ₹3,00,000', value: '300000+' }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: filters[filterType] === value ? '' : value
    };
    onFilterChange(newFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  const FilterSection = ({ title, filterKey, children, count }) => (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => toggleSection(filterKey)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        <div className="flex items-center space-x-2">
          {count > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
              {count}
            </span>
          )}
          <Icon
            name={expandedSections[filterKey] ? "ChevronUp" : "ChevronDown"}
            size={16}
            className="text-text-muted"
          />
        </div>
      </button>
      {expandedSections[filterKey] && (
        <div className="space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className={`bg-surface ${!isMobile ? 'border border-gray-200 rounded-lg p-6' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        {getActiveFiltersCount() > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-primary hover:text-primary-700 transition-smooth"
          >
            Clear All ({getActiveFiltersCount()})
          </button>
        )}
      </div>

      {/* Location Filter */}
      <FilterSection
        title="Location"
        filterKey="location"
        count={filters.location ? 1 : 0}
      >
        {locations.map((location) => (
          <label key={location} className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="location"
              value={location}
              checked={filters.location === location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-smooth">
              {location}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Category Filter */}
      <FilterSection
        title="Event Category"
        filterKey="category"
        count={filters.category ? 1 : 0}
      >
        {categories.map((category) => (
          <label key={category} className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-smooth">
              {category}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection
        title="Rating"
        filterKey="rating"
        count={filters.rating ? 1 : 0}
      >
        {ratings.map((rating) => (
          <label key={rating.value} className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="rating"
              value={rating.value}
              checked={filters.rating === rating.value}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
            />
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-smooth">
                {rating.label}
              </span>
              <div className="flex items-center">
                <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
              </div>
            </div>
          </label>
        ))}
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection
        title="Availability"
        filterKey="availability"
        count={filters.availability ? 1 : 0}
      >
        {availabilityOptions.map((option) => (
          <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="availability"
              value={option.value}
              checked={filters.availability === option.value}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-smooth">
              {option.label}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection
        title="Price Range"
        filterKey="priceRange"
        count={filters.priceRange ? 1 : 0}
      >
        {priceRanges.map((range) => (
          <label key={range.value} className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="priceRange"
              value={range.value}
              checked={filters.priceRange === range.value}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-smooth">
              {range.label}
            </span>
          </label>
        ))}
      </FilterSection>
    </div>
  );
};

export default FilterSidebar;