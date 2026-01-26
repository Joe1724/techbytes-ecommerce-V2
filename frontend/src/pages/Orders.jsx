import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/orders', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Orders...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Order History</h2>

            {orders.length === 0 ? (
                <p style={{ textAlign: 'center' }}>You have no past orders.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map(order => (
                        <div key={order.id} style={{ 
                            border: '1px solid #444', 
                            borderRadius: '8px', 
                            padding: '20px',
                            background: '#222' 
                        }}>
                            {/* Order Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #555', paddingBottom: '10px', marginBottom: '10px' }}>
                                <h3>Order #{order.id}</h3>
                                <div>
                                    <span style={{ marginRight: '15px', color: '#aaa' }}>{new Date(order.created_at).toLocaleDateString()}</span>
                                    <span style={{ 
                                        padding: '5px 10px', 
                                        borderRadius: '4px', 
                                        background: order.status === 'pending' ? 'orange' : 'green',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        fontSize: '0.8rem'
                                    }}>
                                        {order.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                {order.items.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                                        <span>{item.product.name} (x{item.quantity})</span>
                                        <span>${item.price}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Order Total */}
                            <div style={{ textAlign: 'right', marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #555' }}>
                                <h4>Total: <span style={{ color: '#4CAF50' }}>${order.total_price}</span></h4>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}