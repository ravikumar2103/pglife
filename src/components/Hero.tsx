import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface HeroProps {
  onCitySearch?: (city: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onCitySearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Available cities mapping (case-insensitive)
  const availableCities: { [key: string]: string } = {
    'delhi': 'delhi',
    'mumbai': 'mumbai',
    'bengaluru': 'bengaluru',
    'bangalore': 'bengaluru', // Alternative name
    'hyderabad': 'hyderabad',
    'vizag': 'vizag',
    'visakhapatnam': 'vizag' // Alternative name
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onCitySearch) {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const cityKey = availableCities[normalizedQuery];
      
      if (cityKey) {
        // City found - navigate to property list
        onCitySearch(cityKey);
      } else {
        // City not found - show not available message
        onCitySearch(searchQuery.trim());
      }
    }
  };

  return (
    <div 
      className="relative h-[70vh] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/bg.jpg')`
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 hover:scale-105 transition-transform duration-500 cursor-default">
            Happiness per Square Foot
          </h1>
          
          <form onSubmit={handleSearch} className="max-w-sm mx-auto">
            <div className="relative group">
              <input
                type="text"
                placeholder="Enter your city to search for PGs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full px-4 py-2.5 text-sm text-gray-800 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-opacity-50 pr-12 border-2 border-transparent focus:border-teal-300"
              />
              <button
                type="submit"
                className="search-button absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-opacity-50"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;