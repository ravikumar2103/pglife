import React from 'react';

interface MajorCitiesProps {
  onCityClick: (city: string) => void;
}

const cities = [
  { 
    name: 'DELHI', 
    key: 'delhi',
    image: '/delhi.png',
    alt: 'India Gate - Delhi'
  },
  { 
    name: 'MUMBAI', 
    key: 'mumbai',
    image: '/mumbai.png',
    alt: 'Gateway of India - Mumbai'
  },
  { 
    name: 'BENGALURU', 
    key: 'bengaluru',
    image: '/bangalore.png',
    alt: 'Vidhana Soudha - Bengaluru'
  },
  { 
    name: 'HYDERABAD', 
    key: 'hyderabad',
    image: '/hyderabad.png',
    alt: 'Charminar - Hyderabad'
  },
  { 
    name: 'CHENNAI', 
    key: 'chennai',
    image: '/chennai.png',
    alt: 'Marina Beach - Chennai'
  },
  { 
    name: 'VIZAG', 
    key: 'vizag',
    image: '/vizag.png',
    alt: 'Lighthouse - Vizag'
  }
];

const MajorCities: React.FC<MajorCitiesProps> = ({ onCityClick }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16 hover:text-teal-600 transition-colors duration-300">
          Major Cities
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {cities.map((city) => (
            <div key={city.key} className="text-center">
              <button
                onClick={() => onCityClick(city.key)}
                className="city-button group mx-auto mb-6 block focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300 focus-visible:ring-opacity-50 rounded-full"
              >
                <div className="city-icon w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full shadow-lg border-4 border-gray-100 group-hover:border-teal-500 group-hover:shadow-2xl transition-all duration-500 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src={city.image} 
                    alt={city.alt}
                    className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300 relative z-10"
                  />
                </div>
              </button>
              <p className="city-name text-lg font-semibold text-gray-700 transition-all duration-300">
                {city.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MajorCities;