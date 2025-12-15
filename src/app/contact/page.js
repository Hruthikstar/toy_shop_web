'use client';
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { FaPhoneAlt, FaMapMarkerAlt, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
  e.preventDefault();

  const { name, email, phone, message } = formData;

  const text = `Hi Chellamay Baby Shop 👶✨,%0A%0A📍 Name: ${name}%0A📧 Email: ${email}%0A📞 Phone: ${phone}%0A💬 Message: ${message}`;

  const whatsappURL = `https://wa.me/918883509501?text=${encodeURIComponent(text)}`;

  window.open(whatsappURL, '_blank');
};
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We'd love to hear from you. Get in touch with us!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-pink-500 text-white py-3 px-6 rounded-md hover:bg-pink-600 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-2xl text-pink-500 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                  <p className="text-gray-600">
                    27, Amman Sannathi St<br />
                    Tenkasi, Tamil Nadu 627811
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <FaPhoneAlt className="text-2xl text-pink-500 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                  <a href="tel:+918883509501" className="text-gray-600 hover:text-pink-500">
                    088835 09501
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com/chellamay_baby_shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
                  >
                    <FaInstagram className="text-3xl" />
                  </a>
                  <a
                    href="https://wa.me/918883509501"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-green-500 transition-colors duration-300"
                  >
                    <FaWhatsapp className="text-3xl" />
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-lg overflow-hidden h-[300px] shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.1774151278564!2d77.3098499!3d8.9557941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0429c283370e71%3A0xf49a858fd369d57d!2sChellamay%20Baby%20World!5e0!3m2!1sen!2sin!4v1754070861807!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
