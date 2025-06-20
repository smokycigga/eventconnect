import React from 'react';
import Icon from 'components/AppIcon';

const FilterChips = ({ filters, onRemoveFilter, onClearAll }) => {
  const getFilterDisplayValue = (key, value) => {
    switch (key) {
      case 'location':
        return value;
      case 'category':
        return value;
      case 'rating':
        return `${value}+ Stars`;
      case 'availability':
        return value === 'available' ? 'Available Now' : 'Busy';
      case 'priceRange':
        const ranges = {
          '0-25000': 'Under ₹25K',
          '25000-75000': '₹25K - ₹75K',
          '75000-150000': '₹75K - ₹1.5L',
          '150000-300000': '₹1.5L - ₹3L',
          '300000+': 'Above ₹3L'
        };
        return ranges[value] || value;
      default:
        return value;
    }
  };

  const activeFilters = Object.entries(filters).filter(([key, value]) => value !== '');

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-text-secondary font-medium">Active Filters:</span>
      
      {activeFilters.map(([key, value]) => (
        <div
          key={key}
          className="flex items-center space-x-2 bg-primary-50 text-primary px-3 py-1 rounded-full text-sm"
        >
          <span>{getFilterDisplayValue(key, value)}</span>
          <button
            onClick={() => onRemoveFilter(key)}
            className="hover:bg-primary-100 rounded-full p-0.5 transition-smooth"
          >
            <Icon name="X" size={12} />
          </button>
        </div>
      ))}
      
      {activeFilters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-text-muted hover:text-primary transition-smooth underline"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default FilterChips;