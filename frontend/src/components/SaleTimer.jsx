import { useState, useEffect } from 'react';

export default function SaleTimer({ saleEndDate }) {
    // Helper function to calculate time remaining
    const calculateTimeLeft = () => {
        const difference = +new Date(saleEndDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                m: Math.floor((difference / 1000 / 60) % 60),
                s: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // Update timer every second
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    if (!saleEndDate) return null;

    return (
        <div className="flex flex-col items-center justify-between p-6 mb-12 text-white border shadow-lg bg-gradient-to-r from-red-900/80 to-red-600/80 backdrop-blur-sm rounded-xl md:flex-row border-red-500/30">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
                <span className="text-4xl">⚡</span>
                <div>
                    <h3 className="text-2xl font-bold tracking-widest text-white uppercase">Flash Sale</h3>
                    <p className="text-red-100">Limited time offer on select peripherals!</p>
                </div>
            </div>
            
            <div className="flex gap-3 text-center">
                <div className="bg-black/30 rounded-lg p-3 min-w-[70px] border border-red-400/30">
                    <span className="block font-mono text-3xl font-bold">{timeLeft.h || '00'}</span>
                    <span className="text-xs uppercase opacity-75">Hours</span>
                </div>
                <div className="bg-black/30 rounded-lg p-3 min-w-[70px] border border-red-400/30">
                    <span className="block font-mono text-3xl font-bold">{timeLeft.m || '00'}</span>
                    <span className="text-xs uppercase opacity-75">Mins</span>
                </div>
                <div className="bg-black/30 rounded-lg p-3 min-w-[70px] border border-red-400/30">
                    <span className="block font-mono text-3xl font-bold animate-pulse">{timeLeft.s || '00'}</span>
                    <span className="text-xs uppercase opacity-75">Secs</span>
                </div>
            </div>
        </div>
    );
}