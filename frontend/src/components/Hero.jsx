import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <div className="relative mb-12 overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80" 
                    alt="Gaming Setup" 
                    className="object-cover w-full h-full opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-2xl px-6 py-16 md:py-24 md:px-12">
                <span className="block mb-2 font-bold tracking-wider text-blue-400 uppercase">
                    New Arrivals
                </span>
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                    Level Up Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                        Battle Station
                    </span>
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-gray-300">
                    Experience elite performance with our latest arrival of RTX 40-Series laptops and mechanical keyboards.
                </p>
                <div className="flex gap-4">
                                        <Link 
                        to="/product/zephyrus-g14-2026" 
                        className="px-8 py-3 font-bold text-white transition transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-500 hover:scale-105 shadow-blue-500/30"
                    >
                        Shop Now
                    </Link>
                    <button className="px-6 py-3 font-semibold text-gray-300 transition border border-gray-600 rounded-full hover:text-white hover:border-gray-400">
                        View Ecosystem
                    </button>
                </div>
            </div>
        </div>
    );
}