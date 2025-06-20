import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Breadcrumb from 'components/ui/Breadcrumb';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookingFilter, setBookingFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  const mockBookings = [
    {
      id: 1,
      eventDate: "2024-02-15",
      organizerName: "Kalinga Events Co.",
      organizerImage: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?w=80&h=80&fit=crop",
      location: "Bhubaneswar, Odisha",
      eventType: "Corporate Event",
      status: "confirmed",
      bookingDate: "2024-01-20",
      totalAmount: "₹2,50,000",
      description: "Annual company retreat planning and coordination"
    },
    {
      id: 2,
      eventDate: "2024-03-08",
      organizerName: "Jagannath Dream Day Events",
      organizerImage: "https://images.pexels.com/photos/1983046/pexels-photo-1983046.jpeg?w=80&h=80&fit=crop",
      location: "Berhampur, Odisha",
      eventType: "Wedding",
      status: "pending",
      bookingDate: "2024-01-25",
      totalAmount: "₹5,80,000",
      description: "Complete wedding planning and day-of coordination"
    },
    {
      id: 3,
      eventDate: "2024-01-10",
      organizerName: "Sambalpuri Festive Functions",
      organizerImage: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?w=80&h=80&fit=crop",
      location: "Sambalpur, Odisha",
      eventType: "Birthday Party",
      status: "completed",
      bookingDate: "2023-12-15",
      totalAmount: "₹1,20,000",
      description: "Kids birthday party with entertainment and decorations"
    },
    {
      id: 4,
      eventDate: "2024-01-05",
      organizerName: "Odisha Premier Party Planners",
      organizerImage: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?w=80&h=80&fit=crop",
      location: "Puri, Odisha",
      eventType: "Conference",
      status: "cancelled",
      bookingDate: "2023-12-20",
      totalAmount: "₹3,20,000",
      description: "Tech conference organization and management"
    }
  ];

  const mockFavorites = [
    {
      id: 1,
      name: "Kalinga Events Co.",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?w=300&h=200&fit=crop",
      location: "Bhubaneswar, Odisha",
      rating: 4.9,
      reviewCount: 127,
      tagline: "Creating unforgettable moments with Odia elegance",
      specialties: ["Corporate Events", "Conferences", "Team Building"]
    },
    {
      id: 2,
      name: "Jagannath Dream Day Events",
      image: "https://images.pexels.com/photos/1983046/pexels-photo-1983046.jpeg?w=300&h=200&fit=crop",
      location: "Berhampur, Odisha",
      rating: 4.8,
      reviewCount: 89,
      tagline: "Making your dream wedding come true",
      specialties: ["Weddings", "Engagements", "Bridal Showers"]
    },
    {
      id: 3,
      name: "Utkal Celebration Masters",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?w=300&h=200&fit=crop",
      location: "Cuttack, Odisha",
      rating: 4.7,
      reviewCount: 156,
      tagline: "Every celebration deserves perfection",
      specialties: ["Birthday Parties", "Anniversaries", "Social Events"]
    }
  ];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (!token || !userData) {
      navigate('/login-register', { state: { from: location } });
      return;
    }

    setUserProfile(JSON.parse(userData));
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-secondary-100 text-secondary-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-accent-100 text-accent-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'completed':
        return 'Calendar';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const filteredBookings = mockBookings.filter(booking => {
    if (bookingFilter === 'all') return true;
    return booking.status === bookingFilter;
  });

  const handleProfileSave = () => {
    setIsEditing(false);
    // Update localStorage with new profile data
    localStorage.setItem('userData', JSON.stringify(userProfile));
  };

  const handleRemoveFavorite = (organizerId) => {
    // Mock remove functionality
    console.log('Removing favorite:', organizerId);
  };

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: 'Calendar' },
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'settings', label: 'Account Settings', icon: 'Settings' },
    { id: 'favorites', label: 'Favorites', icon: 'Heart' }
  ];

  const statusFilters = [
    { id: 'all', label: 'All Bookings' },
    { id: 'pending', label: 'Pending' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        {/* Welcome Section */}
        <div className="bg-surface rounded-lg shadow-card p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-primary-100">
              <Image
                src={userProfile.avatar || "https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?w=150&h=150&fit=crop&crop=face"}
                alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                Welcome back, {userProfile.name}!
              </h1>
              <p className="text-text-secondary">
                Manage your bookings and account settings
              </p>
            </div>
          </div>
        </div>

        <div className="lg:flex lg:space-x-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <div className="bg-surface rounded-lg shadow-card p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-smooth ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary border-l-4 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                    }`}
                  >
                    <Icon name={tab.icon} size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden mb-6">
            <div className="bg-surface rounded-lg shadow-card p-2">
              <div className="flex space-x-1 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* My Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="bg-surface rounded-lg shadow-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h2 className="text-xl font-semibold text-text-primary mb-4 sm:mb-0">
                      My Bookings
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {statusFilters.map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => setBookingFilter(filter.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-smooth ${
                            bookingFilter === filter.id
                              ? 'bg-primary text-white' :'bg-gray-100 text-text-secondary hover:bg-gray-200'
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-card transition-smooth"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={booking.organizerImage}
                              alt={booking.organizerName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-text-primary">
                                  {booking.organizerName}
                                </h3>
                                <p className="text-sm text-text-secondary">
                                  {booking.eventType} • {booking.location}
                                </p>
                              </div>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                              >
                                <Icon
                                  name={getStatusIcon(booking.status)}
                                  size={12}
                                  className="mr-1"
                                />
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            
                            <p className="text-sm text-text-secondary mb-3">
                              {booking.description}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-text-secondary">
                              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                                <span className="flex items-center">
                                  <Icon name="Calendar" size={14} className="mr-1" />
                                  Event: {new Date(booking.eventDate).toLocaleDateString()}
                                </span>
                                <span className="flex items-center">
                                  <Icon name="IndianRupee" size={14} className="mr-1" />
                                  {booking.totalAmount}
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Link
                                  to="/organizer-profile"
                                  className="text-primary hover:text-primary-700 font-medium"
                                >
                                  View Details
                                </Link>
                                <span className="text-gray-300">•</span>
                                <button className="text-primary hover:text-primary-700 font-medium">
                                  Contact Support
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredBookings.length === 0 && (
                    <div className="text-center py-12">
                      <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        No bookings found
                      </h3>
                      <p className="text-text-secondary mb-6">
                        {bookingFilter === 'all' ? "You haven't made any bookings yet."
                          : `No ${bookingFilter} bookings found.`}
                      </p>
                      <Link
                        to="/search-results"
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-smooth"
                      >
                        <Icon name="Search" size={16} className="mr-2" />
                        Find Organizers
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-surface rounded-lg shadow-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-text-primary">
                      My Profile
                    </h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary-50 transition-smooth"
                      >
                        <Icon name="Edit" size={16} />
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 text-text-secondary border border-gray-300 rounded-lg hover:bg-gray-50 transition-smooth"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleProfileSave}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-primary-100">
                        <Image
                          src={userProfile.avatar || "https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?w=150&h=150&fit=crop&crop=face"}
                          alt={userProfile.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {isEditing && (
                        <button className="flex items-center space-x-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary-50 transition-smooth">
                          <Icon name="Camera" size={16} />
                          <span>Change Photo</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userProfile.name}
                            onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                          />
                        ) : (
                          <p className="text-text-secondary">{userProfile.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={userProfile.email}
                            onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                          />
                        ) : (
                          <p className="text-text-secondary">{userProfile.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={userProfile.phone || ''}
                            onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                          />
                        ) : (
                          <p className="text-text-secondary">{userProfile.phone || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Location
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userProfile.location || ''}
                            onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                          />
                        ) : (
                          <p className="text-text-secondary">{userProfile.location || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Notification Preferences */}
                <div className="bg-surface rounded-lg shadow-card p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-text-primary">Email Notifications</h4>
                        <p className="text-sm text-text-secondary">
                          Receive updates about your bookings via email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-text-primary">SMS Notifications</h4>
                        <p className="text-sm text-text-secondary">
                          Get text messages for important booking updates
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-text-primary">Marketing Communications</h4>
                        <p className="text-sm text-text-secondary">
                          Receive promotional offers and platform updates
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Password Change */}
                <div className="bg-surface rounded-lg shadow-card p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Change Password
                  </h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                      />
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <div className="bg-surface rounded-lg shadow-card p-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-6">
                    Favorite Organizers
                  </h2>

                  {mockFavorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockFavorites.map((organizer) => (
                        <div
                          key={organizer.id}
                          className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-card transition-smooth"
                        >
                          <div className="relative">
                            <div className="h-48 overflow-hidden">
                              <Image
                                src={organizer.image}
                                alt={organizer.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveFavorite(organizer.id)}
                              className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-smooth"
                            >
                              <Icon name="Heart" size={16} className="text-accent fill-current" />
                            </button>
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-semibold text-text-primary mb-1">
                              {organizer.name}
                            </h3>
                            <p className="text-sm text-text-secondary mb-2 flex items-center">
                              <Icon name="MapPin" size={14} className="mr-1" />
                              {organizer.location}
                            </p>
                            
                            <div className="flex items-center mb-3">
                              <div className="flex items-center">
                                <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                                <span className="text-sm font-medium text-text-primary ml-1">
                                  {organizer.rating}
                                </span>
                                <span className="text-sm text-text-secondary ml-1">
                                  ({organizer.reviewCount} reviews)
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-sm text-text-secondary mb-3">
                              {organizer.tagline}
                            </p>
                            
                            <div className="flex flex-wrap gap-1 mb-4">
                              {organizer.specialties.slice(0, 2).map((specialty, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full"
                                >
                                  {specialty}
                                </span>
                              ))}
                              {organizer.specialties.length > 2 && (
                                <span className="px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded-full">
                                  +{organizer.specialties.length - 2} more
                                </span>
                              )}
                            </div>
                            
                            <div className="flex space-x-2">
                              <Link
                                to="/organizer-profile"
                                className="flex-1 px-3 py-2 border border-primary text-primary text-center rounded-lg hover:bg-primary-50 transition-smooth text-sm font-medium"
                              >
                                View Profile
                              </Link>
                              <Link
                                to="/booking-form"
                                className="flex-1 px-3 py-2 bg-primary text-white text-center rounded-lg hover:bg-primary-700 transition-smooth text-sm font-medium"
                              >
                                Book Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Heart" size={48} className="text-text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        No favorites yet
                      </h3>
                      <p className="text-text-secondary mb-6">
                        Save your favorite organizers to easily find them later
                      </p>
                      <Link
                        to="/search-results"
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-smooth"
                      >
                        <Icon name="Search" size={16} className="mr-2" />
                        Browse Organizers
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;