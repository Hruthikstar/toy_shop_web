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
      image: '/images/hero1.jpg.png',
    },
    {
      title: 'New Arrivals Every Week',
      subtitle: 'Discover the Latest in Baby Care, Toys, and More',
      cta: 'Explore Our Collection',
      path: '/gallery',
      image: '/images/hero2.jpg',
    },
    {
      title: 'Baby Care Essentials',
      subtitle: 'Premium Quality Products for Your Little One\'s Comfort',
      cta: 'Explore Our Collection',
      path: '/gallery',
      image: '/images/hero3.jpeg',
    },
    {
      title: 'Special Discounts',
      subtitle: 'Save Big on Selected Baby Products This Week',
      cta: 'Explore Our Collection',
      path: '/gallery',
      image: '/images/discount.jpg',
    },
    {
      title: 'Expert Baby Care Advice',
      subtitle: 'Get Tips and Guidance from Our Experienced Team',
      cta: 'Explore Our Collection',
      path: '/gallery',
      image: '/images/hero5.jpeg',
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
      <div className="absolute bottom-5 w-full">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    )
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <Slider {...settings} className="h-full">
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[600px]">

            {/* Background Image (Dynamic) */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-6xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl">
                {slide.subtitle}
              </p>
              <Link href={slide.path}>
                <span className="inline-flex items-center px-8 py-3 font-bold text-white bg-pink-600 rounded-full hover:bg-pink-700 transition">
                  {slide.cta}
                </span>
              </Link>
            </div>

          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
