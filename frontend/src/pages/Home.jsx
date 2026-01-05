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
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8f5f0 0%, #f0ebe3 100%)',
      paddingTop: '110px', 
      paddingBottom: '60px' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: 700, 
            color: '#2d2a26', 
            marginBottom: '12px',
            fontFamily: 'Georgia, serif',
            letterSpacing: '-0.5px',
          }}>
            Our Collection
          </h1>
          <p style={{ fontSize: '17px', color: '#7a756e', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
            Curated selection of premium products for the discerning buyer
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <Loader size="lg" text="Loading collection..." />
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '28px',
          }}>
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