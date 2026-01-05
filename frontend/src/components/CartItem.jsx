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
    <div className="flex items-center gap-5 p-5 bg-[#faf8f5] rounded-2xl shadow-[0_2px_12px_rgba(45,42,38,0.06)] border border-[rgba(139,154,110,0.15)]">
      <div className="w-20 h-20 bg-linear-to-b from-[#f0ebe3] to-[#e8e2d7] rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2">
        <img 
          src={item.image} 
          alt={item.name} 
          className="max-w-full max-h-full object-contain" 
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-[#2d2a26] overflow-hidden text-ellipsis whitespace-nowrap font-serif">
          {item.name}
        </h3>
        <p className="text-sm text-[#7a756e] mt-1">{formatPrice(item.price)}</p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          className="w-8.5 h-8.5 bg-[#e8e2d7] border-none rounded-lg cursor-pointer flex items-center justify-center text-[#5a6b4a]"
        >
          <Minus size={14} />
        </button>
        <span className="w-7 text-center text-[15px] font-semibold text-[#2d2a26]">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          className="w-8.5 h-8.5 bg-[#e8e2d7] border-none rounded-lg cursor-pointer flex items-center justify-center text-[#5a6b4a]"
        >
          <Plus size={14} />
        </button>
      </div>

      <span className="text-base font-bold text-[#5a6b4a] w-22.5 text-right font-serif">
        {formatPrice(item.price * item.quantity)}
      </span>

      <button
        onClick={() => removeFromCart(item.productId)}
        className="p-2 bg-transparent border-none cursor-pointer text-[#a09890] transition-colors duration-200 hover:text-[#c45c5c]"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default CartItem;