import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <div className="overflow-hidden transition duration-300 bg-gray-800 border border-gray-700 shadow-lg rounded-xl group hover:border-blue-500">
            {/* Image Container */}
            <div className="relative w-full h-48 overflow-hidden bg-gray-700">
                <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="object-cover w-full h-full transition duration-500 transform group-hover:scale-110"
                />
                {/* Stock Badge */}
                <div className="absolute top-2 right-2">
                    {product.stock > 0 ? (
                        <span className="px-2 py-1 text-xs font-bold text-white rounded-md shadow-sm bg-green-500/90">IN STOCK</span>
                    ) : (
                        <span className="px-2 py-1 text-xs font-bold text-white rounded-md shadow-sm bg-red-500/90">SOLD OUT</span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-white truncate transition group-hover:text-blue-400">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-400 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-cyan-400">${product.price}</span>
                    <Link 
                        to={`/product/${product.slug}`} 
                        className="px-4 py-2 text-sm font-medium text-white transition bg-gray-700 rounded-lg hover:bg-blue-600"
                    >
                        View Specs
                    </Link>
                </div>
            </div>
        </div>
    );
}