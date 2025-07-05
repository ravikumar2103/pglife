import React from 'react';

interface FooterProps {
  onCityClick: (city: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onCityClick }) => {
  const cities = [
    { name: 'PG in Delhi', key: 'delhi' },
    { name: 'PG in Mumbai', key: 'mumbai' },
    { name: 'PG in Bangalore', key: 'bengaluru' },
    { name: 'PG in Hyderabad', key: 'hyderabad' },
    { name: 'PG in Vizag', key: 'vizag' }
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          {cities.map((city) => (
            <div key={city.key} className="text-center">
              <button 
                onClick={() => onCityClick(city.key)}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {city.name}
              </button>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            © 2025 Copyright PG Life
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;