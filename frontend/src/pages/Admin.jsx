import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Admin() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/products?page=1'); 
            setProducts(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if(!confirm("Are you sure you want to delete this product?")) return;
        
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://127.0.0.1:8000/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Product deleted!");
            fetchProducts();
        } catch (error) {
            console.error(error);
            alert("Failed to delete product.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10">
            <div className="flex justify-between items-center mb-8 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
                <Link to="/admin/create">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md flex items-center gap-2">
                        <span>+</span> Add New Product
                    </button>
                </Link>
            </div>

            <div className="overflow-x-auto bg-gray-800 rounded-xl border border-gray-700 shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-900 text-gray-400 uppercase text-sm leading-normal border-b border-gray-700">
                            <th className="py-4 px-6">ID</th>
                            <th className="py-4 px-6">Product Name</th>
                            <th className="py-4 px-6">Price</th>
                            <th className="py-4 px-6">Stock</th>
                            <th className="py-4 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300 text-sm font-light">
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700 transition duration-150">
                                <td className="py-4 px-6 font-bold">{product.id}</td>
                                <td className="py-4 px-6 flex items-center gap-3">
                                    <img src={product.image_url} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-600"/>
                                    <span className="font-medium text-white">{product.name}</span>
                                </td>
                                <td className="py-4 px-6 text-green-400 font-bold">${product.price}</td>
                                <td className="py-4 px-6">
                                    <span className={`py-1 px-3 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                        {product.stock} in stock
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <div className="flex item-center justify-center gap-2">
                                        <Link to={`/admin/edit/${product.id}`}>
                                            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-1 px-3 rounded text-xs transition">
                                                Edit
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}