
import React from 'react';
import { Heart, ShoppingCart, Home } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navigation: React.FC = () => {
  const { state } = useShop();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-10">
      <div className="flex justify-around items-center">
        <Link to="/" className={cn(
          "flex flex-col items-center",
          isActive('/') ? "text-brand-purple" : "text-gray-500"
        )}>
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link to="/wishlist" className={cn(
          "flex flex-col items-center relative",
          isActive('/wishlist') ? "text-brand-purple" : "text-gray-500"
        )}>
          <Heart size={24} />
          {state.wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-brand-purple text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {state.wishlist.length}
            </span>
          )}
          <span className="text-xs mt-1">Wishlist</span>
        </Link>
        
        <Link to="/cart" className={cn(
          "flex flex-col items-center relative",
          isActive('/cart') ? "text-brand-purple" : "text-gray-500"
        )}>
          <ShoppingCart size={24} />
          {state.cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-brand-purple text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {state.cart.length}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
