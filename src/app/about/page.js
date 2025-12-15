'use client';
import Layout from '@/components/layout/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header section - already responsive */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Chellamay Baby Shop
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted destination for quality baby products in Tenkasi since our establishment.
            </p>
          </div>

          {/* Main content section - now fully responsive */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:items-center mb-16">
            {/* Text Content - stacks on top for mobile, left side for desktop */}
            <div className="w-full lg:w-[40%]">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                WE ARE THE BEST CHOICE FOR YOUR BABY
              </h2>
              <div className="space-y-4 text-gray-600 text-base md:text-lg">
                <p>
                  Welcome to Chellamay Baby Shop, your trusted destination for all things baby in Tenkasi. 
                  Since our establishment, we have been dedicated to providing the highest quality baby products 
                  to our valued customers.
                </p>
                <p>
                  Our carefully curated selection includes everything from educational toys and safety gear 
                  to comfortable clothing and essential accessories. We understand that every child is unique, 
                  which is why we offer a diverse range of products to suit different needs and preferences.
                </p>
                <p>
                  At Chellamay Baby Shop, we prioritize safety, quality, and customer satisfaction. Our team 
                  is committed to helping you find the perfect products for your little ones, making your 
                  shopping experience both enjoyable and rewarding.
                </p>
              </div>
            </div>

            {/* Image - stacks below text on mobile, right side on desktop */}
            <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] rounded-lg overflow-hidden shadow-xl w-full lg:w-[60%]">
              <img
                src="/images/chella-logo2.gif"
                alt="Chellamay Baby Shop Store"
                className="w-full h-full object-cover bg-gray-50"
              />
            </div>
          </div>

          {/* Mission, Vision, Values grid - responsive grid that adapts to screen size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: 'Our Mission',
                content: 'To provide safe, high-quality baby products that support child development and bring joy to families.'
              },
              {
                title: 'Our Vision',
                content: 'To be the most trusted baby shop in Tenkasi, known for exceptional products and customer service.'
              },
              {
                title: 'Our Values',
                content: 'Quality, Safety, Customer Satisfaction, and Community Engagement are at the heart of everything we do.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}