export default function AdminDashboard() {
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold text-white">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Revenue" value="$12,450" color="green" />
                <StatCard title="Total Orders" value="156" color="blue" />
                <StatCard title="Products in Stock" value="64" color="purple" />
                <StatCard title="Pending Orders" value="12" color="orange" />
            </div>

            {/* Recent Activity Section */}
            <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
                <h2 className="mb-4 text-xl font-bold text-white">Recent Activity</h2>
                <div className="space-y-4">
                    <ActivityItem text="Order #1024 placed by John Doe" time="2 mins ago" />
                    <ActivityItem text="New User Registered: Sarah Smith" time="1 hour ago" />
                    <ActivityItem text="Zephyrus G14 Stock Update (Low Stock)" time="3 hours ago" />
                    <ActivityItem text="Order #1023 Shipped" time="5 hours ago" />
                </div>
            </div>
        </div>
    );
}

// Simple Helper Components for Layout
function StatCard({ title, value, color }) {
    const colors = {
        green: "bg-green-500/10 text-green-400 border-green-500/20",
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    };

    return (
        <div className={`p-6 rounded-xl border ${colors[color]} shadow-lg`}>
            <h3 className="text-sm font-medium tracking-wider text-gray-400 uppercase">{title}</h3>
            <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
    );
}

function ActivityItem({ text, time }) {
    return (
        <div className="flex items-center justify-between pb-3 border-b border-gray-700 last:border-0 last:pb-0">
            <p className="text-gray-300">{text}</p>
            <span className="text-xs text-gray-500">{time}</span>
        </div>
    );
}