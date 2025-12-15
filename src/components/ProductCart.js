'use client';

import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const ProductCart = ({ isOpen, product, onClose, initialQuantity = 1 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  // Sync quantity when modal opens or initialQuantity changes
  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
    } else {
      setQuantity(initialQuantity || 1);
    }
  }, [isOpen, initialQuantity]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItem = existingCart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      existingCart.push({
        ...product,
        quantity
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Close modal and reset
    onClose();
    setQuantity(1);
    
    // Show success message
    alert(`${product.name} added to cart!`);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Close cart"
        >
          <FiX className="text-xl text-gray-700" />
        </button>

        {/* Product Image */}
        <div className="mb-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>

        {/* Product Name */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {product.name}
        </h2>

        {/* Product Category */}
        <p className="text-gray-600 text-sm mb-4">
          {product.category}
        </p>

        {/* Product Price */}
        <p className="text-3xl font-bold text-pink-500 mb-6">
          ₹{product.price}
        </p>

        {/* Product Description */}
        {product.description && (
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg w-fit">
            <button
              onClick={handleDecrement}
              className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <div className="w-12 h-12 flex items-center justify-center font-semibold text-gray-900 border-l border-r border-gray-300">
              {quantity}
            </div>
            <button
              onClick={handleIncrement}
              className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold text-gray-900">
              ₹{(product.price * quantity).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 mb-3"
        >
          Add to Cart
        </button>

        {/* Continue Shopping Button */}
        <button
          onClick={onClose}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
