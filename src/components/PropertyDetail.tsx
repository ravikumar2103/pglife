import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  MapPin, 
  Shield, 
  Flame, 
  ArrowUp, 
  Camera, 
  Wifi, 
  Tv, 
  Droplets, 
  UtensilsCrossed, 
  WashingMachine, 
  Bed, 
  Thermometer,
  LogIn
} from 'lucide-react';
import PropertyCarousel from './PropertyCarousel';
import ScrollspyNavigation from './ScrollspyNavigation';
import { useAuth } from '../hooks/useAuth';

interface PropertyDetailProps {
  propertyId: string;
  onLoginClick?: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ propertyId, onLoginClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { isAuthenticated } = useAuth();

  // Sample property data
  const property = {
    id: propertyId,
    name: 'Navkar Paying Guest',
    address: 'Andheri East, Mumbai, Maharashtra 400069',
    price: 9500,
    rating: 4.2,
    gender: 'male',
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    amenities: {
      building: [
        { name: 'Power Backup', icon: Shield, available: true },
        { name: 'Fire Extinguisher', icon: Flame, available: true },
        { name: 'Lift', icon: ArrowUp, available: false },
        { name: 'CCTV', icon: Camera, available: true }
      ],
      commonArea: [
        { name: 'WiFi', icon: Wifi, available: true },
        { name: 'TV', icon: Tv, available: true },
        { name: 'Water Purifier', icon: Droplets, available: true },
        { name: 'Dining', icon: UtensilsCrossed, available: true },
        { name: 'Washing Machine', icon: WashingMachine, available: false }
      ],
      bedroom: [
        { name: 'Bed with Mattress', icon: Bed, available: true }
      ],
      washroom: [
        { name: 'Geyser', icon: Thermometer, available: true }
      ]
    }
  };

  const scrollspySections = [
    { id: 'property-overview', label: 'Overview' },
    { id: 'property-gallery', label: 'Gallery' },
    { id: 'property-amenities', label: 'Amenities' },
    { id: 'property-booking', label: 'Booking' }
  ];

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

  const handleBookingClick = () => {
    if (!isAuthenticated && onLoginClick) {
      onLoginClick();
    }
    // If user is authenticated, button acts as a dumb button (no action)
  };

  return (
    <div className="min-h-screen bg-light page-transition">
      {/* Scrollspy Navigation */}
      <div className="scrollspy-nav">
        <ScrollspyNavigation sections={scrollspySections} />
      </div>

      <div className="container py-4">
        {/* Property Gallery Section */}
        <section id="property-gallery" className="mb-5">
          <div className="card shadow-sm hover-lift">
            <PropertyCarousel images={property.images} propertyName={property.name} />
          </div>
        </section>

        {/* Property Overview Section */}
        <section id="property-overview" className="mb-5">
          <div className="card shadow-sm hover-lift">
            <div className="card-body p-4">
              <div className="row">
                <div className="col-lg-8">
                  <div className="star-rating d-flex align-items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`me-1 transition-all duration-300 hover:scale-125 ${
                          i < Math.floor(property.rating)
                            ? 'text-warning'
                            : 'text-muted'
                        }`}
                        size={20}
                        fill={i < Math.floor(property.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                    <span className="ms-2 text-muted">{property.rating}</span>
                  </div>
                  
                  <h1 className="h2 fw-bold text-dark mb-3 hover:text-teal-600 transition-colors duration-300">
                    {property.name}
                  </h1>
                  
                  <div className="d-flex align-items-center text-muted mb-3 hover:text-teal-600 transition-colors duration-300">
                    <MapPin className="me-2 transition-transform duration-300 hover:scale-110" size={18} />
                    <span>{property.address}</span>
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <span className="fs-2 me-2 transition-transform duration-300 hover:scale-125">{getGenderIcon(property.gender)}</span>
                    <span className="text-muted text-capitalize">{property.gender}</span>
                  </div>
                </div>
                
                <div className="col-lg-4 text-lg-end">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`heart-button btn btn-outline-danger rounded-circle p-2 mb-3 ${
                      isLiked ? 'liked' : ''
                    }`}
                  >
                    <Heart
                      className={isLiked ? 'text-danger' : ''}
                      size={24}
                      fill={isLiked ? 'currentColor' : 'none'}
                    />
                  </button>
                  
                  <div className="mb-4">
                    <span className="h2 fw-bold text-dark hover:text-teal-600 transition-colors duration-300">
                      ₹ {property.price.toLocaleString()}
                    </span>
                    <div className="text-muted">per month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section id="property-amenities" className="mb-5">
          <div className="card shadow-sm hover-lift">
            <div className="card-body p-4">
              <h2 className="h3 fw-bold text-dark mb-4 hover:text-teal-600 transition-colors duration-300">Amenities</h2>
              
              <div className="row g-4">
                {/* Building */}
                <div className="col-md-6 col-lg-3">
                  <h3 className="h6 fw-semibold text-uppercase text-muted mb-3">
                    Building
                  </h3>
                  <div className="list-group list-group-flush">
                    {property.amenities.building.map((amenity, index) => (
                      <div key={index} className="amenity-item list-group-item border-0 px-0 py-2">
                        <div className="d-flex align-items-center">
                          <amenity.icon 
                            className={`amenity-icon me-3 ${
                              amenity.available ? 'text-success' : 'text-muted'
                            }`}
                            size={18}
                          />
                          <span 
                            className={`small ${
                              amenity.available ? 'text-dark' : 'text-muted'
                            }`}
                          >
                            {amenity.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Area */}
                <div className="col-md-6 col-lg-3">
                  <h3 className="h6 fw-semibold text-uppercase text-muted mb-3">
                    Common Area
                  </h3>
                  <div className="list-group list-group-flush">
                    {property.amenities.commonArea.map((amenity, index) => (
                      <div key={index} className="amenity-item list-group-item border-0 px-0 py-2">
                        <div className="d-flex align-items-center">
                          <amenity.icon 
                            className={`amenity-icon me-3 ${
                              amenity.available ? 'text-success' : 'text-muted'
                            }`}
                            size={18}
                          />
                          <span 
                            className={`small ${
                              amenity.available ? 'text-dark' : 'text-muted'
                            }`}
                          >
                            {amenity.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bedroom */}
                <div className="col-md-6 col-lg-3">
                  <h3 className="h6 fw-semibold text-uppercase text-muted mb-3">
                    Bedroom
                  </h3>
                  <div className="list-group list-group-flush">
                    {property.amenities.bedroom.map((amenity, index) => (
                      <div key={index} className="amenity-item list-group-item border-0 px-0 py-2">
                        <div className="d-flex align-items-center">
                          <amenity.icon 
                            className={`amenity-icon me-3 ${
                              amenity.available ? 'text-success' : 'text-muted'
                            }`}
                            size={18}
                          />
                          <span 
                            className={`small ${
                              amenity.available ? 'text-dark' : 'text-muted'
                            }`}
                          >
                            {amenity.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Washroom */}
                <div className="col-md-6 col-lg-3">
                  <h3 className="h6 fw-semibold text-uppercase text-muted mb-3">
                    Washroom
                  </h3>
                  <div className="list-group list-group-flush">
                    {property.amenities.washroom.map((amenity, index) => (
                      <div key={index} className="amenity-item list-group-item border-0 px-0 py-2">
                        <div className="d-flex align-items-center">
                          <amenity.icon 
                            className={`amenity-icon me-3 ${
                              amenity.available ? 'text-success' : 'text-muted'
                            }`}
                            size={18}
                          />
                          <span 
                            className={`small ${
                              amenity.available ? 'text-dark' : 'text-muted'
                            }`}
                          >
                            {amenity.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="property-booking" className="mb-5">
          <div className="card shadow-sm hover-lift">
            <div className="card-body p-4 text-center">
              <h3 className="h4 fw-bold text-dark mb-3 hover:text-teal-600 transition-colors duration-300">Ready to Book?</h3>
              <p className="text-muted mb-4">
                Secure your spot at {property.name} today!
              </p>
              
              {!isAuthenticated ? (
                <button 
                  onClick={handleBookingClick}
                  className="btn btn-lg px-5 py-3 hover-glow d-flex align-items-center justify-content-center mx-auto"
                  style={{ 
                    maxWidth: '300px',
                    backgroundColor: 'rgb(0, 128, 128)',
                    borderColor: 'rgb(0, 128, 128)',
                    color: 'white'
                  }}
                >
                  <LogIn className="me-2" size={20} />
                  Login to Book Now
                </button>
              ) : (
                <button 
                  onClick={handleBookingClick}
                  className="btn btn-success btn-lg px-5 py-3 hover-glow"
                >
                  Book Now - ₹ {property.price.toLocaleString()}/month
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PropertyDetail;