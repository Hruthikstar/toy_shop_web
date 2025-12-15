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
  },
  {
    id: 2,
    name: "MP 18 ",
    price: 1750,
    category: "New Arrivals",
    image: "/images/gallerypics/Mp_18.jpg",
  },
  {
    id: 3,
    name: "NAJA COBRA",
    price: 1750,
    category: "New Arrivals",
    image: "/images/gallerypics/naja_cobra.jpg",
  },
  {
    id: 4,
    name: "ROCK CLIMBER",
    price: 3300,
    category: "Vehicles",
    image: "/images/gallerypics/climbing.jpg",
  },
  {
    id: 5,
    name: "SPECIAL CAR RACING",
    price: 1599,
    category: "Vehicles",
    image: "/images/gallerypics/special_car.jpg",
  },
  {
    id: 6,
    name: "BIGINTO ENERGY",
    price: 320,
    category: "New Arrivals",
    image: "/images/gallerypics/biginto_energy.jpg",
  },
  {
    id: 7,
    name: "VOICE-CONTROLLED TUMBLING BABY",
    price: 320,
    category: "New Arrivals",
    image: "/images/gallerypics/electric.jpg",
  },
  {
    id: 8,
    name: "HOPPING BALL",
    price: 1070,
    category: "Soft Toys",
    image: "/images/gallerypics/hopping_ball.jpg",
  },
  {
    id: 9,
    name: "CARD EARLY EDUCATION DE VICE",
    price: 470,
    category: "Soft Toys",
    image: "/images/gallerypics/card_early.jpg",
  },
  {
    id: 10,
    name: "ELECTRIC WATER GUN",
    price: 1750,
    category: "Vehicles",
    image: "/images/gallerypics/electric_watergun.jpg",
  },
  
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-16">
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
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group block border rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow transition-colors duration-200 relative z-20 pointer-events-auto h-full hover:bg-pink-50 hover:border-pink-200"
            >
              <div className="w-full h-44 relative overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-4 font-semibold text-center">
                {product.name}
              </h3>

              <p className="mt-1 font-bold text-center">
                ₹{product.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
