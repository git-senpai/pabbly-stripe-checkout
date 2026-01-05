import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { getCancelledOrder } from '../services/api';
import Loader from '../components/Loader';

const Cancel = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateOrder = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }
      try {
        await getCancelledOrder(sessionId);
      } catch {
        console.error('Error updating order');
      } finally {
        setLoading(false);
      }
    };
    updateOrder();
  }, [sessionId]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f5f0 0%, #f0ebe3 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader size="lg" />
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
            background: 'linear-gradient(135deg, #f5e8e8 0%, #e8d4d4 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
          }}>
            <XCircle size={44} color="#a05050" />
          </div>
          
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#2d2a26', marginBottom: '12px', fontFamily: 'Georgia, serif' }}>Payment Failure</h1>
          <p style={{ color: '#7a756e', marginBottom: '36px', fontSize: '16px', lineHeight: '1.6' }}>Your payment was not completed. No charges were made to your account.</p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/cart" style={{
              display: 'inline-block',
              padding: '16px 32px',
              backgroundColor: '#5a6b4a',
              color: '#f8f5f0',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'Georgia, serif',
            }}>
              Try Again
            </Link>
            <Link to="/" style={{
              display: 'inline-block',
              padding: '16px 32px',
              backgroundColor: '#e8e2d7',
              color: '#2d2a26',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'Georgia, serif',
            }}>
              Browse Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;