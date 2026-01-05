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
      <div className="min-h-screen bg-linear-to-br from-[#f8f5f0] to-[#f0ebe3] flex items-center justify-center">
        <Loader size="lg" text="Redirecting to payment..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8f5f0] to-[#f0ebe3] pt-27.5 pb-15">
      <div className="max-w-250 mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#2d2a26] mb-2 font-serif">Your Cart</h1>
          <p className="text-base text-[#7a756e]">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
            <div className="flex flex-col gap-4">
              {cartItems.map((item, index) => (
                <CartItem key={item.productId || index} item={item} />
              ))}
            </div>

            <div className="bg-[#faf8f5] rounded-3xl p-8 shadow-[0_4px_24px_rgba(45,42,38,0.1)] border border-[rgba(139,154,110,0.2)] sticky top-22.5">
              <h2 className="text-xl font-bold text-[#2d2a26] mb-6 font-serif">Order Summary</h2>
              
              <div className="mb-6">
                <div className="flex justify-between mb-3.5 text-[#7a756e] text-[15px]">
                  <span>Subtotal</span>
                  <span className="text-[#2d2a26] font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between mb-4.5 text-[#7a756e] text-[15px]">
                  <span>Shipping</span>
                  <span className="text-[#5a6b4a] font-semibold">Complimentary</span>
                </div>
                <div className="h-px bg-linear-to-r from-transparent via-[#d4c9b8] to-transparent mb-4.5" />
                <div className="flex justify-between text-[19px] font-bold text-[#2d2a26] font-serif">
                  <span>Total</span>
                  <span className="text-[#5a6b4a]">{formatPrice(total)}</span>
                </div>
              </div>

              <form onSubmit={handleCheckout}>
                <div className="mb-5">
                  <label className="block text-[13px] text-[#7a756e] mb-2 font-medium">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a09890]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-11 pr-3.5 py-3.5 text-[15px] border border-[#d4c9b8] rounded-xl bg-white outline-none transition-colors focus:border-[#5a6b4a]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full p-4 rounded-xl text-base font-semibold font-serif flex items-center justify-center gap-2.5 transition-colors ${
                    loading 
                      ? 'bg-[#a09890] text-[#f8f5f0] cursor-not-allowed' 
                      : 'bg-[#5a6b4a] text-[#f8f5f0] cursor-pointer hover:bg-[#4a5a3a]'
                  }`}
                >
                  {loading ? <Loader size="sm" text="" /> : <><span>Proceed to Payment</span><ArrowRight size={18} /></>}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center py-25">
            <div className="w-25 h-25 bg-linear-to-br from-[#e8e2d7] to-[#d4c9b8] rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={40} className="text-[#5a6b4a]" />
            </div>
            <h2 className="text-[28px] font-bold text-[#2d2a26] mb-3 font-serif">Your cart is empty</h2>
            <p className="text-[#7a756e] mb-8 text-base">Discover our curated collection</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2.5 py-4 px-8 bg-[#5a6b4a] text-[#f8f5f0] no-underline rounded-xl text-base font-semibold font-serif transition-colors hover:bg-[#4a5a3a]"
            >
              Explore Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;