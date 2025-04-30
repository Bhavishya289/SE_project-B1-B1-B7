import React, { useState, useRef, useEffect } from 'react';
import { Product } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { Heart, ShoppingCart, X, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onSwipeLeft, 
  onSwipeRight,
  onSwipeUp
}) => {
  const { addToWishlist, addToCart } = useShop();
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number | null>(null);
  const [swipeClass, setSwipeClass] = useState<string | null>(null);
  const [lastTapTime, setLastTapTime] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showRightOverlay, setShowRightOverlay] = useState(false);
  const [showLeftOverlay, setShowLeftOverlay] = useState(false);
  const [showUpOverlay, setShowUpOverlay] = useState(false);

  useEffect(() => {
    const preventDefaults = (e: Event) => {
      e.preventDefault();
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('dragstart', preventDefaults);
    }

    return () => {
      if (card) {
        card.removeEventListener('dragstart', preventDefaults);
      }
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      setStartX(e.clientX);
      setStartY(e.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startX === null || startY === null) return;
    
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    setCurrentX(touchX);
    setCurrentY(touchY);
    
    const diffX = touchX - startX;
    const diffY = touchY - startY;
    
    const isHorizontal = Math.abs(diffX) > Math.abs(diffY);
    
    if (isHorizontal && Math.abs(diffX) > 10) {
      e.preventDefault();
      
      if (diffX > 50) {
        setShowRightOverlay(true);
        setShowLeftOverlay(false);
        setShowUpOverlay(false);
      } else if (diffX < -50) {
        setShowLeftOverlay(true);
        setShowRightOverlay(false);
        setShowUpOverlay(false);
      } else {
        setShowRightOverlay(false);
        setShowLeftOverlay(false);
      }
      
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.1}deg)`;
      }
    } else if (!isHorizontal && diffY < -50) {
      e.preventDefault();
      
      setShowUpOverlay(true);
      setShowRightOverlay(false);
      setShowLeftOverlay(false);
      
      if (cardRef.current) {
        const translateY = Math.max(diffY, -150);
        cardRef.current.style.transform = `translateY(${translateY}px) scale(${1 + translateY/-500})`;
      }
    } else {
      setShowUpOverlay(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (startX === null || startY === null) return;
    
    e.preventDefault();
    const currX = e.clientX;
    const currY = e.clientY;
    setCurrentX(currX);
    setCurrentY(currY);
    
    const diffX = currX - startX;
    const diffY = currY - startY;
    
    const isHorizontal = Math.abs(diffX) > Math.abs(diffY);
    
    if (isHorizontal) {
      if (diffX > 50) {
        setShowRightOverlay(true);
        setShowLeftOverlay(false);
        setShowUpOverlay(false);
      } else if (diffX < -50) {
        setShowLeftOverlay(true);
        setShowRightOverlay(false);
        setShowUpOverlay(false);
      } else {
        setShowRightOverlay(false);
        setShowLeftOverlay(false);
      }
      
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.1}deg)`;
      }
    } else if (!isHorizontal && diffY < -50) {
      setShowUpOverlay(true);
      setShowRightOverlay(false);
      setShowLeftOverlay(false);
      
      if (cardRef.current) {
        const translateY = Math.max(diffY, -150);
        cardRef.current.style.transform = `translateY(${translateY}px) scale(${1 + translateY/-500})`;
      }
    } else {
      setShowUpOverlay(false);
    }
  };

  const resetCard = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
    setStartX(null);
    setStartY(null);
    setCurrentX(null);
    setCurrentY(null);
    setShowRightOverlay(false);
    setShowLeftOverlay(false);
    setShowUpOverlay(false);
  };

  const handleTouchEnd = () => {
    if (startX === null || startY === null || currentX === null || currentY === null) {
      resetCard();
      return;
    }
    
    const diffX = currentX - startX;
    const diffY = currentY - startY;
    const isHorizontal = Math.abs(diffX) > Math.abs(diffY);
    
    if (isHorizontal) {
      if (diffX > 100) {
        setSwipeClass('swiping-right');
        addToWishlist(product);
        onSwipeRight();
      } else if (diffX < -100) {
        setSwipeClass('swiping-left');
        onSwipeLeft();
      } else {
        resetCard();
      }
    } else if (diffY < -100) {
      setSwipeClass('swiping-up');
      addToCart(product);
      onSwipeUp();
    } else {
      resetCard();
    }
  };

  const handleMouseUp = () => {
    if (startX === null || startY === null || currentX === null || currentY === null) {
      resetCard();
      return;
    }
    
    const diffX = currentX - startX;
    const diffY = currentY - startY;
    const isHorizontal = Math.abs(diffX) > Math.abs(diffY);
    
    if (isHorizontal) {
      if (diffX > 100) {
        setSwipeClass('swiping-right');
        addToWishlist(product);
        onSwipeRight();
      } else if (diffX < -100) {
        setSwipeClass('swiping-left');
        onSwipeLeft();
      } else {
        resetCard();
      }
    } else if (diffY < -100) {
      setSwipeClass('swiping-up');
      addToCart(product);
      onSwipeUp();
    } else {
      resetCard();
    }
  };

  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTapTime < DOUBLE_TAP_DELAY) {
      addToCart(product);
    }
    
    setLastTapTime(now);
  };

  useEffect(() => {
    if (swipeClass) {
      const timer = setTimeout(() => {
        setSwipeClass(null);
        resetCard();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [swipeClass]);

  return (
    <div className="relative">
      <div
        ref={cardRef}
        className={cn(
          "product-card select-none",
          swipeClass
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={resetCard}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className={cn("swipe-overlay-right", {
            "opacity-100": showRightOverlay
          })}
        >
          <Heart size={64} color="white" />
        </div>
        <div
          className={cn("swipe-overlay-left", {
            "opacity-100": showLeftOverlay
          })}
        >
          <X size={64} color="white" />
        </div>
        <div
          className={cn("swipe-overlay-up", {
            "opacity-100": showUpOverlay
          })}
        >
          <ShoppingCart size={64} color="white" />
        </div>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-80 object-cover pointer-events-none"
          draggable="false"
        />
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <span className="font-bold text-brand-purple">${product.price.toFixed(2)}</span>
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm bg-brand-light-purple text-brand-dark-purple px-3 py-1 rounded-full">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
            <div className="flex space-x-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToWishlist(product);
                }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Heart size={20} className="text-gray-500 hover:text-brand-purple" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ShoppingCart size={20} className="text-gray-500 hover:text-brand-purple" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 gap-2">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={() => {
            setSwipeClass('swiping-left');
            setTimeout(() => {
              onSwipeLeft();
              setSwipeClass(null);
            }, 300);
          }}
        >
          <ChevronLeft className="mr-2" />
          Skip
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={() => {
            setSwipeClass('swiping-up');
            addToCart(product);
            setTimeout(() => {
              onSwipeUp();
              setSwipeClass(null);
            }, 300);
          }}
        >
          <ChevronUp className="mr-2" />
          Add to Cart
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={() => {
            setSwipeClass('swiping-right');
            addToWishlist(product);
            setTimeout(() => {
              onSwipeRight();
              setSwipeClass(null);
            }, 300);
          }}
        >
          Like
          <ChevronRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
