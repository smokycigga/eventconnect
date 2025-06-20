// src/pages/contact-us/components/LocationMap.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const LocationMap = () => {
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const officeLocations = [
    {
      id: 1,
      name: 'EventConnect Odisha - Main Office',
      address: 'Plot No. 123, Saheed Nagar, Bhubaneswar, Odisha 751007',
      phone: '+91 674 XXX XXXX',
      type: 'main',
      coordinates: { lat: 20.3080, lng: 85.8245 },
      mapUrl: 'https://maps.google.com/?q=Saheed+Nagar+Bhubaneswar+Odisha'
    },
    {
      id: 2,
      name: 'EventConnect Odisha - Cuttack Branch',
      address: 'Buxi Bazaar, Cuttack, Odisha 753001',
      phone: '+91 671 XXX XXXX',
      type: 'branch',
      coordinates: { lat: 20.4625, lng: 85.8830 },
      mapUrl: 'https://maps.google.com/?q=Buxi+Bazaar+Cuttack+Odisha'
    }
  ];

  const handleZoomIn = () => {
    setIsMapExpanded(true);
  };

  const handleZoomOut = () => {
    setIsMapExpanded(false);
  };

  return (
    <section className="py-16 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Find Us in Odisha
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Visit our offices or connect with our team across Bhubaneswar and other major cities in Odisha
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Interactive Map Placeholder */}
          <div className="order-2 lg:order-1">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden h-96 lg:h-full min-h-96">
              {/* Map Placeholder - In real implementation, integrate with Google Maps or similar */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
                <Image
                  src="https://images.pexels.com/photos/7412058/pexels-photo-7412058.jpeg?w=600&h=400&fit=crop&crop=center"
                  alt="Bhubaneswar City Map View"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="MapPin" size={32} color="white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Bhubaneswar, Odisha</h3>
                    <p className="text-lg opacity-90">Our Main Office Location</p>
                  </div>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button
                  onClick={handleZoomIn}
                  className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-smooth"
                  title="Zoom In"
                >
                  <Icon name="Plus" size={20} className="text-text-primary" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-smooth"
                  title="Zoom Out"
                >
                  <Icon name="Minus" size={20} className="text-text-primary" />
                </button>
                <a
                  href="https://maps.google.com/?q=Saheed+Nagar+Bhubaneswar+Odisha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-smooth"
                  title="Open in Google Maps"
                >
                  <Icon name="ExternalLink" size={20} className="text-text-primary" />
                </a>
              </div>

              {/* Location Markers */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                  <div className="absolute -top-2 -left-2 w-12 h-12 bg-primary rounded-full opacity-30 animate-ping"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Office Locations
              </h3>
              <p className="text-text-secondary">
                We have strategically located offices across Odisha to better serve our clients throughout the state.
              </p>
            </div>

            {officeLocations.map((location) => (
              <div key={location.id} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      location.type === 'main' ?'bg-primary text-white' :'bg-secondary text-white'
                    }`}>
                      <Icon name="MapPin" size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-text-primary">
                        {location.name}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        location.type === 'main' ?'bg-primary-100 text-primary' :'bg-secondary-100 text-secondary'
                      }`}>
                        {location.type === 'main' ? 'Main Office' : 'Branch Office'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="MapPin" size={16} className="text-text-muted mt-1" />
                    <p className="text-text-secondary text-sm">{location.address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={16} className="text-text-muted" />
                    <a href={`tel:${location.phone}`} className="text-text-secondary text-sm hover:text-primary transition-smooth">
                      {location.phone}
                    </a>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-primary hover:text-primary-700 font-medium text-sm transition-smooth"
                    >
                      <Icon name="Navigation" size={14} />
                      <span>Get Directions</span>
                    </a>
                    <a
                      href={`tel:${location.phone}`}
                      className="flex items-center space-x-2 text-secondary hover:text-secondary-700 font-medium text-sm transition-smooth"
                    >
                      <Icon name="Phone" size={14} />
                      <span>Call Office</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Service Coverage */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-text-primary mb-3 flex items-center space-x-2">
                <Icon name="Globe" size={20} className="text-primary" />
                <span>Service Coverage</span>
              </h4>
              <p className="text-text-secondary text-sm mb-4">
                While our offices are in Bhubaneswar and Cuttack, we provide event planning services throughout Odisha, including remote consultations and on-site coordination.
              </p>
              <div className="flex items-center space-x-2 text-primary font-medium text-sm">
                <Icon name="Check" size={16} />
                <span>Statewide Service Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;