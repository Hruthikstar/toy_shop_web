"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import ProductCart from "@/components/ProductCart";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "BLAZE STORM",
    price: 1299,
    category: "New Arrivals",
    image: "/images/gallerypics/blaze_storm.jpg",
    description:
      "A powerful soft bullet blaster toy made for action-loving kids. Durable body, smooth shooting & safe foam bullets.",
  },
  {
    id: 2,
    name: "MP 18",
    price: 899,
    category: "New Arrivals",
    image: "/images/gallerypics/Mp_18.jpg",
    description:
      "A premium MP18 toy gun with soft bullets, strong grip, and stylish modern design. Safe and kid‑friendly.",
  },
  {
    id: 3,
    name: "NAJA COBRA",
    price: 699,
    category: "Soft Toys",
    image: "/images/gallerypics/naja_cobra.jpg",
    description:
      "A super soft cobra plush toy—cute, cuddly, and perfect for your child’s bedtime or playtime companion.",
  },
  {
    id: 4,
    name: "ROCK CLIMBER",
    price: 1599,
    category: "Vehicles",
    image: "/images/gallerypics/climbing.jpg",
    description:
      "A rugged rock‑climbing RC car with 4×4 grip, LED lights, and durable suspension. Made for outdoor fun.",
  },
  {
    id: 5,
    name: "SPECIAL CAR RACING",
    price: 1599,
    category: "Vehicles",
    image: "/images/gallerypics/special_car.jpg",
    description:
      "High‑speed racing car with responsive controls, premium body design, and fast acceleration.",
  },
  {
    id: 6,
    name: "BIGINTO ENERGY",
    price: 1599,
    category: "Vehicles",
    image: "/images/gallerypics/biginto_energy.jpg",
    description:
      "High‑power stunt car with spinning, flipping and drifting abilities. Perfect for thrill seekers!",
  },
  {
    id: 7,
    name: "VOICE‑CONTROLLED TUMBLING BABY",
    price: 1599,
    category: "Electronic Toys",
    image: "/images/gallerypics/electric.jpg",
    description:
      "A cute baby toy that responds to voice commands, moves, tumbles, and entertains for hours.",
  },
  {
    id: 8,
    name: "HOPPING BALL",
    price: 1599,
    category: "Outdoor Toys",
    image: "/images/gallerypics/hopping_ball.jpg",
    description:
      "A durable and fun bouncing ball toy that helps kids stay active and improves balance.",
  },
  {
    id: 9,
    name: "CARD EARLY EDUCATION DEVICE",
    price: 1599,
    category: "Educational Toys",
    image: "/images/gallerypics/card_early.jpg",
    description:
      "Interactive learning device with educational flashcards—perfect for building vocabulary and recognition.",
  },
  {
    id: 10,
    name: "ELECTRIC WATER GUN",
    price: 1599,
    category: "Outdoor Toys",
    image: "/images/gallerypics/electric_watergun.jpg",
    description:
      "Automatic electric water gun with long‑range shooting and powerful stream—ultimate summer fun!",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow-lg bg-pink-50 p-4">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="w-full object-contain"
              />
            </div>
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
              <p>✓ Free delivery on orders above ₹500</p>
              <p>✓ 7‑day easy returns</p>
              <p>✓ Secure checkout</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/product/${related.id}`}
                  className="border rounded-xl p-4 hover:shadow-md transition bg-white text-center hover:bg-pink-50"
                >
                  <Image
                    src={related.image}
                    alt={related.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">{related.name}</h3>
                  <p className="text-pink-500 font-bold">₹{related.price}</p>
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
