
"use client";
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingCartButton from './FloatingCartButton';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-inter">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <FloatingCartButton />
    </div>
  );
};

export default Layout;
