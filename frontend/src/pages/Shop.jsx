import { useEffect, useState } from 'react';
import storefront from '../api/storefront';
import ProductCard from '../components/ProductCard';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                // Fetch ALL products
                const data = await storefront.getProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) return <div className="mt-20 text-center text-cyan-500 animate-pulse">Loading Catalog...</div>;

    return (
        <div>
            <div className="pb-4 mb-8 border-b border-gray-800">
                <h1 className="text-3xl font-bold text-white">Full Catalog</h1>
                <p className="text-gray-400">Browse our complete collection of high-performance gear.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}