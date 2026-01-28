import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Import the default helper (for loading) AND the raw api instance (for deleting)
import storefront, { axiosInstance as api } from '../api/storefront';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await storefront.getProducts();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to load inventory", error);
            setLoading(false);
        }
    };

    // UPDATED: Now performs actual deletion via API
    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;

        try {
            // 1. Send DELETE request to Backend
            await api.delete(`/products/${id}`);
            
            // 2. Remove from UI immediately (Optimistic Update)
            setProducts(products.filter(product => product.id !== id));
            
            alert("Product deleted successfully.");
        } catch (error) {
            console.error("Failed to delete product", error);
            alert("Failed to delete. Check console.");
        }
    };

    if (loading) return <div className="text-white">Loading Inventory...</div>;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
                <Link 
                    to="/admin/create" 
                    className="px-4 py-2 font-bold text-white transition bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500"
                >
                    + Add New Product
                </Link>
            </div>

            {/* Data Table */}
            <div className="overflow-hidden bg-gray-800 border border-gray-700 shadow-xl rounded-xl">
                <table className="w-full text-left text-gray-400">
                    <thead className="text-xs font-bold text-gray-200 uppercase bg-gray-900">
                        <tr>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {products.map((product) => (
                            <tr key={product.id} className="transition hover:bg-gray-700/50">
                                <td className="flex items-center gap-4 px-6 py-4">
                                    <img 
                                        src={product.image_url} 
                                        alt={product.name} 
                                        className="object-cover w-10 h-10 border border-gray-600 rounded"
                                    />
                                    <span className="font-medium text-white">{product.name}</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-cyan-400">${product.price}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        product.stock < 10 ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
                                    }`}>
                                        {product.stock} Units
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {product.is_featured ? (
                                        <span className="px-2 py-1 text-xs text-yellow-400 border rounded border-yellow-400/30">Featured</span>
                                    ) : (
                                        <span className="text-xs text-gray-500">Standard</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 space-x-3 text-right">
                                    <Link to={`/admin/edit/${product.id}`} className="text-sm text-blue-400 transition hover:text-white">Edit</Link>
                                    <button onClick={() => handleDelete(product.id)} className="text-sm text-red-400 transition hover:text-white">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}