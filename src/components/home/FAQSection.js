'use client';
import { useState } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';

const FAQSection = () => {

  const faqs = [
    {
      question: 'What age group are your toys suitable for?',
      answer: 'We offer toys for children of all ages, from newborns to pre-teens. Each toy is clearly labeled with age recommendations to help you make the right choice for your child.'
    },
    {
      question: 'Are the toys safe and certified?',
      answer: 'Yes, all our toys meet strict safety standards and are certified by relevant authorities. We carefully select products from reputable manufacturers who prioritize child safety.'
    },
    {
      question: 'Do you offer gift wrapping services?',
      answer: 'Yes, we provide gift wrapping services for all purchases. Our staff will be happy to help you choose the perfect wrapping paper and create a beautiful presentation for your gift.'
    },
    {
      question: 'Can I return or exchange a product?',
      answer: 'Yes, we have a flexible return and exchange policy. Unused items in original packaging can be returned within 7 days of purchase. Please keep your receipt for hassle-free returns.'
    },
    {
      question: 'Do you have educational toys for infants?',
      answer: 'Yes, we have a wide range of educational toys specifically designed for infant development. These include sensory toys, early learning tools, and developmental playthings.'
    }
  ];

  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Find answers to common questions about our products and services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="transition-all duration-300"
            >
              <Disclosure>
                {({ open }) => (
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <Disclosure.Button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200">
                      <span className="text-lg font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <FaChevronDown
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-pink-500 transition-transform duration-200`}
                      />
                    </Disclosure.Button>

                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="px-6 py-4 text-gray-600">
                        {faq.answer}
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
