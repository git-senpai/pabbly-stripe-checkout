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
      <div className="min-h-screen bg-linear-to-br from-[#f8f5f0] to-[#f0ebe3] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8f5f0] to-[#f0ebe3] pt-32.5 pb-15">
      <div className="max-w-130 mx-auto px-6">
        <div className="bg-[#faf8f5] rounded-3xl p-12 shadow-[0_8px_32px_rgba(45,42,38,0.12)] border border-[rgba(139,154,110,0.2)] text-center">
          <div className="w-22 h-22 bg-linear-to-br from-[#f5e8e8] to-[#e8d4d4] rounded-full flex items-center justify-center mx-auto mb-7">
            <XCircle size={44} className="text-[#a05050]" />
          </div>
          
          <h1 className="text-[32px] font-bold text-[#2d2a26] mb-3 font-serif">Payment Failure</h1>
          <p className="text-[#7a756e] mb-9 text-base leading-relaxed">Your payment was not completed. No charges were made to your account.</p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              to="/cart" 
              className="inline-block py-4 px-8 bg-[#5a6b4a] text-[#f8f5f0] no-underline rounded-xl text-base font-semibold font-serif transition-colors hover:bg-[#4a5a3a]"
            >
              Try Again
            </Link>
            <Link 
              to="/" 
              className="inline-block py-4 px-8 bg-[#e8e2d7] text-[#2d2a26] no-underline rounded-xl text-base font-semibold font-serif transition-colors hover:bg-[#ddd4c5]"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;