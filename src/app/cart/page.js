'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { FiTrash2, FiArrowLeft, FiShoppingCart, FiCheck } from 'react-icons/fi';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    note: ""
  });

  const DELIVERY_FEE = 10;

  /* ================= LOAD CART ================= */
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
    setLoading(false);

    const handleCartUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(updated);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  /* ================= CART ACTIONS ================= */
  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return removeItem(id);

    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    );

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  /* ================= CALCULATIONS ================= */
  const subtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const grandTotal = () => subtotal() + DELIVERY_FEE;

  /* ================= WHATSAPP ================= */
  const sendToWhatsApp = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill Name, Phone and Address");
      return;
    }

    let message = `🧸 *New Toy Order*%0A%0A`;

    message += `👤 *Name:* ${customer.name}%0A`;
    message += `📞 *Phone:* ${customer.phone}%0A`;
    message += `🏠 *Address:* ${customer.address}%0A`;

    if (customer.note) {
      message += `📝 *Note:* ${customer.note}%0A`;
    }

    message += `%0A🛍️ *Items:*%0A`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}%0A`;
    });

    message += `%0A💵 *Subtotal:* ₹${subtotal()}`;
    message += `%0A🚚 *Delivery Fee:* ₹${DELIVERY_FEE}`;
    message += `%0A💰 *Total:* ₹${grandTotal()}%0A`;

    const phone = "918680086899"; // <-- PUT YOUR WHATSAPP NUMBER HERE
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Layout>
        <div className="pt-24 text-center">Loading cart...</div>
      </Layout>
    );
  }

  /* ================= UI ================= */
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 min-h-screen">

        {/* Header */}
        <div className="mb-8">
          <Link href="/gallery" className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-semibold transition mb-6">
            <FiArrowLeft /> Continue Shopping
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <FiShoppingCart className="text-3xl text-pink-500" />
            <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <p className="text-gray-500">Review your items and proceed to checkout</p>
        </div>

        {cartItems.length === 0 ? (
          /* EMPTY CART STATE - PREMIUM DESIGN */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-12 text-center max-w-md w-full shadow-lg">
              {/* Animated Empty Cart Icon */}
              <div className="flex items-center justify-center w-24 h-24 mx-auto bg-white rounded-full shadow-lg mb-6">
                <FiShoppingCart className="text-5xl text-pink-500" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-8 text-lg">
                No items yet! Explore our amazing collection of toys and add something special to your cart.
              </p>

              {/* Features List */}
              <div className="bg-white rounded-xl p-6 mb-8 space-y-3">
                <div className="flex items-center gap-3 text-left text-gray-700">
                  <FiCheck className="text-green-500 text-xl flex-shrink-0" />
                  <span className="text-sm">7-day easy returns & exchanges</span>
                </div>
                <div className="flex items-center gap-3 text-left text-gray-700">
                  <FiCheck className="text-green-500 text-xl flex-shrink-0" />
                  <span className="text-sm">Secure & fast checkout</span>
                </div>
              </div>

              <Link
                href="/gallery"
                className="inline-block w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Shopping Now
              </Link>

              <p className="text-gray-500 text-sm mt-6">
                Discover 100+ premium toys for kids
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* CART ITEMS */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 flex gap-5 hover:shadow-lg transition-all duration-300 hover:border-pink-200"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="inline-block text-xs bg-pink-100 text-pink-600 font-semibold px-2 py-1 rounded-full mb-2">
                            Item {index + 1}
                          </span>
                          <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                        </div>
                      </div>
                      <p className="text-pink-500 font-bold text-lg">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex flex-col items-end gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 hover:bg-pink-50 transition font-semibold text-gray-600"
                        >
                          −
                        </button>
                        <span className="px-4 py-2 font-semibold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 hover:bg-pink-50 transition font-semibold text-gray-600"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                        <p className="font-bold text-pink-500">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                        title="Remove item"
                      >
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ORDER SUMMARY - PREMIUM DESIGN */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 border border-pink-200 sticky top-24 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FiCheck className="text-pink-500" />
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-pink-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{subtotal().toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Delivery Fee</span>
                    <span className="font-semibold text-gray-900">₹{DELIVERY_FEE}</span>
                  </div>

                  <div className="bg-white rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-pink-500">₹{grandTotal().toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FiCheck className="text-green-500 flex-shrink-0" />
                    <span>Free returns within 7 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FiCheck className="text-green-500 flex-shrink-0" />
                    <span>Secure WhatsApp checkout</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Proceed to Checkout
                </button>

                <Link
                  href="/gallery"
                  className="block text-center mt-4 text-pink-600 hover:text-pink-700 font-semibold transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CHECKOUT MODAL - PREMIUM DESIGN */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md md:max-w-2xl shadow-2xl overflow-y-auto max-h-[95vh]">
            {/* Header with Back Button */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-6 flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FiShoppingCart />
                  Checkout Details
                </h2>
                <p className="text-pink-100 text-sm mt-1">Enter your details to proceed</p>
              </div>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition flex-shrink-0"
                title="Go back"
              >
                <FiArrowLeft className="text-xl" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="10-digit phone number"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address *</label>
                <textarea
                  placeholder="Enter your complete address"
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Special Instructions (Optional)</label>
                <textarea
                  placeholder="Any special requests or notes?"
                  value={customer.note}
                  onChange={(e) =>
                    setCustomer({ ...customer, note: e.target.value })
                  }
                  rows="2"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>

              {/* Order Summary in Modal */}
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                <p className="text-xs text-gray-600 mb-2">ORDER TOTAL</p>
                <p className="text-2xl font-bold text-pink-600">₹{grandTotal().toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="px-6 py-4 bg-gray-50 border-t space-y-2">
              <button
                onClick={sendToWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <FiCheck />
                Send Order via WhatsApp
              </button>

              <button
                onClick={() => setShowCheckout(false)}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <FiArrowLeft />
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
