'use client';
import Slider from 'react-slick';
import { FaStar } from 'react-icons/fa';

const TestimonialsSection = () => {

  const testimonials = [
    {
      name: 'Priya R.',
      image: '/images/testimonial-1.jpg', // Add placeholder images
      rating: 5,
      comment: 'Amazing selection of baby products! The staff was very helpful in finding exactly what I needed for my newborn.'
    },
    {
      name: 'Karthik S.',
      image: '/images/testimonial-2.jpg',
      rating: 5,
      comment: 'Quality products at reasonable prices. My kids love the educational toys we bought from here.'
    },
    {
      name: 'Lakshmi M.',
      image: '/images/testimonial-3.jpg',
      rating: 5,
      comment: 'Best baby shop in Tenkasi! Great customer service and wide variety of products.'
    },
    {
      name: 'Raj Kumar',
      image: '/images/testimonial-4.jpg',
      rating: 5,
      comment: 'Excellent shopping experience. The staff is knowledgeable and friendly.'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Don't just take our word for it
          </p>
        </div>

        <div className="mt-8"
        >
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4 py-2">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    {/* Placeholder avatar */}
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                      <div 
                        className="w-full h-full bg-gradient-to-br from-pink-200 to-blue-200"
                        style={{
                          backgroundImage: `url(${testimonial.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
