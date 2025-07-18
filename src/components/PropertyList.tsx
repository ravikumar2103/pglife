import React, { useState } from 'react';
import { Star, Heart, Filter, ArrowUpDown, Home } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  rating: number;
  image: string;
  liked: boolean;
  gender: 'male' | 'female' | 'unisex';
  city: string;
}

interface PropertyListProps {
  city: string;
  onPropertyView: (propertyId: string) => void;
  onBackToHome?: () => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ city, onPropertyView, onBackToHome }) => {
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating'>('rating');
  const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set());

  // Available cities
  const availableCities = ['delhi', 'mumbai', 'bengaluru', 'hyderabad', 'chennai', 'vizag'];
  
  // Check if the searched city is available
  const isCityAvailable = availableCities.includes(city.toLowerCase());

  // Sample property data for available cities
  const allProperties: Property[] = [
    {
      id: '1',
      name: 'Navkar Paying Guest',
      address: 'Andheri East, Mumbai, Maharashtra 400069',
      price: 9500,
      rating: 4.2,
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'male',
      city: 'mumbai'
    },
    {
      id: '2',
      name: 'PG for Girls Borivali West',
      address: 'Borivali West, Mumbai, Maharashtra 400092',
      price: 8000,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'female',
      city: 'mumbai'
    },
    {
      id: '3',
      name: 'Ganpati Paying Guest',
      address: 'Powai, Mumbai, Maharashtra 400076',
      price: 7500,
      rating: 4.0,
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'unisex',
      city: 'mumbai'
    },
    {
      id: '4',
      name: 'Modern Living PG',
      address: 'Bandra West, Mumbai, Maharashtra 400050',
      price: 12000,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'unisex',
      city: 'mumbai'
    },
    {
      id: '5',
      name: 'Comfort Zone PG',
      address: 'Malad East, Mumbai, Maharashtra 400097',
      price: 6500,
      rating: 3.8,
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'male',
      city: 'mumbai'
    },
    // Delhi properties
    {
      id: '6',
      name: 'Delhi Central PG',
      address: 'Connaught Place, New Delhi, Delhi 110001',
      price: 8500,
      rating: 4.3,
      image: '/chennai.png',
      liked: false,
      gender: 'unisex',
      city: 'delhi'
    },
    {
      id: '7',
      name: 'Karol Bagh PG',
      address: 'Karol Bagh, New Delhi, Delhi 110005',
      price: 7000,
      rating: 4.1,
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'male',
      city: 'delhi'
    },
    // Bengaluru properties
    {
      id: '8',
      name: 'Koramangala PG',
      address: 'Koramangala, Bengaluru, Karnataka 560034',
      price: 9000,
      rating: 4.4,
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'female',
      city: 'bengaluru'
    },
    {
      id: '9',
      name: 'Whitefield PG',
      address: 'Whitefield, Bengaluru, Karnataka 560066',
      price: 8200,
      rating: 4.0,
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'unisex',
      city: 'bengaluru'
    },
    // Hyderabad properties
    {
      id: '10',
      name: 'Hitech City PG',
      address: 'Hitech City, Hyderabad, Telangana 500081',
      price: 7800,
      rating: 4.2,
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'male',
      city: 'hyderabad'
    },
    {
      id: '11',
      name: 'Gachibowli PG',
      address: 'Gachibowli, Hyderabad, Telangana 500032',
      price: 8500,
      rating: 4.3,
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'female',
      city: 'hyderabad'
    },
    // Chennai properties
    {
      id: '17',
      name: 'Marina Beach PG',
      address: 'Marina Beach Road, Chennai, Tamil Nadu 600001',
      price: 8200,
      rating: 4.3,
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'male',
      city: 'chennai'
    },
    {
      id: '18',
      name: 'T Nagar Ladies PG',
      address: 'T Nagar, Chennai, Tamil Nadu 600017',
      price: 7500,
      rating: 4.4,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'female',
      city: 'chennai'
    },
    {
      id: '19',
      name: 'Anna Nagar PG',
      address: 'Anna Nagar, Chennai, Tamil Nadu 600040',
      price: 9000,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'unisex',
      city: 'chennai'
    },
    {
      id: '20',
      name: 'Velachery IT PG',
      address: 'Velachery, Chennai, Tamil Nadu 600042',
      price: 8800,
      rating: 4.2,
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'male',
      city: 'chennai'
    },
    {
      id: '21',
      name: 'Adyar Premium PG',
      address: 'Adyar, Chennai, Tamil Nadu 600020',
      price: 10500,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'female',
      city: 'chennai'
    },
    {
      id: '22',
      name: 'Mylapore Heritage PG',
      address: 'Mylapore, Chennai, Tamil Nadu 600004',
      price: 7800,
      rating: 4.1,
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'unisex',
      city: 'chennai'
    },
    // Vizag properties
    {
      id: '12',
      name: 'Beach View PG',
      address: 'RK Beach Road, Visakhapatnam, Andhra Pradesh 530003',
      price: 6500,
      rating: 4.1,
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'male',
      city: 'vizag'
    },
    {
      id: '13',
      name: 'Coastal Comfort PG',
      address: 'MVP Colony, Visakhapatnam, Andhra Pradesh 530017',
      price: 7200,
      rating: 4.4,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'female',
      city: 'vizag'
    },
    {
      id: '14',
      name: 'Port City PG',
      address: 'Dwaraka Nagar, Visakhapatnam, Andhra Pradesh 530016',
      price: 5800,
      rating: 3.9,
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'unisex',
      city: 'vizag'
    },
    {
      id: '15',
      name: 'Steel City PG',
      address: 'Gajuwaka, Visakhapatnam, Andhra Pradesh 530026',
      price: 6800,
      rating: 4.2,
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'male',
      city: 'vizag'
    },
    {
      id: '16',
      name: 'Lighthouse PG',
      address: 'Kailasagiri, Visakhapatnam, Andhra Pradesh 530005',
      price: 7500,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
      liked: false,
      gender: 'female',
      city: 'vizag'
    }
  ];

  // Filter properties by city
  const cityProperties = allProperties.filter(property => 
    property.city.toLowerCase() === city.toLowerCase()
  );

  const sortedProperties = [...cityProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const toggleLike = (propertyId: string) => {
    const newLiked = new Set(likedProperties);
    if (newLiked.has(propertyId)) {
      newLiked.delete(propertyId);
    } else {
      newLiked.add(propertyId);
    }
    setLikedProperties(newLiked);
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return '♂️';
      case 'female':
        return '♀️';
      case 'unisex':
        return '⚥';
      default:
        return '⚥';
    }
  };

  const getCityName = (cityKey: string) => {
    const cityMap: { [key: string]: string } = {
      delhi: 'Delhi',
      mumbai: 'Mumbai',
      bengaluru: 'Bengaluru',
      hyderabad: 'Hyderabad',
      chennai: 'Chennai',
      vizag: 'Vizag'
    };
    return cityMap[cityKey.toLowerCase()] || cityKey;
  };

  // If city is not available, show not available message
  if (!isCityAvailable) {
    return (
      <div className="min-h-screen bg-light py-4 page-transition">
        <div className="container">
          <div className="text-center py-20">
            <div className="mb-6">
              <Home className="mx-auto text-gray-400 mb-4" size={80} />
              <h1 className="h2 fw-bold text-dark mb-4">
                PGs not available in "{getCityName(city)}"
              </h1>
              <p className="text-muted mb-6 lead">
                We're sorry, but we don't have any PG accommodations available in {getCityName(city)} at the moment.
              </p>
              <p className="text-muted mb-6">
                We currently serve the following cities:
              </p>
              <div className="row justify-content-center mb-6">
                <div className="col-md-6">
                  <div className="list-group">
                    <div className="list-group-item border-0 bg-transparent text-center">
                      <strong className="text-teal-600">🏙️ Delhi</strong>
                    </div>
                    <div className="list-group-item border-0 bg-transparent text-center">
                      <strong className="text-teal-600">🌊 Mumbai</strong>
                    </div>
                    <div className="list-group-item border-0 bg-transparent text-center">
                      <strong className="text-teal-600">🌳 Bengaluru</strong>
                    </div>
                    <div className="list-group-item border-0 bg-transparent text-center">
                      <strong className="text-teal-600">💎 Hyderabad</strong>
                    </div>
                    <div className="list-group-item border-0 bg-transparent text-center">
                      <strong className="text-teal-600">🏛️ Chennai</strong>
                    </div>
                    <div className="list-group-item border-0 bg-transparent text-center">
                      <strong className="text-teal-600">🏖️ Vizag</strong>
                    </div>
                  </div>
                </div>
              </div>
              {onBackToHome && (
                <button
                  onClick={onBackToHome}
                  className="btn btn-success btn-lg px-5 py-3 hover-glow"
                >
                  Back to Home
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-4 page-transition">
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <h1 className="h2 fw-bold text-dark mb-2 hover:text-teal-600 transition-colors duration-300">
            PG in {getCityName(city)}
          </h1>
          <p className="text-muted">{sortedProperties.length} properties found</p>
        </div>

        {/* Filters */}
        <div className="card shadow-sm mb-4 hover-lift">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <Filter className="me-2 text-muted transition-transform duration-300 hover:scale-110" size={20} />
                  <span className="fw-medium text-dark">Filter & Sort</span>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="d-flex align-items-center justify-content-md-end">
                  <ArrowUpDown className="me-2 text-muted transition-transform duration-300 hover:scale-110" size={20} />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="form-select hover-glow"
                    style={{ maxWidth: '200px' }}
                  >
                    <option value="rating">Highest Rated First</option>
                    <option value="price-low">Lowest Rent First</option>
                    <option value="price-high">Highest Rent First</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property List */}
        <div className="row g-4">
          {sortedProperties.map((property, index) => (
            <div key={property.id} className="col-12" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="property-card card shadow-sm h-100 border-0">
                <div className="row g-0">
                  {/* Property Image */}
                  <div className="col-md-4">
                    <div className="overflow-hidden" style={{ borderRadius: '16px 0 0 16px' }}>
                      <img
                        src={property.image}
                        alt={property.name}
                        className="img-fluid h-100 w-100"
                        style={{ objectFit: 'cover', minHeight: '250px' }}
                      />
                    </div>
                  </div>
                  
                  {/* Property Details */}
                  <div className="col-md-8">
                    <div className="card-body h-100 d-flex flex-column">
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <div className="star-rating d-flex align-items-center mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`me-1 transition-all duration-300 hover:scale-125 ${
                                    i < Math.floor(property.rating)
                                      ? 'text-warning'
                                      : 'text-muted'
                                  }`}
                                  size={16}
                                  fill={i < Math.floor(property.rating) ? 'currentColor' : 'none'}
                                />
                              ))}
                              <span className="ms-2 small text-muted">
                                {property.rating}
                              </span>
                            </div>
                            
                            <h3 className="h5 fw-bold text-dark mb-2 hover:text-teal-600 transition-colors duration-300">
                              {property.name}
                            </h3>
                            
                            <p className="text-muted mb-2 small">{property.address}</p>
                            
                            <div className="d-flex align-items-center mb-3">
                              <span className="fs-4 me-2 transition-transform duration-300 hover:scale-125">{getGenderIcon(property.gender)}</span>
                              <span className="small text-muted text-capitalize">
                                {property.gender}
                              </span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => toggleLike(property.id)}
                            className={`heart-button btn btn-outline-danger rounded-circle p-2 ${
                              likedProperties.has(property.id) ? 'liked' : ''
                            }`}
                          >
                            <Heart
                              className={likedProperties.has(property.id) ? 'text-danger' : ''}
                              size={18}
                              fill={likedProperties.has(property.id) ? 'currentColor' : 'none'}
                            />
                          </button>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="h4 fw-bold text-dark hover:text-teal-600 transition-colors duration-300">
                            ₹ {property.price.toLocaleString()}
                          </span>
                          <span className="text-muted ms-1 small">per month</span>
                        </div>
                        
                        <button
                          onClick={() => onPropertyView(property.id)}
                          className="btn btn-success px-4 hover-glow"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyList;