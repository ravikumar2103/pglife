import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyCarouselProps {
  images: string[];
  propertyName: string;
}

const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ images, propertyName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div id="propertyCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#propertyCarousel"
            data-bs-slide-to={index}
            className={index === currentIndex ? 'active' : ''}
            aria-current={index === currentIndex ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <img
              src={image}
              className="d-block w-100"
              alt={`${propertyName} - Image ${index + 1}`}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
      
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#propertyCarousel"
        data-bs-slide="prev"
        onClick={prevSlide}
      >
        <ChevronLeft className="text-white" size={24} />
        <span className="visually-hidden">Previous</span>
      </button>
      
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#propertyCarousel"
        data-bs-slide="next"
        onClick={nextSlide}
      >
        <ChevronRight className="text-white" size={24} />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default PropertyCarousel;