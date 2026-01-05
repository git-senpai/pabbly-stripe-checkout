import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { getOrderBySessionId } from '../services/api';
import Loader from '../components/Loader';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }
      try {
        const response = await getOrderBySessionId(sessionId);
        if (response.success) setOrder(response.data);
      } catch {
        console.error('Error fetching order');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [sessionId]);

  const formatPrice = (paise) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(paise / 100);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f5f0 0%, #f0ebe3 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader size="lg" text="Loading order..." />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f5f0 0%, #f0ebe3 100%)', paddingTop: '130px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          backgroundColor: '#faf8f5',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 8px 32px rgba(45,42,38,0.12)',
          border: '1px solid rgba(139,154,110,0.2)',
          textAlign: 'center',
        }}>
          <div style={{
            width: '88px',
            height: '88px',
            background: 'linear-gradient(135deg, #e8f0e4 0%, #d4e0d0 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
          }}>
            <CheckCircle size={44} color="#5a6b4a" />
          </div>
          
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#2d2a26', marginBottom: '12px', fontFamily: 'Georgia, serif' }}>Order Confirmed</h1>
          <p style={{ color: '#7a756e', marginBottom: '36px', fontSize: '16px' }}>Thank you for your purchase</p>

          {order && (
            <div style={{
              background: 'linear-gradient(135deg, #f0ebe3 0%, #e8e2d7 100%)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '36px',
              textAlign: 'left',
            }}>
              <p style={{ fontSize: '13px', color: '#7a756e', marginBottom: '18px' }}>Confirmation sent to: <span style={{ color: '#2d2a26', fontWeight: 500 }}>{order.email}</span></p>
              
              <div style={{ marginBottom: '18px' }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '10px' }}>
                    <span style={{ color: '#2d2a26' }}>{item.name} x {item.quantity}</span>
                    <span style={{ color: '#5a6b4a', fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #c4a35a, transparent)', margin: '16px 0' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 700, color: '#2d2a26', fontFamily: 'Georgia, serif' }}>
                <span>Total</span>
                <span style={{ color: '#5a6b4a' }}>{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          )}

          <Link to="/" style={{
            display: 'inline-block',
            padding: '16px 40px',
            backgroundColor: '#5a6b4a',
            color: '#f8f5f0',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: 'Georgia, serif',
          }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;