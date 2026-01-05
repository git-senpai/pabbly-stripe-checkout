import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Mail } from 'lucide-react';
import CartItem from '../components/CartItem';
import Loader from '../components/Loader';
import { useCart } from '../context/CartContext';
import { createCheckoutSession } from '../services/api';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const formatPrice = (paise) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(paise / 100);
  };

  const total = getCartTotal();

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    if (cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setLoading(true);
    try {
      const response = await createCheckoutSession(email, cartItems);
      if (response.success && response.url) {
        setRedirecting(true);
        clearCart();
        window.location.href = response.url;
      } else {
        toast.error('Checkout failed');
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };

  if (redirecting) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f5f0 0%, #f0ebe3 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader size="lg" text="Redirecting to payment..." />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f5f0 0%, #f0ebe3 100%)', paddingTop: '110px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#2d2a26', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>Your Cart</h1>
          <p style={{ fontSize: '16px', color: '#7a756e' }}>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
        </div>

        {cartItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map((item, index) => (
                <CartItem key={item.productId || index} item={item} />
              ))}
            </div>

            <div style={{
              backgroundColor: '#faf8f5',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 4px 24px rgba(45,42,38,0.1)',
              border: '1px solid rgba(139,154,110,0.2)',
              position: 'sticky',
              top: '90px',
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#2d2a26', marginBottom: '24px', fontFamily: 'Georgia, serif' }}>Order Summary</h2>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', color: '#7a756e', fontSize: '15px' }}>
                  <span>Subtotal</span>
                  <span style={{ color: '#2d2a26', fontWeight: 500 }}>{formatPrice(total)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px', color: '#7a756e', fontSize: '15px' }}>
                  <span>Shipping</span>
                  <span style={{ color: '#5a6b4a', fontWeight: 600 }}>Complimentary</span>
                </div>
                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #d4c9b8, transparent)', marginBottom: '18px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '19px', fontWeight: 700, color: '#2d2a26', fontFamily: 'Georgia, serif' }}>
                  <span>Total</span>
                  <span style={{ color: '#5a6b4a' }}>{formatPrice(total)}</span>
                </div>
              </div>

              <form onSubmit={handleCheckout}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#7a756e', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#a09890' }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      style={{
                        width: '100%',
                        padding: '14px 14px 14px 44px',
                        fontSize: '15px',
                        border: '1px solid #d4c9b8',
                        borderRadius: '12px',
                        backgroundColor: '#fff',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#5a6b4a'}
                      onBlur={(e) => e.target.style.borderColor = '#d4c9b8'}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: loading ? '#a09890' : '#5a6b4a',
                    color: '#f8f5f0',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'background 0.2s',
                    fontFamily: 'Georgia, serif',
                  }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#4a5a3a')}
                  onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#5a6b4a')}
                >
                  {loading ? <Loader size="sm" text="" /> : <><span>Proceed to Payment</span><ArrowRight size={18} /></>}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #e8e2d7 0%, #d4c9b8 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
            }}>
              <ShoppingBag size={40} color="#5a6b4a" />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#2d2a26', marginBottom: '12px', fontFamily: 'Georgia, serif' }}>Your cart is empty</h2>
            <p style={{ color: '#7a756e', marginBottom: '32px', fontSize: '16px' }}>Discover our curated collection</p>
            <Link to="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              backgroundColor: '#5a6b4a',
              color: '#f8f5f0',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'Georgia, serif',
            }}>
              Explore Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;