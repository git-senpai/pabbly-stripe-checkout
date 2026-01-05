import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { getProducts } from '../services/api';
import toast from 'react-hot-toast';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8f5f0] to-[#f0ebe3] pt-27.5 pb-15">
      <div className="max-w-300 mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="text-[42px] font-bold text-[#2d2a26] mb-3 font-serif tracking-[-0.5px]">
            Our Collection
          </h1>
          <p className="text-[17px] text-[#7a756e] max-w-125 mx-auto leading-relaxed">
            Curated selection of premium products for the discerning buyer
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-75">
            <Loader size="lg" text="Loading collection..." />
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-7">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;