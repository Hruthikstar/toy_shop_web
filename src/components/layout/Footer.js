'use client';
import Link from 'next/link';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic mb-4">
              <p>27, Amman Sannathi St</p>
              <p>Tenkasi, Tamil Nadu 627811</p>
              <p className="mt-2">Phone: <a href="tel:+918883509501" className="hover:text-pink-500">088835 09501</a></p>
            </address>
            <h3 className="text-lg font-semibold mb-2">Other Branches</h3>
             <address className="not-italic">
              <p>Theppakulam, Tenkasi</p>
              <p>Pavoorchatram</p>
            </address>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/chellamay_baby_shop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://wa.me/918883509501" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-500"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-pink-500">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-pink-500">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Find Us</h3>
            <div className="w-full h-[300px] rounded-lg overflow-hidden">
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

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p>&copy; {new Date().getFullYear()} Chellamay Baby Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
