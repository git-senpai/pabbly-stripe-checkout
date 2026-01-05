import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const formatPrice = (paise) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(paise / 100);
  };

  return (
    <div
      style={{
        backgroundColor: '#faf8f5',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(45,42,38,0.08)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        border: '1px solid rgba(139,154,110,0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(45,42,38,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(45,42,38,0.08)';
      }}
    >
      <div
        style={{
          aspectRatio: '1',
          background: 'linear-gradient(180deg, #f0ebe3 0%, #e8e2d7 100%)',
          padding: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>

      <div style={{ padding: '24px' }}>
        <h3
          style={{
            fontSize: '17px',
            fontWeight: 600,
            color: '#2d2a26',
            marginBottom: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontFamily: 'Georgia, serif',
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontSize: '13px',
            color: '#7a756e',
            marginBottom: '20px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: '1.6',
          }}
        >
          {product.description}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#5a6b4a',
              fontFamily: 'Georgia, serif',
            }}
          >
            {formatPrice(product.price)}
          </span>

          <button
            onClick={() => addToCart(product)}
            style={{
              width: '42px',
              height: '42px',
              backgroundColor: '#5a6b4a',
              color: '#f8f5f0',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4a5a3a';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#5a6b4a';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
