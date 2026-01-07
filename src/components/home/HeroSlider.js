'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      path: '/gallery',
      desktopImage: '/images/hero1.jpg.png',
      mobileImage: '/images/hero1-desk.jpeg',
    },
    {
      title: '',
      subtitle: '',
      cta: 'Explore Our Collection',
      path: '/gallery',
      desktopImage: '/images/new.jpg',
      mobileImage: '/images/new-desk.jpeg',
    },
    {
      title: 'Baby Care Essentials',
      subtitle: 'Premium Quality Products for Your Little One\'s Comfort',
      cta: 'Explore Our Collection',
      path: '/gallery',
      desktopImage: '/images/hero3.jpeg',
      mobileImage: '/images/hero3.jpeg',
    },
    {
      title: '',
      subtitle: '',
      cta: 'Explore Our Collection',
      path: '/gallery',
      desktopImage: '/images/dismobile.jpeg',
      mobileImage: '/images/special.jpg',
    },
    {
      title: 'Expert Baby Care Advice',
      subtitle: 'Get Tips and Guidance from Our Experienced Team',
      cta: 'Explore Our Collection',
      path: '/gallery',
      desktopImage: '/images/hero5.jpeg',
      mobileImage: '/images/hero5.jpeg',
    },
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
    beforeChange: (_, next) => setCurrentSlide(next),
    customPaging: i => (
      <div
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          i === currentSlide ? 'bg-pink-500 scale-110' : 'bg-white/80'
        }`}
      />
    ),
    appendDots: dots => (
      <div className="absolute bottom-4 md:bottom-6 w-full">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] md:h-[600px] overflow-hidden">
      <Slider {...settings} className="h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-[420px] sm:h-[500px] md:h-[600px]"
          >
            {/* Desktop Image */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src={slide.desktopImage}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>

            {/* Mobile Image */}
            <div className="block md:hidden absolute inset-0">
              <Image
                src={slide.mobileImage}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>

            {/* Overlay */}
              {(slide.title || slide.subtitle) && (
                <div className="absolute inset-0 bg-black/50" />
              )}

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="w-full px-4 sm:px-6 md:px-10 text-center max-w-5xl mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-base md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  {slide.subtitle}
                </p>

                {(slide.title || slide.subtitle) && (
                  <Link href={slide.path}>
                    <span className="inline-block px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold text-white bg-pink-600 rounded-full hover:bg-pink-700 transition">
                      {slide.cta}
                    </span>
                  </Link>
                )}

              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
