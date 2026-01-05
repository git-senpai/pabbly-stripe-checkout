import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const formatPrice = (paise) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(paise / 100);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      backgroundColor: '#faf8f5',
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(45,42,38,0.06)',
      border: '1px solid rgba(139,154,110,0.15)',
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        background: 'linear-gradient(180deg, #f0ebe3 0%, #e8e2d7 100%)',
        borderRadius: '12px',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
      }}>
        <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#2d2a26',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontFamily: 'Georgia, serif',
        }}>{item.name}</h3>
        <p style={{ fontSize: '14px', color: '#7a756e', marginTop: '4px' }}>{formatPrice(item.price)}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          style={{
            width: '34px',
            height: '34px',
            backgroundColor: '#e8e2d7',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#5a6b4a',
          }}
        >
          <Minus size={14} />
        </button>
        <span style={{ width: '28px', textAlign: 'center', fontSize: '15px', fontWeight: 600, color: '#2d2a26' }}>{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          style={{
            width: '34px',
            height: '34px',
            backgroundColor: '#e8e2d7',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#5a6b4a',
          }}
        >
          <Plus size={14} />
        </button>
      </div>

      <span style={{ fontSize: '16px', fontWeight: 700, color: '#5a6b4a', width: '90px', textAlign: 'right', fontFamily: 'Georgia, serif' }}>
        {formatPrice(item.price * item.quantity)}
      </span>

      <button
        onClick={() => removeFromCart(item.productId)}
        style={{
          padding: '8px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#a09890',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#c45c5c'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#a09890'}
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default CartItem;