import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance as api } from '../api/storefront'; // Use our fixed instance

export default function CreateProduct() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        category: '',
        description: '',
        is_featured: false,
        image: null // This will hold the actual file
    });

    // Handle Text Inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle Image Selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file)); // Create local preview URL
        }
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // We must use FormData for file uploads, not JSON
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('stock', formData.stock);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('is_featured', formData.is_featured ? 1 : 0);
        
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await api.post('/products', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Product Created Successfully!');
            navigate('/admin/products');
        } catch (error) {
            console.error("Failed to create product", error);
            alert("Error creating product. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="mb-8 text-3xl font-bold text-white">Add New Product</h1>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-gray-800 border border-gray-700 shadow-xl rounded-xl">
                
                {/* 1. Basic Info Row */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-400">Product Name</label>
                        <input 
                            type="text" name="name" required
                            className="w-full px-4 py-3 text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="e.g. Zephyrus G14"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-400">Category</label>
                        <select 
                            name="category" required
                            className="w-full px-4 py-3 text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            <option value="laptops">Laptops</option>
                            <option value="keyboards">Keyboards</option>
                            <option value="headphones">Headphones</option>
                            <option value="monitors">Monitors</option>
                        </select>
                    </div>
                </div>

                {/* 2. Price & Stock Row */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-400">Price ($)</label>
                        <input 
                            type="number" name="price" required step="0.01"
                            className="w-full px-4 py-3 text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="0.00"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-400">Stock Quantity</label>
                        <input 
                            type="number" name="stock" required
                            className="w-full px-4 py-3 text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="0"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* 3. Description */}
                <div>
                    <label className="block mb-2 text-sm font-bold text-gray-400">Description</label>
                    <textarea 
                        name="description" required rows="4"
                        className="w-full px-4 py-3 text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Product details..."
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* 4. Image Upload & Preview */}
                <div className="relative flex flex-col items-center justify-center p-6 transition border-2 border-gray-600 border-dashed cursor-pointer rounded-xl bg-gray-900/50 hover:border-blue-500">
                    <input 
                        type="file" accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                    />
                    
                    {imagePreview ? (
                        <div className="text-center">
                            <img src={imagePreview} alt="Preview" className="object-contain h-48 mx-auto mb-4 rounded-lg" />
                            <p className="text-sm text-blue-400">Click to change image</p>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400">
                            <span className="block mb-2 text-4xl">📷</span>
                            <p className="font-medium">Click to upload product image</p>
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                    )}
                </div>

                {/* 5. Featured Toggle */}
                <div className="flex items-center gap-3">
                    <input 
                        type="checkbox" name="is_featured" id="featured"
                        className="w-5 h-5 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                        onChange={handleChange}
                    />
                    <label htmlFor="featured" className="text-white cursor-pointer select-none">Mark as Featured (Trending)</label>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" disabled={loading}
                    className="w-full py-4 font-bold text-white transition transform shadow-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Creating...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
}