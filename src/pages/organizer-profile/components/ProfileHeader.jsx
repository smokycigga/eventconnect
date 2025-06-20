import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProfileHeader = ({ organizer, onBookingClick }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={16} className="text-yellow-400 fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-surface rounded-xl shadow-card overflow-hidden mb-8">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src={organizer.coverImage}
          alt={`${organizer.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Profile Image */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-surface overflow-hidden bg-surface">
              <Image
                src={organizer.profileImage}
                alt={organizer.name}
                className="w-full h-full object-cover"
              />
            </div>
            {organizer.verified && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-surface">
                <Icon name="Check" size={16} color="white" />
              </div>
            )}
          </div>

          {/* Mobile Book Button */}
          <div className="sm:hidden mt-4">
            <button
              onClick={onBookingClick}
              className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-smooth hover-lift flex items-center justify-center space-x-2"
            >
              <Icon name="Calendar" size={20} />
              <span>Book This Organizer</span>
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-6 sm:mt-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                  {organizer.name}
                </h1>
                {organizer.verified && (
                  <div className="hidden sm:flex items-center space-x-1 text-primary">
                    <Icon name="ShieldCheck" size={20} />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 text-text-secondary mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} />
                  <span className="text-sm">{organizer.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span className="text-sm">{organizer.responseTime}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(organizer.rating)}
                  <span className="text-sm font-medium text-text-primary ml-2">
                    {organizer.rating}
                  </span>
                </div>
                <span className="text-sm text-text-secondary">
                  ({organizer.reviewCount} reviews)
                </span>
              </div>

              <p className="text-text-secondary text-sm sm:text-base max-w-2xl">
                {organizer.tagline}
              </p>
            </div>

            {/* Desktop Book Button */}
            <div className="hidden sm:block mt-4 sm:mt-0 sm:ml-6">
              <button
                onClick={onBookingClick}
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-smooth hover-lift flex items-center space-x-2"
              >
                <Icon name="Calendar" size={20} />
                <span>Book This Organizer</span>
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-text-primary">
                {organizer.completedEvents}
              </div>
              <div className="text-xs sm:text-sm text-text-secondary">
                Events Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-text-primary">
                {organizer.yearsExperience}
              </div>
              <div className="text-xs sm:text-sm text-text-secondary">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-text-primary">
                {organizer.rating}
              </div>
              <div className="text-xs sm:text-sm text-text-secondary">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;