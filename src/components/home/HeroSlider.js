'use client';
import { useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Welcome to Chellamay Baby Shop',
      subtitle: 'Your Trusted Destination for Quality Baby Products in Tenkasi',
      cta: 'Explore Our Collection',
      path: '/gallery'
    },
    {
      title: 'New Arrivals Every Week',
      subtitle: 'Discover the Latest in Baby Care, Toys, and More',
      cta: 'Explore Our Collection',
      path: '/gallery'
    },
    {
      title: 'Baby Care Essentials',
      subtitle: 'Premium Quality Products for Your Little One\'s Comfort',
      cta: 'Explore Our Collection',
      path: '/gallery'
    },
    {
      title: 'Special Discounts',
      subtitle: 'Save Big on Selected Baby Products This Week',
      cta: 'Explore Our Collection',
      path: '/gallery'
    },
    {
      title: 'Expert Baby Care Advice',
      subtitle: 'Get Tips and Guidance from Our Experienced Team',
      cta: 'Explore Our Collection',
      path: '/gallery'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: true,
    cssEase: 'cubic-bezier(0.87, 0, 0.13, 1)',
    beforeChange: (_, next) => setCurrentSlide(next),
    customPaging: i => (
      <div
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          i === currentSlide ? 'bg-pink-500 scale-110' : 'bg-white/80'
        } shadow-md mx-1`}
      />
    ),
    appendDots: dots => (
      <div className="absolute bottom-5 w-full">
        <ul className="m-0 p-0 flex justify-center items-center gap-2"> {dots} </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          autoplaySpeed: 4000,
          dots: true
        }
      }
    ]
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <Slider {...settings} className="h-full">
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[600px]">
            {/* Background gradient animation */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(-45deg, #FF69B4, #FFB6C1, #87CEEB, #FF1493)',
                backgroundSize: '400% 400%',
                animation: 'gradient 15s ease infinite'
              }}
            />
            {/* Animated overlay pattern */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                animation: 'pattern-slide 20s linear infinite'
              }}
            />
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/30 backdrop-blur-[2px]" />
            
            {/* Slide content with enhanced animations */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-4 max-w-6xl mx-auto">
              <div className="animate-fade-in-down">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg font-montserrat">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl leading-relaxed font-inter">
                  {slide.subtitle}
                </p>
                <Link href={slide.path}>
                  <span className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 font-montserrat">
                    <span className="relative">{slide.cta}</span>
                    <svg 
                      className="w-5 h-5 ml-2 -mr-1 transition-transform duration-200 transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
