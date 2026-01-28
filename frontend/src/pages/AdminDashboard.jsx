import { useEffect, useState } from 'react';
import { axiosInstance as api } from '../api/storefront';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        products: 0,
        customers: 0,
        low_stock: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats');
                setStats(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to load stats", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="text-white">Loading Dashboard...</div>;

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold text-white">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                
                {/* 1. Total Revenue */}
                <div className="p-6 bg-gray-800 border border-gray-700 shadow-lg rounded-xl">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                            <h3 className="mt-1 text-2xl font-bold text-white">
                                ${Number(stats.revenue).toLocaleString()}
                            </h3>
                        </div>
                        <div className="p-2 rounded-lg bg-green-500/10">
                            <span className="text-xl text-green-400">💰</span>
                        </div>
                    </div>
                </div>

                {/* 2. Total Orders */}
                <div className="p-6 bg-gray-800 border border-gray-700 shadow-lg rounded-xl">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-400">Total Orders</p>
                            <h3 className="mt-1 text-2xl font-bold text-white">{stats.orders}</h3>
                        </div>
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <span className="text-xl text-blue-400">📦</span>
                        </div>
                    </div>
                </div>

                {/* 3. Products In Stock */}
                <div className="p-6 bg-gray-800 border border-gray-700 shadow-lg rounded-xl">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-400">Total Products</p>
                            <h3 className="mt-1 text-2xl font-bold text-white">{stats.products}</h3>
                        </div>
                        <div className="p-2 rounded-lg bg-purple-500/10">
                            <span className="text-xl text-purple-400">🎮</span>
                        </div>
                    </div>
                </div>

                {/* 4. Customers */}
                <div className="p-6 bg-gray-800 border border-gray-700 shadow-lg rounded-xl">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-400">Active Customers</p>
                            <h3 className="mt-1 text-2xl font-bold text-white">{stats.customers}</h3>
                        </div>
                        <div className="p-2 rounded-lg bg-orange-500/10">
                            <span className="text-xl text-orange-400">👥</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Low Stock Alert */}
            {stats.low_stock > 0 && (
                <div className="flex items-center gap-3 p-4 mb-8 border bg-red-500/10 border-red-500/50 rounded-xl">
                    <span className="text-2xl">⚠️</span>
                    <div>
                        <h4 className="font-bold text-red-400">Low Stock Alert</h4>
                        <p className="text-sm text-gray-400">You have {stats.low_stock} items with less than 10 units in stock. Check inventory.</p>
                    </div>
                </div>
            )}
        </div>
    );
}