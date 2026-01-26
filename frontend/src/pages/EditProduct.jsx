import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        stock: '',
        image_url: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Fetch all products and find the one with the matching ID
                const res = await axios.get('http://127.0.0.1:8000/api/products');
                const product = res.data.data.find(p => p.id == id);
                
                if (product) {
                    setFormData({
                        name: product.name,
                        slug: product.slug,
                        description: product.description,
                        price: product.price,
                        stock: product.stock,
                        image_url: product.image_url
                    });
                    setLoading(false);
                } else {
                    alert("Product not found");
                    navigate('/admin');
                }
            } catch (error) {
                console.error(error);
                alert("Error fetching product data");
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.put(`http://127.0.0.1:8000/api/products/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Product Updated Successfully!');
            navigate('/admin');
        } catch (error) {
            console.error(error);
            alert('Failed to update product.');
        }
    };

    if (loading) return <div className="text-center mt-20 text-gray-400">Loading product data...</div>;

    // Shared Tailwind Classes
    const inputClass = "w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500 transition";
    const labelClass = "block text-gray-400 mb-2 text-sm font-bold";

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Edit Product #{id}</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="md:col-span-2">
                    <label className={labelClass}>Product Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required className={inputClass} />
                </div>

                <div>
                    <label className={labelClass}>Slug (URL)</label>
                    <input name="slug" value={formData.slug} onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Price ($)</label>
                    <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required className={inputClass} />
                </div>

                <div>
                    <label className={labelClass}>Stock Quantity</label>
                    <input name="stock" type="number" value={formData.stock} onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Image URL</label>
                    <input name="image_url" value={formData.image_url} onChange={handleChange} required className={inputClass} />
                </div>

                <div className="md:col-span-2">
                    <label className={labelClass}>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required className={`${inputClass} h-32`} />
                </div>

                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 rounded-lg transition duration-200 shadow-lg">
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
}