import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Footer from './Footer';

export default function Layout({ children }) {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col min-h-screen font-sans text-white bg-gray-900">
            {/* DEBUG STRIP - DELETE AFTER FIXING */}
<div className="p-1 font-mono text-xs text-center text-white bg-red-600">
    DEBUG INFO: User: {user ? user.name : 'Not Logged In'} | Role: {user ? user.role : 'UNDEFINED'}
</div>
            {/* TechBytes Navbar */}
            <nav className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700 shadow-lg">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        
                        {/* Brand Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl font-extrabold tracking-tighter text-transparent transition bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 hover:opacity-80">
                                TECH<span className="text-white">BYTES</span>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:block">
                            <div className="flex items-baseline ml-10 space-x-4">
                                <Link to="/" className="px-3 py-2 text-sm font-medium transition rounded-md hover:bg-gray-700">Store</Link>
                                
                                {user ? (
                                    <>
                                        <Link to="/cart" className="px-3 py-2 text-sm font-medium transition rounded-md hover:bg-gray-700">Cart</Link>
                                        <Link to="/orders" className="px-3 py-2 text-sm font-medium transition rounded-md hover:bg-gray-700">Orders</Link>
                                        
                                        {/* SECURE ADMIN BUTTON: Only shows if role is 'admin' */}
                                        {user.role === 'admin' && (
                                            <Link 
                                                to="/admin/dashboard" 
                                                className="px-3 py-2 ml-2 text-sm font-bold text-white transition transform rounded-md shadow-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-blue-500/30 hover:scale-105"
                                            >
                                                Admin Portal
                                            </Link>
                                        )}

                                        <button onClick={handleLogout} className="px-4 py-2 ml-4 text-sm font-medium text-white transition bg-red-600 rounded-md hover:bg-red-700">Logout</button>
                                    </>
                                ) : (
                                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-md hover:bg-blue-500">Login</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container flex-grow px-4 py-8 mx-auto">
                {children}
            </main>

            {/* NEW FOOTER COMPONENT */}
            <Footer />
        </div>
    );
}