import React from 'react';
import Icon from 'components/AppIcon';

const ProfileInfo = ({ organizer }) => {
  return (
    <div className="space-y-8">
      {/* About Section */}
      <div className="bg-surface rounded-xl shadow-card p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-4">About</h3>
        <div className="prose prose-lg max-w-none text-text-secondary">
          <p className="whitespace-pre-line">{organizer.bio}</p>
        </div>
      </div>

      {/* Services & Pricing */}
      <div className="bg-surface rounded-xl shadow-card p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Services & Pricing</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Services */}
          <div>
            <h4 className="font-medium text-text-primary mb-3 flex items-center">
              <Icon name="CheckCircle" size={20} className="text-secondary mr-2" />
              Services Offered
            </h4>
            <div className="space-y-2">
              {organizer.services.map((service, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-secondary" />
                  <span className="text-text-secondary">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h4 className="font-medium text-text-primary mb-3 flex items-center">
              <Icon name="DollarSign" size={20} className="text-primary mr-2" />
              Pricing Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Price Range</span>
                <span className="font-semibold text-text-primary">{organizer.priceRange}</span>
              </div>
              <div className="text-sm text-text-muted">
                * Final pricing depends on event requirements, duration, and location
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specialties */}
      <div className="bg-surface rounded-xl shadow-card p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-4">Specialties</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {organizer.specialties.map((specialty, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 p-3 bg-secondary-50 rounded-lg"
            >
              <Icon name="Award" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-secondary">{specialty}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="bg-surface rounded-xl shadow-card p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-4">Availability</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={20} className="text-primary" />
            <div>
              <div className="font-medium text-text-primary">Current Status</div>
              <div className="text-sm text-text-secondary">{organizer.availability}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={20} className="text-primary" />
            <div>
              <div className="font-medium text-text-primary">Response Time</div>
              <div className="text-sm text-text-secondary">{organizer.responseTime}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-primary-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-text-primary mb-1">Booking Process</h4>
              <p className="text-sm text-text-secondary">
                Submit your event requirements through our booking form. We'll connect you with the organizer within {organizer.responseTime.toLowerCase()} to discuss details and confirm availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;