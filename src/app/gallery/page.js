"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { FiSearch, FiStar, FiShoppingBag, FiPlus, FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion"; // Fixed: Import AnimatePresence

const products = [
  {
    id: 1,
    name: "BLAZE STORM",
    price: 550,
    category: "New Arrivals",
    image: "/images/gallerypics/blaze_storm.jpg",
    description: "Powerful soft bullet blaster toy",
    rating: 4.5,
    reviews: 128,
    badge: "BESTSELLER",
  },
  {
    id: 2,
    name: "MP 18 ",
    price: 1750,
    category: "New Arrivals",
    image: "/images/gallerypics/mp_18.jpg",
    description: "Premium toy gun with soft bullets",
    rating: 4.8,
    reviews: 95,
    badge: "TRENDING",
  },
  {
    id: 3,
    name: "NAJA COBRA",
    price: 1750,
    category: "New Arrivals",
    image: "/images/gallerypics/naja_cobra.jpg",
    description: "Super soft cobra plush toy",
    rating: 4.6,
    reviews: 72,
    badge: "NEW",
  },
  {
    id: 4,
    name: "ROCK CLIMBER",
    price: 3300,
    category: "Vehicles",
    image: "/images/gallerypics/climbing.jpg",
    description: "Rugged RC car with LED lights",
    rating: 4.9,
    reviews: 156,
    badge: "PREMIUM",
  },
  {
    id: 5,
    name: "SPECIAL CAR RACING",
    price: 1599,
    category: "Vehicles",
    image: "/images/gallerypics/special_car.jpg",
    description: "High-speed racing car with responsive controls",
    rating: 4.7,
    reviews: 104,
    badge: "HOT",
  },
  {
    id: 6,
    name: "BIGINTO ENERGY",
    price: 320,
    category: "New Arrivals",
    image: "/images/gallerypics/biginto_energy.jpg",
    description: "Stunt car with spinning abilities",
    rating: 4.4,
    reviews: 89,
    badge: "VALUE",
  },
  {
    id: 7,
    name: "VOICE-CONTROLLED TUMBLING BABY",
    price: 320,
    category: "New Arrivals",
    image: "/images/gallerypics/electric.jpg",
    description: "Responds to voice commands",
    rating: 4.6,
    reviews: 113,
    badge: "SMART",
  },
  {
    id: 8,
    name: "HOPPING BALL",
    price: 1070,
    category: "Soft Toys",
    image: "/images/gallerypics/hopping_ball.jpg",
    description: "Durable bouncing ball toy",
    rating: 4.5,
    reviews: 67,
    badge: "POPULAR",
  },
  {
    id: 9,
    name: "CARD EARLY EDUCATION DE VICE",
    price: 470,
    category: "Soft Toys",
    image: "/images/gallerypics/card_early.jpg",
    description: "Interactive learning device",
    rating: 4.7,
    reviews: 142,
    badge: "EDUCATIONAL",
  },
  {
    id: 10,
    name: "ELECTRIC WATER GUN",
    price: 1750,
    category: "Vehicles",
    image: "/images/gallerypics/electric_watergun.jpg",
    description: "Automatic water gun with long-range",
    rating: 4.8,
    reviews: 178,
    badge: "BESTSELLER",
  },
  
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState(() =>
    Object.fromEntries(products.map((p) => [p.id, 1]))
  );

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    const qtyToAdd = quantities[product.id] || 1;
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find((it) => it.id === product.id);
    if (existingItem) {
      existingItem.quantity += qtyToAdd;
    } else {
      existingCart.push({ ...product, quantity: qtyToAdd });
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
    setQuantities((q) => ({ ...q, [product.id]: 1 }));
  };

  return (
    <Layout>
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-16 min-h-screen">
        {/* Premium Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 text-lg bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-300"
          />
        </div>

        {/* Premium Category Pills */}
        <div className="flex gap-4 mb-12 overflow-x-auto justify-center scrollbar-hide">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 shadow-md ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-300"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-lg"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Premium Product Grid with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + search} // Re-mount on filter change for entrance animation
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4"
              >
                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-md">
                    {product.badge}
                  </span>
                )}

                {/* Image with Overlay Hover */}
                <Link href={`/product/${product.id}`} className="block relative">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-pink-600">₹{product.price}</p>

                    {/* Quantity Selector + Add Button */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuantities((q) => ({ ...q, [product.id]: Math.max(1, q[product.id] - 1) }));
                          }}
                          className="p-2 hover:bg-gray-100 transition"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-sm font-medium min-w-12 text-center">
                          {quantities[product.id]}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuantities((q) => ({ ...q, [product.id]: q[product.id] + 1 }));
                          }}
                          className="p-2 hover:bg-gray-100 transition"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                      >
                        <FiShoppingBag className="w-5 h-5" />
                        Add
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No products found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}