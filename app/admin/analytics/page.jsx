'use client'
import { useState, useEffect } from 'react'
import { TrendingUpIcon, TrendingDownIcon, BarChart3Icon, PieChartIcon, CalendarIcon, DownloadIcon, RefreshCwIcon, DollarSignIcon, ShoppingBagIcon, UsersIcon, PackageIcon } from 'lucide-react'

export default function AdminAnalytics() {
    const [analytics, setAnalytics] = useState(null)
    const [loading, setLoading] = useState(true)
    const [timeRange, setTimeRange] = useState('30d')
    const [activeChart, setActiveChart] = useState('revenue')

    const dummyAnalytics = {
        overview: {
            totalRevenue: 125000,
            revenueGrowth: 23.5,
            totalOrders: 342,
            ordersGrowth: 18.2,
            totalCustomers: 1250,
            customersGrowth: 15.8,
            averageOrderValue: 624,
            aovGrowth: 8.3
        },
        revenueData: [
            { month: 'Jan', revenue: 45000, orders: 120, customers: 89 },
            { month: 'Feb', revenue: 52000, orders: 135, customers: 102 },
            { month: 'Mar', revenue: 48000, orders: 128, customers: 95 },
            { month: 'Apr', revenue: 61000, orders: 158, customers: 118 },
            { month: 'May', revenue: 58000, orders: 145, customers: 112 },
            { month: 'Jun', revenue: 67000, orders: 172, customers: 135 },
            { month: 'Jul', revenue: 72000, orders: 185, customers: 148 },
            { month: 'Aug', revenue: 69000, orders: 178, customers: 142 },
            { month: 'Sep', revenue: 78000, orders: 195, customers: 156 },
            { month: 'Oct', revenue: 82000, orders: 208, customers: 168 },
            { month: 'Nov', revenue: 89000, orders: 225, customers: 182 },
            { month: 'Dec', revenue: 95000, orders: 242, customers: 195 }
        ],
        topProducts: [
            { name: 'Du Daddy Strength Booster', sales: 156, revenue: 77844, growth: 25.3 },
            { name: 'Du Daddy Energy Enhancer', sales: 98, revenue: 44002, growth: 18.7 },
            { name: 'Du Daddy Recovery Master', sales: 88, revenue: 48312, growth: 22.1 },
            { name: 'Du Daddy Immunity Shield', sales: 67, revenue: 26733, growth: 15.9 }
        ],
        customerSegments: [
            { segment: 'VIP Customers', count: 45, percentage: 3.6, revenue: 45000 },
            { segment: 'Loyal Customers', count: 187, percentage: 15.0, revenue: 62000 },
            { segment: 'Regular Customers', count: 623, percentage: 49.8, revenue: 78000 },
            { segment: 'New Customers', count: 395, percentage: 31.6, revenue: 35000 }
        ],
        salesChannels: [
            { channel: 'Website', sales: 245, percentage: 71.6, revenue: 89500 },
            { channel: 'Mobile App', sales: 67, percentage: 19.6, revenue: 24800 },
            { channel: 'Social Media', sales: 30, percentage: 8.8, revenue: 10700 }
        ],
        geographicData: [
            { state: 'Maharashtra', orders: 89, revenue: 32500 },
            { state: 'Delhi', orders: 67, revenue: 24800 },
            { state: 'Karnataka', orders: 54, revenue: 19800 },
            { state: 'Gujarat', orders: 43, revenue: 15900 },
            { state: 'Tamil Nadu', orders: 38, revenue: 14200 },
            { state: 'Others', orders: 51, revenue: 17800 }
        ]
    }

    const timeRanges = [
        { value: '7d', label: 'Last 7 Days' },
        { value: '30d', label: 'Last 30 Days' },
        { value: '90d', label: 'Last 3 Months' },
        { value: '1y', label: 'Last Year' }
    ]

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setAnalytics(dummyAnalytics)
            setLoading(false)
        }, 1000)
    }, [timeRange])

    const formatCurrency = (amount) => `₹${amount.toLocaleString()}`
    const formatPercentage = (value) => `${value > 0 ? '+' : ''}${value}%`

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0A0E1A]">
                <div className="text-white">Loading analytics...</div>
            </div>
        )
    }

    return (
        <div className="bg-[#0A0E1A] min-h-screen text-white p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Business <span className="text-gradient">Analytics</span>
                    </h1>
                    <p className="text-gray-400">Comprehensive insights into your Du Daddy business performance</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 bg-[#0F1420] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none"
                    >
                        {timeRanges.map(range => (
                            <option key={range.value} value={range.value}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                    <button className="btn-secondary flex items-center gap-2">
                        <DownloadIcon className="w-4 h-4" />
                        Export
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <RefreshCwIcon className="w-4 h-4" />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#de2529] to-[#ff3b3f] flex items-center justify-center">
                            <DollarSignIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${analytics.overview.revenueGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {analytics.overview.revenueGrowth > 0 ? <TrendingUpIcon className="w-4 h-4" /> : <TrendingDownIcon className="w-4 h-4" />}
                            {formatPercentage(analytics.overview.revenueGrowth)}
                        </div>
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium mb-1">Total Revenue</h3>
                    <p className="text-2xl font-bold text-white">{formatCurrency(analytics.overview.totalRevenue)}</p>
                </div>

                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                            <ShoppingBagIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${analytics.overview.ordersGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {analytics.overview.ordersGrowth > 0 ? <TrendingUpIcon className="w-4 h-4" /> : <TrendingDownIcon className="w-4 h-4" />}
                            {formatPercentage(analytics.overview.ordersGrowth)}
                        </div>
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium mb-1">Total Orders</h3>
                    <p className="text-2xl font-bold text-white">{analytics.overview.totalOrders.toLocaleString()}</p>
                </div>

                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                            <UsersIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${analytics.overview.customersGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {analytics.overview.customersGrowth > 0 ? <TrendingUpIcon className="w-4 h-4" /> : <TrendingDownIcon className="w-4 h-4" />}
                            {formatPercentage(analytics.overview.customersGrowth)}
                        </div>
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium mb-1">Total Customers</h3>
                    <p className="text-2xl font-bold text-white">{analytics.overview.totalCustomers.toLocaleString()}</p>
                </div>

                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                            <BarChart3Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${analytics.overview.aovGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {analytics.overview.aovGrowth > 0 ? <TrendingUpIcon className="w-4 h-4" /> : <TrendingDownIcon className="w-4 h-4" />}
                            {formatPercentage(analytics.overview.aovGrowth)}
                        </div>
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium mb-1">Avg Order Value</h3>
                    <p className="text-2xl font-bold text-white">{formatCurrency(analytics.overview.averageOrderValue)}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Revenue Trend</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveChart('revenue')}
                                className={`px-3 py-1 rounded text-sm ${activeChart === 'revenue' ? 'bg-[#de2529] text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                Revenue
                            </button>
                            <button
                                onClick={() => setActiveChart('orders')}
                                className={`px-3 py-1 rounded text-sm ${activeChart === 'orders' ? 'bg-[#de2529] text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                Orders
                            </button>
                        </div>
                    </div>
                    
                    {/* Simple Bar Chart Visualization */}
                    <div className="space-y-3">
                        {analytics.revenueData.slice(-6).map((data, index) => {
                            const value = activeChart === 'revenue' ? data.revenue : data.orders
                            const maxValue = Math.max(...analytics.revenueData.map(d => activeChart === 'revenue' ? d.revenue : d.orders))
                            const percentage = (value / maxValue) * 100
                            
                            return (
                                <div key={data.month} className="flex items-center gap-4">
                                    <div className="w-12 text-sm text-gray-400">{data.month}</div>
                                    <div className="flex-1 bg-[#0A0E1A] rounded-full h-8 relative overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-[#de2529] to-[#ff3b3f] rounded-full transition-all duration-1000 flex items-center justify-end pr-3"
                                            style={{ width: `${percentage}%` }}
                                        >
                                            <span className="text-white text-xs font-semibold">
                                                {activeChart === 'revenue' ? formatCurrency(value) : value}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Top Products</h2>
                    <div className="space-y-4">
                        {analytics.topProducts.map((product, index) => (
                            <div key={product.name} className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-medium text-sm">{product.name}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-400 text-xs">{product.sales} sales</p>
                                        <div className="flex items-center gap-1">
                                            <TrendingUpIcon className="w-3 h-3 text-green-400" />
                                            <span className="text-green-400 text-xs">{formatPercentage(product.growth)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-semibold text-sm">{formatCurrency(product.revenue)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Analytics */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Customer Segments */}
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Customer Segments</h2>
                    <div className="space-y-4">
                        {analytics.customerSegments.map((segment, index) => {
                            const colors = ['from-purple-500 to-purple-600', 'from-blue-500 to-blue-600', 'from-green-500 to-green-600', 'from-orange-500 to-orange-600']
                            return (
                                <div key={segment.segment} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${colors[index]}`}></div>
                                        <div>
                                            <p className="text-white font-medium">{segment.segment}</p>
                                            <p className="text-gray-400 text-sm">{segment.count} customers ({segment.percentage}%)</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-semibold">{formatCurrency(segment.revenue)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Geographic Distribution */}
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Geographic Distribution</h2>
                    <div className="space-y-4">
                        {analytics.geographicData.map((location, index) => {
                            const maxOrders = Math.max(...analytics.geographicData.map(l => l.orders))
                            const percentage = (location.orders / maxOrders) * 100
                            
                            return (
                                <div key={location.state} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-white font-medium">{location.state}</p>
                                        <div className="text-right">
                                            <p className="text-white font-semibold">{location.orders} orders</p>
                                            <p className="text-gray-400 text-sm">{formatCurrency(location.revenue)}</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-[#0A0E1A] rounded-full h-2">
                                        <div 
                                            className="h-2 bg-gradient-to-r from-[#de2529] to-[#ff3b3f] rounded-full transition-all duration-1000"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}