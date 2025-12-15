'use client';

const AboutSection = () => {
  return (
    <section className="py-8 md:py-16 bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile-first responsive layout */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-8 items-center">
          
          {/* Text Content - comes first on mobile, maintains order on desktop */}
          <div className="w-full lg:w-[40%] order-1 lg:order-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 text-center lg:text-left">
              About Chellamay Baby Shop
            </h2>
            <div className="space-y-3 md:space-y-4 text-gray-600 text-sm sm:text-base">
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
          
          {/* Image - comes second on mobile, maintains position on desktop */}
          <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] rounded-lg overflow-hidden shadow-xl w-full lg:w-[60%] order-2 lg:order-2">
            <img
              src="/images/chella-logo2.gif"
              alt="Chellamay Baby Shop Store"
              className="w-full h-full object-cover bg-gray-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;