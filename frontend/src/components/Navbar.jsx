import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const count = getCartCount();

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: 'rgba(61,74,45,0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 2px 20px rgba(0,0,0,0.15)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link to="/" style={{ 
          textDecoration: 'none', 
          color: '#f8f5f0', 
          fontSize: '22px', 
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
          letterSpacing: '1px',
        }}>
          BOUTIQUE
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#d4c9b8', fontSize: '14px', letterSpacing: '0.5px', transition: 'color 0.2s' }}>
            Collection
          </Link>
          <Link to="/cart" style={{ position: 'relative', color: '#f8f5f0' }}>
            <ShoppingBag size={22} />
            {count > 0 && (
              <span style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                width: '22px',
                height: '22px',
                backgroundColor: '#c4a35a',
                color: '#2d2a26',
                borderRadius: '50%',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
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