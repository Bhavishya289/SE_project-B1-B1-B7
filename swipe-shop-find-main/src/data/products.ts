
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'home', name: 'Home' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'sports', name: 'Sports' },
  { id: 'books', name: 'Books' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'Premium noise-cancelling wireless headphones with exceptional sound quality and comfort.',
    category: 'electronics',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80',
    description: 'Track your fitness goals and stay connected with this stylish smartwatch.',
    category: 'electronics',
  },
  {
    id: 3,
    name: 'Cotton T-Shirt',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear.',
    category: 'clothing',
  },
  {
    id: 4,
    name: 'Ceramic Plant Pot',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80',
    description: 'Minimalist ceramic pot for your favorite indoor plants.',
    category: 'home',
  },
  {
    id: 5,
    name: 'Leather Wallet',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80',
    description: 'Genuine leather wallet with multiple card slots and RFID protection.',
    category: 'accessories',
  },
  {
    id: 6,
    name: 'Yoga Mat',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=500&q=80',
    description: 'Eco-friendly, non-slip yoga mat for your workout sessions.',
    category: 'sports',
  },
  {
    id: 7,
    name: 'Face Serum',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf21?w=500&q=80',
    description: 'Hydrating face serum with vitamin C for glowing skin.',
    category: 'beauty',
  },
  {
    id: 8,
    name: 'Digital Camera',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=500&q=80',
    description: 'High-resolution digital camera for capturing your precious moments.',
    category: 'electronics',
  },
  {
    id: 9,
    name: 'Denim Jacket',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=500&q=80',
    description: 'Classic denim jacket that never goes out of style.',
    category: 'clothing',
  },
  {
    id: 10,
    name: 'Scented Candle',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&q=80',
    description: 'Long-lasting scented candle for a cozy atmosphere.',
    category: 'home',
  },
  {
    id: 11,
    name: 'Bestselling Novel',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
    description: 'The latest bestselling novel that everyone is talking about.',
    category: 'books',
  },
  {
    id: 12,
    name: 'Running Shoes',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    description: 'Lightweight running shoes with superior cushioning and support.',
    category: 'sports',
  },
];
