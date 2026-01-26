import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="pt-16 pb-8 text-gray-400 bg-gray-900 border-t border-gray-800">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                
                {/* Top Section: 4 Columns */}
                <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-4">
                    
                    {/* Column 1: Brand */}
                    <div>
                        <Link to="/" className="inline-block mb-4 text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            TECH<span className="text-white">BYTES</span>
                        </Link>
                        <p className="mb-6 text-sm leading-relaxed">
                            The premier destination for high-performance hardware, peripherals, and gaming setups. Level up your daily drive.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Placeholders (Simple SVGs) */}
                            <a href="#" className="text-gray-400 transition hover:text-white"><i className="flex items-center justify-center w-6 h-6 text-xs border border-gray-600 rounded-full">FB</i></a>
                            <a href="#" className="text-gray-400 transition hover:text-white"><i className="flex items-center justify-center w-6 h-6 text-xs border border-gray-600 rounded-full">X</i></a>
                            <a href="#" className="text-gray-400 transition hover:text-white"><i className="flex items-center justify-center w-6 h-6 text-xs border border-gray-600 rounded-full">IG</i></a>
                        </div>
                    </div>

                    {/* Column 2: Shop */}
                    <div>
                        <h3 className="mb-4 font-bold tracking-wider text-white uppercase">Shop</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/products/trending" className="transition hover:text-blue-400">Trending Gear</Link></li>
                            <li><Link to="/products/on-sale" className="transition hover:text-blue-400">Flash Sales</Link></li>
                            <li><a href="#" className="transition hover:text-blue-400">Laptops</a></li>
                            <li><a href="#" className="transition hover:text-blue-400">Mechanical Keyboards</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h3 className="mb-4 font-bold tracking-wider text-white uppercase">Support</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="transition hover:text-blue-400">Order Status</a></li>
                            <li><a href="#" className="transition hover:text-blue-400">Shipping Policy</a></li>
                            <li><a href="#" className="transition hover:text-blue-400">Returns & Warranty</a></li>
                            <li><a href="#" className="transition hover:text-blue-400">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h3 className="mb-4 font-bold tracking-wider text-white uppercase">Stay in the Loop</h3>
                        <p className="mb-4 text-sm">Get the latest drops and exclusive deals.</p>
                        <form className="flex flex-col gap-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="px-4 py-2 text-sm text-white transition bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                            />
                            <button className="px-4 py-2 text-sm font-bold text-white transition bg-blue-600 rounded hover:bg-blue-500">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-gray-800"></div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-between text-xs md:flex-row">
                    <p>&copy; 2026 TechBytes Inc. All rights reserved.</p>
                    <div className="flex mt-4 space-x-6 md:mt-0">
                        <a href="#" className="transition hover:text-white">Privacy Policy</a>
                        <a href="#" className="transition hover:text-white">Terms of Service</a>
                        <a href="#" className="transition hover:text-white">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}