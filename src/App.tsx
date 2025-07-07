import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MajorCities from './components/MajorCities';
import Footer from './components/Footer';
import SignupModal from './components/SignupModal';
import LoginModal from './components/LoginModal';
import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';
import Breadcrumb from './components/Breadcrumb';
import { useAuth } from './hooks/useAuth';
import { checkAndSeedDatabase } from './utils/seedData';

function App() {
  const { loading: authLoading } = useAuth();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'properties' | 'detail'>('home');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedProperty, setSelectedProperty] = useState<string>('');

  // Initialize database with sample data if empty
  useEffect(() => {
    checkAndSeedDatabase().catch(console.error);
  }, []);

  // Browser history management
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      
      if (state) {
        // Navigate based on browser history state
        setCurrentPage(state.page);
        setSelectedCity(state.city || '');
        setSelectedProperty(state.property || '');
      } else {
        // No state means we're at the initial page (home)
        setCurrentPage('home');
        setSelectedCity('');
        setSelectedProperty('');
      }
    };

    // Listen for browser back/forward button clicks
    window.addEventListener('popstate', handlePopState);

    // Set initial state if we're starting fresh
    if (!window.history.state) {
      window.history.replaceState(
        { page: 'home' },
        'PG Life - Happiness per Square Foot',
        window.location.pathname
      );
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Push state when navigating programmatically
  const pushState = (page: string, city?: string, property?: string) => {
    const state = { page, city: city || '', property: property || '' };
    let url = '/';
    let title = 'PG Life - Happiness per Square Foot';

    if (page === 'properties' && city) {
      url = `/properties/${city}`;
      title = `PG in ${getCityName(city)} - PG Life`;
    } else if (page === 'detail' && property) {
      url = `/property/${property}`;
      title = `Property Details - PG Life`;
    }

    window.history.pushState(state, title, url);
  };

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    setCurrentPage('properties');
    pushState('properties', city);
  };

  const handleCitySearch = (searchQuery: string) => {
    // Normalize the search query and check if it's a valid city
    const availableCities: { [key: string]: string } = {
      'delhi': 'delhi',
      'mumbai': 'mumbai',
      'bengaluru': 'bengaluru',
      'bangalore': 'bengaluru', // Alternative name
      'hyderabad': 'hyderabad',
      'chennai': 'chennai',
      'madras': 'chennai', // Alternative name
      'vizag': 'vizag',
      'visakhapatnam': 'vizag' // Alternative name
    };

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const cityKey = availableCities[normalizedQuery];
    
    if (cityKey) {
      // Valid city found
      setSelectedCity(cityKey);
    } else {
      // Invalid city - still set it to show "not available" message
      setSelectedCity(searchQuery);
    }
    
    setCurrentPage('properties');
    pushState('properties', cityKey || searchQuery);
  };

  const handlePropertyView = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setCurrentPage('detail');
    pushState('detail', selectedCity, propertyId);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedCity('');
    setSelectedProperty('');
    pushState('home');
  };

  const handleBackToProperties = () => {
    setCurrentPage('properties');
    setSelectedProperty('');
    pushState('properties', selectedCity);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
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
    return cityMap[cityKey] || cityKey;
  };

  const getBreadcrumbItems = () => {
    const items = [
      { label: 'Home', onClick: handleBackToHome }
    ];

    if (currentPage === 'properties') {
      items.push({
        label: `PG in ${getCityName(selectedCity)}`,
        active: true
      });
    } else if (currentPage === 'detail') {
      items.push(
        {
          label: `PG in ${getCityName(selectedCity)}`,
          onClick: handleBackToProperties
        },
        {
          label: 'Property Details',
          active: true
        }
      );
    }

    return items;
  };

  // Show loading screen while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading PG Life...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onSignupClick={() => setShowSignupModal(true)}
        onLoginClick={handleLoginClick}
        onLogoClick={handleBackToHome}
      />
      
      {/* Breadcrumb Navigation */}
      {currentPage !== 'home' && (
        <div className="container">
          <Breadcrumb items={getBreadcrumbItems()} />
        </div>
      )}
      
      {currentPage === 'home' && (
        <>
          <Hero onCitySearch={handleCitySearch} />
          <MajorCities onCityClick={handleCityClick} />
        </>
      )}
      
      {currentPage === 'properties' && (
        <PropertyList 
          city={selectedCity} 
          onPropertyView={handlePropertyView}
          onBackToHome={handleBackToHome}
        />
      )}
      
      {currentPage === 'detail' && (
        <PropertyDetail 
          propertyId={selectedProperty}
          onLoginClick={handleLoginClick}
        />
      )}
      
      <Footer onCityClick={handleCityClick} />
      
      {showSignupModal && (
        <SignupModal 
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={switchToLogin}
        />
      )}
      
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={switchToSignup}
        />
      )}
    </div>
  );
}

export default App;