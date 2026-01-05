import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const count = getCartCount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 bg-[rgba(61,74,45,0.95)] backdrop-blur-2xl shadow-[0_2px_20px_rgba(0,0,0,0.15)]">
      <div className="max-w-300 mx-auto px-6 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="no-underline text-[#f8f5f0] text-[22px] font-bold font-serif tracking-widest"
        >
          BOUTIQUE
        </Link>

        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="no-underline text-[#d4c9b8] text-sm tracking-wide transition-colors duration-200 hover:text-[#f8f5f0]"
          >
            Collection
          </Link>
          <Link to="/cart" className="relative text-[#f8f5f0]">
            <ShoppingBag size={22} />
            {count > 0 && (
              <span className="absolute -top-2.5 -right-2.5 w-5.5 h-5.5 bg-[#c4a35a] text-[#2d2a26] rounded-full text-[11px] font-bold flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;