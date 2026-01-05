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
    <div className="bg-[#faf8f5] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(45,42,38,0.08)] transition-all duration-300 border border-[rgba(139,154,110,0.2)] hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(45,42,38,0.12)]">
      <div className="aspect-square bg-linear-to-b from-[#f0ebe3] to-[#e8e2d7] p-7 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <div className="p-6">
        <h3 className="text-[17px] font-semibold text-[#2d2a26] mb-2 overflow-hidden text-ellipsis whitespace-nowrap font-serif">
          {product.name}
        </h3>

        <p className="text-[13px] text-[#7a756e] mb-5 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#5a6b4a] font-serif">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="w-10.5 h-10.5 bg-[#5a6b4a] text-[#f8f5f0] border-none rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#4a5a3a] hover:scale-110"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;