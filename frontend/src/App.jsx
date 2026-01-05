import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f5f0 0%, #f0ebe3 100%)' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
          
          <Toaster
            position="top-center"
            containerStyle={{ top: 80 }}
            toastOptions={{
              duration: 3000,
              style: {
                background: '#3d4a2d',
                color: '#f8f5f0',
                borderRadius: '12px',
                padding: '12px 16px',
                boxShadow: '0 4px 20px rgba(61,74,45,0.3)',
              },
            }}
          />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;