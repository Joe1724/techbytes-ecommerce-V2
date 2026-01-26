import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        stock: '',
        image_url: 'https://via.placeholder.com/640x480.png/00dd00?text=NewProduct'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://127.0.0.1:8000/api/products', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Product Created Successfully!');
            navigate('/admin');
        } catch (error) {
            console.error(error);
            alert('Failed to create product.');
        }
    };

    // Shared Tailwind Classes for Inputs
    const inputClass = "w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition";
    const labelClass = "block text-gray-400 mb-2 text-sm font-bold";

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Add New Product</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Width Name */}
                <div className="md:col-span-2">
                    <label className={labelClass}>Product Name</label>
                    <input name="name" placeholder="e.g. Gaming Mouse" onChange={handleChange} required className={inputClass} />
                </div>

                {/* Slug & Price */}
                <div>
                    <label className={labelClass}>Slug (URL)</label>
                    <input name="slug" placeholder="gaming-mouse" onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Price ($)</label>
                    <input name="price" type="number" step="0.01" placeholder="49.99" onChange={handleChange} required className={inputClass} />
                </div>

                {/* Stock & Image */}
                <div>
                    <label className={labelClass}>Stock Quantity</label>
                    <input name="stock" type="number" placeholder="100" onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Image URL</label>
                    <input name="image_url" defaultValue={formData.image_url} onChange={handleChange} required className={inputClass} />
                </div>

                {/* Description - Full Width */}
                <div className="md:col-span-2">
                    <label className={labelClass}>Description</label>
                    <textarea name="description" placeholder="Product details..." onChange={handleChange} required className={`${inputClass} h-32`} />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg">
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
}