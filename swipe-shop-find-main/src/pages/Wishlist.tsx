
import React from 'react';
import { useShop } from '@/context/ShopContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from '@/lib/toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Wishlist: React.FC = () => {
  const { state, removeFromWishlist, addToCart } = useShop();
  const isMobile = useIsMobile();

  const handleAddToCart = (productId: number) => {
    const product = state.wishlist.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart`);
    }
  };

  return (
    <div className="pb-20">
      <header className="sticky top-0 bg-white z-10 shadow-sm p-4">
        <div className="flex items-center justify-center">
          <Heart className="text-brand-purple mr-2" size={20} />
          <h1 className="text-xl font-bold">Your Wishlist</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4">
        {state.wishlist.length > 0 ? (
          <div className="space-y-4">
            {state.wishlist.map(product => (
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
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => removeFromWishlist(product.id)}
                      className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={18} className="text-gray-500 hover:text-red-500" />
                    </button>
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={18} className="text-gray-500 hover:text-brand-purple" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
              <Heart className="text-gray-400" size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">Your wishlist is empty</h2>
            <p className="text-gray-500 mt-2">{isMobile ? 'Swipe right on products you like to add them here' : 'Click the heart icon on products to add them here'}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
