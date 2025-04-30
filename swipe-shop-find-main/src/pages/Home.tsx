
import React, { useState, useEffect } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import CategoryTabs from '@/components/CategoryTabs';
import SearchBar from '@/components/SearchBar';
import { useShop } from '@/context/ShopContext';
import { ChevronUp } from 'lucide-react';

const Home: React.FC = () => {
  const { viewProduct } = useShop();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    // Filter products based on category and search query
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
    setCurrentIndex(0);
  }, [selectedCategory, searchQuery]);

  const handleSwipeLeft = () => {
    if (currentIndex < filteredProducts.length - 1) {
      viewProduct(filteredProducts[currentIndex].id);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300); // Wait for animation to complete
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex < filteredProducts.length - 1) {
      viewProduct(filteredProducts[currentIndex].id);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300); // Wait for animation to complete
    }
  };

  const handleSwipeUp = () => {
    if (currentIndex < filteredProducts.length - 1) {
      viewProduct(filteredProducts[currentIndex].id);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300); // Wait for animation to complete
    }
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="pb-20">
      <header className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-brand-purple">SwipeShop</h1>
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <CategoryTabs 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
      </header>

      <main className="max-w-md mx-auto p-4">
        {filteredProducts.length > 0 ? (
          <>
            {currentIndex < filteredProducts.length ? (
              <div className="relative">
                <ProductCard 
                  product={filteredProducts[currentIndex]} 
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  onSwipeUp={handleSwipeUp}
                />
                {filteredProducts.length > 1 && (
                  <div className="mt-4 text-center">
                    <p className="text-gray-500 flex items-center justify-center gap-1">
                      <ChevronUp className="animate-bounce" size={16} />
                      Swipe up to add to cart
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-xl font-semibold text-gray-700">No more products to show</h2>
                <p className="text-gray-500 mt-2">You've seen all products in this category</p>
                <button 
                  onClick={() => setCurrentIndex(0)}
                  className="mt-4 px-6 py-2 bg-brand-purple text-white rounded-full hover:bg-opacity-90 transition-colors"
                >
                  Start over
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-700">No products found</h2>
            <p className="text-gray-500 mt-2">Try a different category or search term</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
