// Mock product data
const products = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    price: 9999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Fitness tracker with heart rate monitor and GPS',
    price: 19999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
  },
  {
    id: '3',
    name: 'Portable Power Bank',
    description: '20000mAh fast charging power bank with LED display',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400'
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit gaming keyboard with blue switches',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400'
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'
  },
  {
    id: '6',
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400'
  }
];

const getAllProducts = (req, res) => {
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
};

module.exports = { getAllProducts };