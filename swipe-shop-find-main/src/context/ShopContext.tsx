
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../data/products';
import { toast } from '@/lib/toast';

// Define the State type
type State = {
  wishlist: Product[];
  cart: Product[];
  viewedProducts: number[]; // IDs of products already viewed
};

// Define the Action type
type Action =
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'VIEW_PRODUCT'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'CLEAR_WISHLIST' };

// Create the initial state
const initialState: State = {
  wishlist: [],
  cart: [],
  viewedProducts: [],
};

// Create the reducer function
const shopReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.some((item) => item.id === action.payload.id)) {
        return state; // Product already in wishlist
      }
      toast.success(`${action.payload.name} added to wishlist`);
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      };
    case 'ADD_TO_CART':
      if (state.cart.some((item) => item.id === action.payload.id)) {
        return state; // Product already in cart
      }
      toast.success(`${action.payload.name} added to cart`);
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case 'VIEW_PRODUCT':
      if (state.viewedProducts.includes(action.payload)) {
        return state; // Product already viewed
      }
      return {
        ...state,
        viewedProducts: [...state.viewedProducts, action.payload],
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        wishlist: [],
      };
    default:
      return state;
  }
};

// Create the Context
type ShopContextType = {
  state: State;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  viewProduct: (productId: number) => void;
  clearCart: () => void;
  clearWishlist: () => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Create the Provider Component
export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const viewProduct = (productId: number) => {
    dispatch({ type: 'VIEW_PRODUCT', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  return (
    <ShopContext.Provider
      value={{
        state,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        removeFromCart,
        viewProduct,
        clearCart,
        clearWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// Create a hook to use the ShopContext
export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
