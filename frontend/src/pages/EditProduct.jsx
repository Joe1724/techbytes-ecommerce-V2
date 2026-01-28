import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance as api } from '../api/storefront';

export default function EditProduct() {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);
    
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        category: '',
        description: '',
        is_featured: false,
        image: null 
    });

    // 1. Load Existing Data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Determine if we are using an ID or a Slug
                const response = await api.get(`/products/${id}`);
                
                // FIX: Check if the data is wrapped in a "data" property or comes raw
                const product = response.data.data ? response.data.data : response.data;
                
                setFormData({
                    name: product.name,
                    price: product.price,
                    stock: product.stock,
                    category: product.category,
                    description: product.description,
                    // Handle all truthy values for the checkbox (1, "1", true)
                    is_featured: product.is_featured === 1 || product.is_featured === true || product.is_featured === "1",
                    image: null // Keep null unless user selects NEW file
                });
                
                setImagePreview(product.image_url); // Show current image
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch product", error);
                alert("Product not found or failed to load.");
                navigate('/admin/products');
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        // TRICK: Laravel needs POST to handle files, but we spoof PUT
        data.append('_method', 'PUT'); 
        
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
            await api.post(`/products/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Product Updated Successfully!');
            navigate('/admin/products');
        } catch (error) {
            console.error("Failed to update product", error);
            alert("Error updating product.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-white">Loading Product Data...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="mb-8 text-3xl font-bold text-white">Edit Product</h1>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-gray-800 border border-gray-700 shadow-xl rounded-xl">
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-400">Product Name</label>
                        <input 
                            type="text" name="name" required value={formData.name}
                            className="w-full px-4 py-3 text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-400">Category</label>
                        <select 
                            name="category" required value={formData.category}
                            className="w-full px-4 py-3 text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                        >
                            <option value="laptops">Laptops</option>
                            <option value="keyboards">Keyboards</option>
                            <option value="headphones">Headphones</option>
                            <option value="monitors">Monitors</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-400">Price ($)</label>
                        <input 
                            type="number" name="price" required step="0.01" value={formData.price}
                            className="w-full px-4 py-3 text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-400">Stock Quantity</label>
                        <input 
                            type="number" name="stock" required value={formData.stock}
                            className="w-full px-4 py-3 text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-bold text-gray-400">Description</label>
                    <textarea 
                        name="description" required rows="4" value={formData.description}
                        className="w-full px-4 py-3 text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Image Section */}
                <div className="relative flex flex-col items-center justify-center p-6 transition border-2 border-gray-600 border-dashed cursor-pointer rounded-xl bg-gray-900/50 hover:border-blue-500">
                    <input 
                        type="file" accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                    />
                    
                    <div className="text-center">
                        <img src={imagePreview} alt="Preview" className="object-contain h-48 mx-auto mb-4 rounded-lg" />
                        <p className="text-sm text-blue-400">Click to replace image (optional)</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <input 
                        type="checkbox" name="is_featured" id="featured" checked={formData.is_featured}
                        className="w-5 h-5 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                        onChange={handleChange}
                    />
                    <label htmlFor="featured" className="text-white cursor-pointer select-none">Mark as Featured</label>
                </div>

                <button 
                    type="submit" disabled={loading}
                    className="w-full py-4 font-bold text-white transition transform shadow-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl active:scale-95 disabled:opacity-50"
                >
                    {loading ? 'Updating...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
}