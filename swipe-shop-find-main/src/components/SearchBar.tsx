
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative">
      {isOpen ? (
        <form onSubmit={handleSearch} className="animate-slide-up">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-purple"
              autoFocus
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-2.5"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            )}
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <Search className="h-5 w-5 text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
