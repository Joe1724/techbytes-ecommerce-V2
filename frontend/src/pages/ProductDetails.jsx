import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import storefront from '../api/storefront'; // <--- Import

export default function ProductDetails() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await storefront.getProduct(slug);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        loadProduct();
    }, [slug]);

    const handleAddToCart = async () => {
        try {
            await storefront.addToCart(product.id);
            alert("Added to cart!");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("Please login first");
                navigate('/login');
            } else {
                alert("Failed to add item");
            }
        }
    };

    if (loading) return <div className="mt-20 text-center text-gray-400">Loading...</div>;
    if (!product) return <div className="mt-20 text-center text-red-500">Product not found</div>;

    return (
        <div className="flex flex-col max-w-6xl gap-12 p-8 mx-auto mt-10 bg-gray-800 border border-gray-700 shadow-2xl rounded-2xl md:flex-row">
            {/* Image */}
            <div className="w-full md:w-1/2">
                <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="object-cover w-full border border-gray-600 shadow-lg h-96 rounded-xl"
                />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center w-full md:w-1/2">
                <h1 className="mb-6 text-5xl font-bold text-white">{product.name}</h1>
                <p className="pl-4 mb-8 text-lg leading-relaxed text-gray-300 border-l-4 border-blue-500">
                    {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-10">
                    <span className="text-4xl font-bold text-cyan-400">${product.price}</span>
                    <span className={`px-4 py-2 rounded text-sm font-bold tracking-wide ${product.stock > 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {product.stock > 0 ? `${product.stock} IN STOCK` : 'OUT OF STOCK'}
                    </span>
                </div>

                <button 
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="w-full py-4 font-bold text-white transition duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ADD TO SETUP
                </button>
            </div>
        </div>
    );
}