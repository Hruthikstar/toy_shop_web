"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import ProductCart from "@/components/ProductCart";
import { FiArrowLeft, FiShoppingCart, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "BLAZE STORM",
    price: 550,
    category: "New Arrivals",
    image: "/images/gallerypics/blaze_storm.jpg",
    images: [
      "/images/gallerypics/blaze_storm.jpg",
      "/images/blaze1.jpg",
      "/images/blaze2.jpg",
    ],
    description:
      "A powerful soft bullet blaster toy made for action-loving kids. Durable body, smooth shooting & safe foam bullets.",
  },
  {
    id: 2,
    name: "MP 18",
    price: 1750,
    category: "New Arrivals",
    image: "/images/gallerypics/mp_18.jpg",
    images: [
      "/images/gallerypics/mp_18.jpg",
      "/images/mp181.jpg",
      "/images/mp182.jpg",
    ],
    description:
      "A premium MP18 toy gun with soft bullets, strong grip, and stylish modern design. Safe and kid‑friendly.",
  },
  {
    id: 3,
    name: "NAJA COBRA",
    price: 1750,
    category: "Soft Toys",
    image: "/images/gallerypics/naja_cobra.jpg",   
     images: [
      "/images/gallerypics/naja_cobra.jpg",
      "/images/naja 2.jpg",
      "/images/naja3.jpg",
    ],
    description:
      "A super soft cobra plush toy—cute, cuddly, and perfect for your child’s bedtime or playtime companion.",
  },
  {
    id: 4,
    name: "ROCK CLIMBER",
    price: 3300,
    category: "Vehicles",
    image: "/images/gallerypics/climbing.jpg",
    images: [
      "/images/gallerypics/climbing.jpg",
      "/images/rocks1.jpg",
      "/images/rocks2.jpg",
    ],
    description:
      "A rugged rock‑climbing RC car with 4×4 grip, LED lights, and durable suspension. Made for outdoor fun.",
  },
  {
    id: 5,
    name: "SPECIAL CAR RACING",
    price: 1599,
    category: "Vehicles",
    image: "/images/gallerypics/special_car.jpg",
    images: [
      "/images/gallerypics/special_car.jpg",
      "/images/gallerypics/special_car.jpg",
      "/images/gallerypics/special_car.jpg",
    ],
    description:
      "High‑speed racing car with responsive controls, premium body design, and fast acceleration.",
  },
  {
    id: 6,
    name: "BIGINTO ENERGY",
    price: 320,
    category: "Vehicles",
    image: "/images/gallerypics/biginto_energy.jpg",
    images: [
      "/images/gallerypics/biginto_energy.jpg",
      "/images/biginto1.jpg",
      "/images/biginto2.jpg",
    ],
    description:
      "High‑power stunt car with spinning, flipping and drifting abilities. Perfect for thrill seekers!",
  },
  {
    id: 7,
    name: "VOICE‑CONTROLLED TUMBLING BABY",
    price: 320,
    category: "Electronic Toys",
    image: "/images/gallerypics/electric.jpg",
    images: [
      "/images/gallerypics/electric.jpg",
      "/images/creativity1.jpg",
      "/images/creativity2.jpg",
    ],
    description:
      "A cute baby toy that responds to voice commands, moves, tumbles, and entertains for hours.",
  },
  {
    id: 8,
    name: "HOPPING BALL",
    price: 1070,
    category: "Outdoor Toys",
    image: "/images/gallerypics/hopping_ball.jpg",
    images: [
      "/images/gallerypics/hopping_ball.jpg",
      "/images/hopping ball1.jpg",
      "/images/hopping ball2.jpg",
    ],
    description:
      "A durable and fun bouncing ball toy that helps kids stay active and improves balance.",
  },
  {
    id: 9,
    name: "CARD EARLY EDUCATION DEVICE",
    price: 470,
    category: "Educational Toys",
    image: "/images/gallerypics/card_early.jpg",
    images: [
      "/images/gallerypics/card_early.jpg",
      "/images/card1.jpg",
      "/images/card2.jpg",
    ],
    description:
      "Interactive learning device with educational flashcards—perfect for building vocabulary and recognition.",
  },
  {
    id: 10,
    name: "ELECTRIC WATER GUN",
    price: 1750,
    category: "Outdoor Toys",
    image: "/images/gallerypics/electric_watergun.jpg",
    images: [
      "/images/gallerypics/electric_watergun.jpg",
      "/images/electric water gun.jpg",
      "/images/electric water gun1.jpg",
    ],
    description:
      "Automatic electric water gun with long‑range shooting and powerful stream—ultimate summer fun!",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const foundProduct = products.find(
      (p) => p.id === parseInt(params.id)
    );
    setProduct(foundProduct);
  }, [params.id]);

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link
            href="/gallery"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-semibold mb-8 transition"
        >
          <FiArrowLeft />
          Back
        </button>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Product Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative mb-6">
              <div className="w-full rounded-2xl overflow-hidden shadow-xl bg-pink-50 p-4 relative group">
                <Image
                  src={product.images ? product.images[currentImageIndex] : product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full object-contain"
                />
              </div>

              {/* Image Navigation Arrows */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition z-10"
                    title="Previous image"
                  >
                    <FiChevronLeft className="text-xl" />
                  </button>

                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === product.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition z-10"
                    title="Next image"
                  >
                    <FiChevronRight className="text-xl" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-2 rounded-lg text-sm font-semibold">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative rounded-lg overflow-hidden border-3 transition-all ${
                      currentImageIndex === idx
                        ? "border-pink-500 shadow-lg"
                        : "border-gray-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-pink-500 font-semibold text-sm uppercase mb-2">
              {product.category}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <p className="text-4xl font-bold text-pink-500 mb-6">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 rounded-lg shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FiShoppingCart className="text-xl" />
              Add to Cart
            </button>

            <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600">
              <p>✓ 7‑day easy returns</p>
              <p>✓ Secure checkout</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Products</h2>
          <p className="text-gray-500 mb-8">Check out these similar items you might like</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/product/${related.id}`}
                  className="group block border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white hover:border-pink-200 hover:bg-pink-50"
                >
                  {/* Image Container */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-50">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      className="object-cover transform transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Category Badge */}
                    <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {related.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-pink-600 transition">
                      {related.name}
                    </h3>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-pink-500 font-bold text-lg">₹{related.price}</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
                          const existingItem = existingCart.find((it) => it.id === related.id);
                          if (existingItem) {
                            existingItem.quantity += 1;
                          } else {
                            existingCart.push({ ...related, quantity: 1 });
                          }
                          localStorage.setItem('cart', JSON.stringify(existingCart));
                          window.dispatchEvent(new Event('cartUpdated'));
                        }}
                        className="px-3 py-1.5 bg-pink-500 text-white text-xs font-semibold rounded-lg hover:bg-pink-600 transition whitespace-nowrap"
                        title="Add to cart"
                      >
                        Add +
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>

      {/* Add‑to‑Cart Modal */}
      <ProductCart
        isOpen={isCartOpen}
        product={product}
        onClose={() => setIsCartOpen(false)}
      />
    </Layout>
  );
}
