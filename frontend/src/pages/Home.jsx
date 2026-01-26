import { useEffect, useState } from 'react';
import storefront from '../api/storefront';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import SaleTimer from '../components/SaleTimer';
import { Link } from 'react-router-dom'; // <--- Ensure this is imported

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [saleProducts, setSaleProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStore = async () => {
            try {
                const [featured, onSale] = await Promise.all([
                    storefront.getFeaturedProducts(),
                    storefront.getOnSaleProducts()
                ]);
                
                setFeaturedProducts(featured);
                setSaleProducts(onSale);
                setLoading(false);
            } catch (error) {
                console.error("Store error:", error);
                setLoading(false);
            }
        };
        loadStore();
    }, []);

    if (loading) return <div className="mt-20 text-xl text-center text-cyan-500 animate-pulse">Loading Storefront...</div>;

    const saleEndDate = saleProducts.length > 0 ? saleProducts[0].sale_end_date : null;

    return (
        <div>
            {/* 1. Dynamic Hero Section */}
            <Hero />

            {/* 2. Flash Sale Timer */}
            {saleProducts.length > 0 && <SaleTimer saleEndDate={saleEndDate} />}

            {/* 3. Top Picks Catalog */}
            <div className="flex items-center justify-between pl-4 mb-8 border-l-4 border-blue-500">
                <h2 className="text-3xl font-bold text-white">
                    Trending Gear
                </h2>
                
                {/* --- FIX IS HERE --- */}
                {/* Changed from <a> to <Link> to point to your new Shop Page */}
                <Link to="/shop" className="text-sm font-semibold text-blue-400 hover:text-blue-300">
                    View All &rarr;
                </Link>
                {/* ------------------- */}
                
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {featuredProducts.length > 0 ? (
                    featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-4 py-10 text-center bg-gray-800 rounded-xl">
                        <p className="text-gray-400">No featured products found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}