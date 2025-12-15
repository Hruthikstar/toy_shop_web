"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

const FloatingCartButton = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const total = cart.reduce((sum, it) => sum + (it.quantity || 0), 0);
        setCount(total);
      } catch (e) {
        setCount(0);
      }
    };

    update();
    window.addEventListener("storage", update);
    window.addEventListener("cartUpdated", update);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("cartUpdated", update);
    };
  }, []);

  return (
    <Link href="/cart" className="fixed right-4 bottom-4 z-50">
      <button
        aria-label="Open cart"
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <FiShoppingCart className="text-xl sm:text-2xl" />

        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>
    </Link>
  );
};

export default FloatingCartButton;
