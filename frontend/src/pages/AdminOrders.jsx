import { useEffect, useState } from 'react';
import { axiosInstance as api } from '../api/storefront';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/admin/orders');
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch orders", error);
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            // Optimistic UI Update (Change it on screen immediately)
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );

            // Send to Backend
            await api.put(`/admin/orders/${orderId}`, { status: newStatus });
            
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status");
            fetchOrders(); // Revert on error
        }
    };

    // Helper to color-code statuses
    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'processing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'shipped': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            case 'delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-500';
        }
    };

    if (loading) return <div className="text-white">Loading Orders...</div>;

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold text-white">Order Management</h1>

            <div className="overflow-hidden bg-gray-800 border border-gray-700 shadow-xl rounded-xl">
                <table className="w-full text-left text-gray-400">
                    <thead className="text-xs font-bold text-gray-200 uppercase bg-gray-900">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {orders.map((order) => (
                            <tr key={order.id} className="transition hover:bg-gray-700/50">
                                <td className="px-6 py-4 font-mono text-sm text-gray-500">#{order.id}</td>
                                <td className="px-6 py-4 font-medium text-white">
                                    {order.user ? order.user.name : 'Guest'}
                                    <div className="text-xs text-gray-500">{order.user?.email}</div>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 font-mono font-bold text-green-400">
                                    ${order.total_price}
                                </td>
                                <td className="px-6 py-4">
                                    <select 
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className={`text-xs font-bold px-3 py-1.5 rounded border outline-none cursor-pointer ${getStatusColor(order.status)} bg-transparent`}
                                    >
                                        <option className="text-gray-300 bg-gray-800" value="pending">Pending</option>
                                        <option className="text-gray-300 bg-gray-800" value="processing">Processing</option>
                                        <option className="text-gray-300 bg-gray-800" value="shipped">Shipped</option>
                                        <option className="text-gray-300 bg-gray-800" value="delivered">Delivered</option>
                                        <option className="text-gray-300 bg-gray-800" value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {orders.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No orders found.</div>
                )}
            </div>
        </div>
    );
}