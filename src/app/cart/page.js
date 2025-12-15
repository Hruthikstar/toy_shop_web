'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';

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

    const phone = "918940163698"; // <-- PUT YOUR WHATSAPP NUMBER HERE
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
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">

        <Link href="/gallery" className="flex items-center gap-2 text-pink-500 mb-6">
          <FiArrowLeft /> Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="bg-white border rounded-lg p-4 flex gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-pink-500 font-bold">₹{item.price}</p>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2"
                      >−</button>

                      <span className="px-3">{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2"
                      >+</button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 mt-2"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal()}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Delivery Fee</span>
                <span>₹{DELIVERY_FEE}</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-pink-500">₹{grandTotal()}</span>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full mt-6 bg-pink-500 text-white py-3 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Customer Details</h2>

            <input
              placeholder="Name"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
            />

            <textarea
              placeholder="Address"
              value={customer.address}
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
            />

            <textarea
              placeholder="Note (optional)"
              value={customer.note}
              onChange={(e) =>
                setCustomer({ ...customer, note: e.target.value })
              }
            />

            <button
              onClick={sendToWhatsApp}
              className="w-full bg-green-500 text-white py-2 rounded mt-3"
            >
              Send Order via WhatsApp
            </button>

            <button
              onClick={() => setShowCheckout(false)}
              className="w-full bg-gray-200 py-2 rounded mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
