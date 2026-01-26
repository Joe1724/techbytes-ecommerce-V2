import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch Cart Data
    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cart', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cart:", error);
                setLoading(false);
            }
        };

        fetchCart();
    }, [navigate]);

    const removeItem = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://127.0.0.1:8000/api/cart/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(cartItems.filter(item => item.id !== id));
        } catch (error) {
            console.error(error);
            alert("Failed to remove item");
        }
    };

    const handleCheckout = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/checkout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(`Success! Order #${response.data.order_id} placed.`);
            setCartItems([]);
            navigate('/orders');
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Checkout failed. Please try again.");
        }
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);

    if (loading) return <div className="text-center mt-20 text-gray-400">Loading Cart...</div>;

    return (
        <div className="max-w-5xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Your Shopping Cart</h2>
            
            {cartItems.length === 0 ? (
                <div className="text-center bg-gray-800 p-10 rounded-xl border border-gray-700">
                    <p className="text-gray-400 text-xl">Your cart is empty.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center bg-gray-800 p-5 rounded-lg border border-gray-700 shadow-sm hover:border-gray-600 transition">
                                <div className="flex items-center gap-4">
                                    <img src={item.product.image_url} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                                    <div>
                                        <h4 className="text-lg font-bold text-white">{item.product.name}</h4>
                                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-green-400 mb-2">${(item.product.price * item.quantity).toFixed(2)}</p>
                                    <button 
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-400 hover:text-red-300 text-sm font-semibold underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-fit shadow-lg">
                        <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Order Summary</h3>
                        <div className="flex justify-between text-lg mb-6">
                            <span className="text-gray-300">Total:</span>
                            <span className="font-bold text-green-400">${totalPrice.toFixed(2)}</span>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}