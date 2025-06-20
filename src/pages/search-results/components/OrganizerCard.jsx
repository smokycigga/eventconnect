import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const OrganizerCard = ({ organizer, onClick }) => {
  const {
    name,
    thumbnail,
    location,
    rating,
    reviewCount,
    tagline,
    category,
    priceRange,
    availability,
    verified,
    responseTime
  } = organizer;

  const isAvailable = availability.toLowerCase().includes('available');

  return (
    <div
      onClick={onClick}
      className="bg-surface border border-gray-200 rounded-lg overflow-hidden cursor-pointer transition-smooth hover-lift hover:shadow-card hover:border-primary group"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-layout"
        />
        
        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            isAvailable
              ? 'bg-secondary text-white' :'bg-yellow-100 text-yellow-800'
          }`}>
            {availability}
          </span>
        </div>

        {/* Verified Badge */}
        {verified && (
          <div className="absolute top-3 right-3">
            <div className="bg-white bg-opacity-90 rounded-full p-1">
              <Icon name="CheckCircle" size={16} className="text-secondary" />
            </div>
          </div>
        )}

        {/* Category Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-smooth line-clamp-1">
              {name}
            </h3>
            <div className="flex items-center space-x-1 text-text-muted text-sm mt-1">
              <Icon name="MapPin" size={14} />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-text-primary">{rating}</span>
          </div>
          <span className="text-text-muted text-sm">
            ({reviewCount} reviews)
          </span>
          {verified && (
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={14} className="text-secondary" />
              <span className="text-xs text-secondary font-medium">Verified</span>
            </div>
          )}
        </div>

        {/* Tagline */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {tagline}
        </p>

        {/* Price Range */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="IndianRupee" size={14} className="text-text-muted" />
            <span className="text-sm font-medium text-text-primary">{priceRange}</span>
          </div>
          <div className="flex items-center space-x-1 text-text-muted text-xs">
            <Icon name="Clock" size={12} />
            <span>Responds {responseTime}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-700 transition-smooth group-hover:bg-primary-700">
          View Details
        </button>
      </div>
    </div>
  );
};

export default OrganizerCard;