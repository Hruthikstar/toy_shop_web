'use client';
import { FaShieldAlt, FaHeart, FaStar, FaHandshake } from 'react-icons/fa';

const WhyChooseUs = () => {

  const features = [
    {
      icon: <FaShieldAlt className="text-4xl text-pink-500" />,
      title: 'Safety First',
      description: 'All our products meet or exceed safety standards to ensure your child\'s well-being.'
    },
    {
      icon: <FaHeart className="text-4xl text-pink-500" />,
      title: 'Quality Products',
      description: 'We carefully select each item to ensure the highest quality for your little ones.'
    },
    {
      icon: <FaStar className="text-4xl text-pink-500" />,
      title: 'Expert Guidance',
      description: 'Our knowledgeable staff is here to help you make the best choices for your baby.'
    },
    {
      icon: <FaHandshake className="text-4xl text-pink-500" />,
      title: 'Customer Service',
      description: 'We\'re committed to providing exceptional service and support to all our customers.'
    }
  ];

  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose Chellamay Baby Shop
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            We go above and beyond to ensure your satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
