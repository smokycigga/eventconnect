import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import Breadcrumb from 'components/ui/Breadcrumb';
import FilterSidebar from './components/FilterSidebar';
import OrganizerCard from './components/OrganizerCard';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: '',
    rating: '',
    availability: '',
    priceRange: '',
    category: ''
  });

  // Mock organizer data
  const mockOrganizers = [
    {
      id: 1,
      name: "Kalinga Events Co.",
      thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      location: "Bhubaneswar, Odisha",
      rating: 4.8,
      reviewCount: 156,
      tagline: "Creating unforgettable experiences with premium event management services",
      category: "Wedding Planner",
      priceRange: "₹50,000 - ₹2,00,000",
      availability: "Available",
      verified: true,
      responseTime: "Within 2 hours"
    },
    {
      id: 2,
      name: "Utkal Celebration Masters",
      thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      location: "Cuttack, Odisha",
      rating: 4.6,
      reviewCount: 89,
      tagline: "Specializing in corporate events and brand activations",
      category: "Corporate Events",
      priceRange: "₹25,000 - ₹1,50,000",
      availability: "Available",
      verified: true,
      responseTime: "Within 4 hours"
    },
    {
      id: 3,
      name: "Odisha Premier Party Planners",
      thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
      location: "Puri, Odisha",
      rating: 4.9,
      reviewCount: 203,
      tagline: "Traditional and modern celebrations with cultural authenticity",
      category: "Cultural Events",
      priceRange: "₹30,000 - ₹1,80,000",
      availability: "Busy until Dec 15",
      verified: true,
      responseTime: "Within 1 hour"
    },
    {
      id: 4,
      name: "Jagannath Dream Day Events",
      thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      location: "Berhampur, Odisha",
      rating: 4.4,
      reviewCount: 67,
      tagline: "Fun-filled birthday parties and social gatherings",
      category: "Birthday Parties",
      priceRange: "₹15,000 - ₹75,000",
      availability: "Available",
      verified: false,
      responseTime: "Within 6 hours"
    },
    {
      id: 5,
      name: "Sambalpuri Festive Functions",
      thumbnail: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
      location: "Sambalpur, Odisha",
      rating: 4.7,
      reviewCount: 134,
      tagline: "Luxury event planning with attention to every detail",
      category: "Luxury Events",
      priceRange: "₹1,00,000 - ₹5,00,000",
      availability: "Available",
      verified: true,
      responseTime: "Within 3 hours"
    },
    {
      id: 6,
      name: "Konark Luxury Event Designers",
      thumbnail: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop",
      location: "Konark, Odisha,
      rating: 4.5,
      reviewCount: 92,
      tagline: "Innovative themes and creative event solutions",
      category: "Theme Parties",
      priceRange: "₹20,000 - ₹1,20,000",
      availability: "Available",
      verified: true,
      responseTime: "Within 2 hours"
    }
  ];

  const [filteredOrganizers, setFilteredOrganizers] = useState(mockOrganizers);
  const [displayedOrganizers, setDisplayedOrganizers] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q') || '';
    setSearchQuery(query);
  }, [location.search]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sortBy, searchQuery]);

  useEffect(() => {
    // Simulate pagination
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    setDisplayedOrganizers(filteredOrganizers.slice(0, endIndex));
  }, [filteredOrganizers, currentPage]);

  const applyFiltersAndSort = () => {
    let filtered = [...mockOrganizers];

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(organizer =>
        organizer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        organizer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        organizer.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        organizer.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(organizer =>
        organizer.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(organizer => organizer.rating >= minRating);
    }

    // Apply availability filter
    if (filters.availability) {
      filtered = filtered.filter(organizer =>
        organizer.availability.toLowerCase().includes(filters.availability.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(organizer =>
        organizer.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredOrganizers(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterKey) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: ''
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      location: '',
      rating: '',
      availability: '',
      priceRange: '',
      category: ''
    });
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoading(false);
    }, 1000);
  };

  const handleOrganizerClick = (organizerId) => {
    navigate(`/organizer-profile?id=${organizerId}`);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage' },
    { label: 'Search Results', path: '/search-results', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb customItems={breadcrumbItems} />
        
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Event Organizers'}
          </h1>
          <p className="text-text-secondary">
            {filteredOrganizers.length} organizer{filteredOrganizers.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Filter Chips - Mobile/Tablet */}
        <div className="lg:hidden mb-6">
          <FilterChips
            filters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAllFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Filter Controls */}
            <div className="flex items-center justify-between mb-6">
              <SortDropdown
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-surface border border-gray-200 rounded-lg text-text-secondary hover:text-text-primary hover:border-primary transition-smooth"
              >
                <Icon name="Filter" size={20} />
                <span>Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Results Grid */}
            {displayedOrganizers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {displayedOrganizers.map((organizer) => (
                  <OrganizerCard
                    key={organizer.id}
                    organizer={organizer}
                    onClick={() => handleOrganizerClick(organizer.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">No organizers found</h3>
                <p className="text-text-secondary mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {displayedOrganizers.length < filteredOrganizers.length && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="px-8 py-3 bg-surface border border-gray-200 text-text-primary rounded-lg hover:bg-gray-50 hover:border-primary transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    'Load More Organizers'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-surface shadow-modal transform transition-layout">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-full pb-20">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAllFilters}
                isMobile={true}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-surface border-t border-gray-200">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
              >
                Apply Filters ({filteredOrganizers.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;