'use client'
import Loading from "@/components/Loading"
import { CircleDollarSignIcon, ShoppingBasketIcon, UsersIcon, TagsIcon, TrendingUpIcon, PackageIcon, StarIcon, Leaf } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function AdminDashboard() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹'

    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState({
        products: 24,
        revenue: 125000,
        orders: 342,
        customers: 1250,
        pendingOrders: 15,
        lowStock: 3,
        avgRating: 4.8,
        monthlyGrowth: 23.5,
        recentOrders: [
            { id: 'DD001', customer: 'Rahul Sharma', product: 'Du Daddy Strength Booster', amount: 499, status: 'completed' },
            { id: 'DD002', customer: 'Priya Singh', product: 'Du Daddy Energy Enhancer', amount: 449, status: 'pending' },
            { id: 'DD003', customer: 'Amit Kumar', product: 'Du Daddy Recovery Master', amount: 549, status: 'processing' },
            { id: 'DD004', customer: 'Sneha Patel', product: 'Du Daddy Strength Booster', amount: 499, status: 'completed' },
            { id: 'DD005', customer: 'Vikash Gupta', product: 'Du Daddy Energy Enhancer', amount: 449, status: 'shipped' },
        ],
        topProducts: [
            { name: 'Du Daddy Strength Booster', sales: 156, revenue: 77844 },
            { name: 'Du Daddy Energy Enhancer', sales: 98, revenue: 44002 },
            { name: 'Du Daddy Recovery Master', sales: 88, revenue: 48312 },
        ]
    })

    const dashboardCardsData = [
        { 
            title: 'Total Products', 
            value: dashboardData.products, 
            icon: PackageIcon, 
            color: 'from-blue-500 to-blue-600',
            change: '+2 this month'
        },
        { 
            title: 'Total Revenue', 
            value: currency + dashboardData.revenue.toLocaleString(), 
            icon: CircleDollarSignIcon, 
            color: 'from-[#de2529] to-[#ff3b3f]',
            change: `+${dashboardData.monthlyGrowth}% this month`
        },
        { 
            title: 'Total Orders', 
            value: dashboardData.orders, 
            icon: TagsIcon, 
            color: 'from-green-500 to-green-600',
            change: '+45 this week'
        },
        { 
            title: 'Total Customers', 
            value: dashboardData.customers, 
            icon: UsersIcon, 
            color: 'from-purple-500 to-purple-600',
            change: '+89 this month'
        },
    ]

    const quickStatsData = [
        { title: 'Pending Orders', value: dashboardData.pendingOrders, color: 'text-orange-500' },
        { title: 'Low Stock Items', value: dashboardData.lowStock, color: 'text-red-500' },
        { title: 'Avg Rating', value: dashboardData.avgRating + '★', color: 'text-yellow-500' },
        { title: 'Monthly Growth', value: '+' + dashboardData.monthlyGrowth + '%', color: 'text-green-500' },
    ]

    const fetchDashboardData = async () => {
        // Simulate API call
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-gray-300 bg-[#0A0E1A] min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Du Daddy <span className="text-gradient">Admin Dashboard</span>
                </h1>
                <p className="text-gray-400">Welcome back! Here's what's happening with your Ayurvedic supplement business.</p>
            </div>

            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dashboardCardsData.map((card, index) => (
                    <div key={index} className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6 hover:border-[#de2529]/50 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                                <card.icon className="w-6 h-6 text-white" />
                            </div>
                            <TrendingUpIcon className="w-5 h-5 text-green-400" />
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1">{card.title}</h3>
                        <p className="text-2xl font-bold text-white mb-2">{card.value}</p>
                        <p className="text-xs text-green-400">{card.change}</p>
                    </div>
                ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {quickStatsData.map((stat, index) => (
                    <div key={index} className="bg-[#0F1420] border border-[#1A2332] rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                        <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-[#de2529] hover:text-[#ff3b3f] text-sm font-medium">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {dashboardData.recentOrders.map((order, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-[#0A0E1A] rounded-lg border border-[#1A2332]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center">
                                        <Leaf className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-sm">{order.customer}</p>
                                        <p className="text-gray-400 text-xs">{order.product}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-semibold">{currency}{order.amount}</p>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                        order.status === 'pending' ? 'bg-orange-500/20 text-orange-400' :
                                        order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                                        'bg-purple-500/20 text-purple-400'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Top Products</h2>
                        <Link href="/admin/products" className="text-[#de2529] hover:text-[#ff3b3f] text-sm font-medium">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {dashboardData.topProducts.map((product, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-[#0A0E1A] rounded-lg border border-[#1A2332]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-sm">{product.name}</p>
                                        <p className="text-gray-400 text-xs">{product.sales} sales</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-semibold">{currency}{product.revenue.toLocaleString()}</p>
                                    <div className="flex items-center gap-1">
                                        <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                                        <span className="text-xs text-gray-400">4.8</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/admin/products" className="bg-[#0F1420] border border-[#1A2332] rounded-lg p-4 text-center hover:border-[#de2529]/50 transition-all group">
                    <PackageIcon className="w-8 h-8 text-[#de2529] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-white font-medium">Manage Products</p>
                </Link>
                <Link href="/admin/orders" className="bg-[#0F1420] border border-[#1A2332] rounded-lg p-4 text-center hover:border-[#de2529]/50 transition-all group">
                    <TagsIcon className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-white font-medium">View Orders</p>
                </Link>
                <Link href="/admin/customers" className="bg-[#0F1420] border border-[#1A2332] rounded-lg p-4 text-center hover:border-[#de2529]/50 transition-all group">
                    <UsersIcon className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-white font-medium">Customer List</p>
                </Link>
                <Link href="/admin/analytics" className="bg-[#0F1420] border border-[#1A2332] rounded-lg p-4 text-center hover:border-[#de2529]/50 transition-all group">
                    <TrendingUpIcon className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-white font-medium">Analytics</p>
                </Link>
            </div>
        </div>
    )
}