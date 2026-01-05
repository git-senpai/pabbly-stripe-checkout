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
      <div className="min-h-screen bg-linear-to-br from-[#f8f5f0] to-[#f0ebe3] flex items-center justify-center">
        <Loader size="lg" text="Loading order..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8f5f0] to-[#f0ebe3] pt-32.5 pb-15">
      <div className="max-w-130 mx-auto px-6">
        <div className="bg-[#faf8f5] rounded-3xl p-12 shadow-[0_8px_32px_rgba(45,42,38,0.12)] border border-[rgba(139,154,110,0.2)] text-center">
          <div className="w-22 h-22 bg-linear-to-br from-[#e8f0e4] to-[#d4e0d0] rounded-full flex items-center justify-center mx-auto mb-7">
            <CheckCircle size={44} className="text-[#5a6b4a]" />
          </div>
          
          <h1 className="text-[32px] font-bold text-[#2d2a26] mb-3 font-serif">Order Confirmed</h1>
          <p className="text-[#7a756e] mb-9 text-base">Thank you for your purchase</p>

          {order && (
            <div className="bg-linear-to-br from-[#f0ebe3] to-[#e8e2d7] rounded-2xl p-6 mb-9 text-left">
              <p className="text-[13px] text-[#7a756e] mb-4.5">
                Confirmation sent to: <span className="text-[#2d2a26] font-medium">{order.email}</span>
              </p>
              
              <div className="mb-4.5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm mb-2.5">
                    <span className="text-[#2d2a26]">{item.name} x {item.quantity}</span>
                    <span className="text-[#5a6b4a] font-semibold">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="h-px bg-linear-to-r from-transparent via-[#c4a35a] to-transparent my-4" />
              
              <div className="flex justify-between text-lg font-bold text-[#2d2a26] font-serif">
                <span>Total</span>
                <span className="text-[#5a6b4a]">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          )}

          <Link 
            to="/" 
            className="inline-block py-4 px-10 bg-[#5a6b4a] text-[#f8f5f0] no-underline rounded-xl text-base font-semibold font-serif transition-colors hover:bg-[#4a5a3a]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;