"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";

const products = [
  {
    id: 1,
    name: "BLAZE STORM",
    price: 550,
    category: "New Arrivals",
    image: "/images/gallerypics/blaze_storm.jpg",
    description: "Powerful soft bullet blaster toy",
  },
  {
    id: 2,
    name: "MP 18 ",
    price: 1750,
    category: "New Arrivals",
    image: "/images/gallerypics/mp_18.jpg",
    description: "Premium toy gun with soft bullets",
  },
  {
    id: 3,
    name: "NAJA COBRA",
    price: 1750,
    category: "New Arrivals",
    image: "/images/gallerypics/naja_cobra.jpg",
    description: "Super soft cobra plush toy",
  },
  {
    id: 4,
    name: "ROCK CLIMBER",
    price: 3300,
    category: "Vehicles",
    image: "/images/gallerypics/climbing.jpg",
    description: "Rugged RC car with LED lights",
  },
  {
    id: 5,
    name: "SPECIAL CAR RACING",
    price: 1599,
    category: "Vehicles",
    image: "/images/gallerypics/special_car.jpg",
    description: "High-speed racing car with responsive controls",
  },
  {
    id: 6,
    name: "BIGINTO ENERGY",
    price: 320,
    category: "New Arrivals",
    image: "/images/gallerypics/biginto_energy.jpg",
    description: "Stunt car with spinning abilities",
  },
  {
    id: 7,
    name: "VOICE-CONTROLLED TUMBLING BABY",
    price: 320,
    category: "New Arrivals",
    image: "/images/gallerypics/electric.jpg",
    description: "Responds to voice commands",
  },
  {
    id: 8,
    name: "HOPPING BALL",
    price: 1070,
    category: "Soft Toys",
    image: "/images/gallerypics/hopping_ball.jpg",
    description: "Durable bouncing ball toy",
  },
  {
    id: 9,
    name: "CARD EARLY EDUCATION DE VICE",
    price: 470,
    category: "Soft Toys",
    image: "/images/gallerypics/card_early.jpg",
    description: "Interactive learning device",
  },
  {
    id: 10,
    name: "ELECTRIC WATER GUN",
    price: 1750,
    category: "Vehicles",
    image: "/images/gallerypics/electric_watergun.jpg",
    description: "Automatic water gun with long-range",
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
      product.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      {/* IMPORTANT: create stacking context */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-16 min-h-screen">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-3 border rounded-lg pointer-events-auto"
        />

        {/* Categories */}
        <div className="flex gap-3 mb-10 overflow-x-auto pointer-events-auto justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full border text-sm whitespace-nowrap transition-colors duration-150 ${
                selectedCategory === cat
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white text-pink-600 border-pink-200 hover:bg-pink-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pointer-events-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group block border rounded-xl p-4 hover:shadow-lg transition-shadow transition-colors duration-200 relative z-20 pointer-events-auto h-full hover:bg-pink-50 hover:border-pink-200"
            >
              <div className="flex flex-col h-full">
                <Link href={`/product/${product.id}`} className="block">
                  <div className="w-full h-80 sm:h-64 md:h-56 lg:h-44 relative overflow-hidden rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="flex-1" />

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-3">
                    {/* Left: Product Info */}
                    <div className="flex-1 text-left">
                      <span className="inline-block px-2 py-1 text-xs bg-pink-100 text-pink-600 rounded-full font-medium mb-1.5">
                        {product.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">{product.description}</p>
                      <p className="font-bold text-pink-500 mt-2">₹{product.price}</p>
                    </div>

                    {/* Right: Add Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
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
                        // reset quantity to 1 for this product
                        setQuantities((q) => ({ ...q, [product.id]: 1 }));
                      }}
                      className="px-4 py-2 bg-pink-500 text-white text-sm font-semibold rounded-lg hover:bg-pink-600 transition whitespace-nowrap"
                      aria-label={`Add ${product.name} to cart`}
                      title={`Qty: ${quantities[product.id] || 1}`}
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
