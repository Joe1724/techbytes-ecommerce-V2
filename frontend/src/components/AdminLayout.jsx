import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function AdminLayout({ children }) {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Helper to highlight active link
    const NavItem = ({ to, icon, label }) => {
        const isActive = location.pathname === to;
        return (
            <Link 
                to={to} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
            >
                <span>{icon}</span>
                <span className="font-medium">{label}</span>
            </Link>
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-900">
            
            {/* SIDEBAR NAVIGATION */}
            <aside className="fixed flex flex-col w-64 h-full border-r border-gray-800 bg-gray-950">
                
                {/* Brand */}
                <div className="flex items-center h-16 px-6 border-b border-gray-800">
                    <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                        TB ADMIN
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavItem to="/admin/dashboard" icon="📊" label="Dashboard" />
                    <NavItem to="/admin/products" icon="📦" label="Inventory" />
                    <NavItem to="/admin/orders" icon="🛒" label="Orders" />
                    <NavItem to="/admin/users" icon="👥" label="Customers" />
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-gray-800">
                    <Link to="/" className="block w-full py-2 mb-2 text-sm text-center text-gray-500 hover:text-white">
                        &larr; Back to Store
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="w-full py-2 text-sm font-bold text-red-500 transition rounded-lg bg-red-600/10 hover:bg-red-600 hover:text-white"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 p-8 ml-64 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}