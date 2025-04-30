import React from 'react';
import { useShop } from '@/context/ShopContext';
import { ShoppingCart, Trash2, CheckCircle } from 'lucide-react';
import { toast } from '@/lib/toast';

const Cart: React.FC = () => {
  const { state, removeFromCart, clearCart } = useShop();

  const totalPrice = state.cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    toast.success("Your order has been placed!");
    clearCart();
  };

  return (
    <div className="pb-20">
      <header className="sticky top-0 bg-white z-10 shadow-sm p-4">
        <div className="flex items-center justify-center">
          <ShoppingCart className="text-brand-purple mr-2" size={20} />
          <h1 className="text-xl font-bold">Your Cart</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4">
        {state.cart.length > 0 ? (
          <>
            <div className="space-y-4 mb-6">
              {state.cart.map(product => (
                <div 
                  key={product.id} 
                  className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-brand-purple font-bold">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => removeFromCart(product.id)}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <Trash2 size={18} className="text-gray-500 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between mb-4 font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full py-3 bg-brand-purple text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-colors"
              >
                <CheckCircle size={20} />
                <span>Checkout</span>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
              <ShoppingCart className="text-gray-400" size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">Double-tap on products to add them to your cart</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
