'use client'
import { useState, useEffect } from 'react'
import { SearchIcon, FilterIcon, EyeIcon, EditIcon, PackageIcon, TruckIcon, CheckCircleIcon, XCircleIcon, ClockIcon, DownloadIcon, RefreshCwIcon } from 'lucide-react'
import Link from 'next/link'

export default function AdminOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [dateFilter, setDateFilter] = useState('all')

    const dummyOrders = [
        {
            id: 'DD001',
            orderNumber: 'DU-2024-001',
            customer: {
                name: 'Rahul Sharma',
                email: 'rahul.sharma@email.com',
                phone: '+91 9876543210',
                address: '123 Fitness Street, Mumbai, Maharashtra 400001'
            },
            products: [
                { name: 'Du Daddy Strength Booster', quantity: 2, price: 499, image: '/api/placeholder/50/50' },
                { name: 'Du Daddy Energy Enhancer', quantity: 1, price: 449, image: '/api/placeholder/50/50' }
            ],
            total: 1447,
            status: 'processing',
            paymentStatus: 'paid',
            paymentMethod: 'UPI',
            orderDate: '2024-12-10T10:30:00Z',
            expectedDelivery: '2024-12-15T00:00:00Z',
            trackingNumber: 'DU123456789',
            notes: 'Customer requested express delivery'
        },
        {
            id: 'DD002',
            orderNumber: 'DU-2024-002',
            customer: {
                name: 'Priya Singh',
                email: 'priya.singh@email.com',
                phone: '+91 9876543211',
                address: '456 Health Avenue, Delhi, Delhi 110001'
            },
            products: [
                { name: 'Du Daddy Recovery Master', quantity: 1, price: 549, image: '/api/placeholder/50/50' }
            ],
            total: 549,
            status: 'shipped',
            paymentStatus: 'paid',
            paymentMethod: 'Card',
            orderDate: '2024-12-09T14:20:00Z',
            expectedDelivery: '2024-12-14T00:00:00Z',
            trackingNumber: 'DU123456790',
            notes: ''
        },
        {
            id: 'DD003',
            orderNumber: 'DU-2024-003',
            customer: {
                name: 'Amit Kumar',
                email: 'amit.kumar@email.com',
                phone: '+91 9876543212',
                address: '789 Wellness Road, Bangalore, Karnataka 560001'
            },
            products: [
                { name: 'Du Daddy Strength Booster', quantity: 1, price: 499, image: '/api/placeholder/50/50' },
                { name: 'Du Daddy Energy Enhancer', quantity: 1, price: 449, image: '/api/placeholder/50/50' },
                { name: 'Du Daddy Recovery Master', quantity: 1, price: 549, image: '/api/placeholder/50/50' }
            ],
            total: 1497,
            status: 'delivered',
            paymentStatus: 'paid',
            paymentMethod: 'UPI',
            orderDate: '2024-12-05T09:15:00Z',
            expectedDelivery: '2024-12-10T00:00:00Z',
            trackingNumber: 'DU123456791',
            notes: 'Delivered successfully'
        },
        {
            id: 'DD004',
            orderNumber: 'DU-2024-004',
            customer: {
                name: 'Sneha Patel',
                email: 'sneha.patel@email.com',
                phone: '+91 9876543213',
                address: '321 Gym Street, Pune, Maharashtra 411001'
            },
            products: [
                { name: 'Du Daddy Immunity Shield', quantity: 2, price: 399, image: '/api/placeholder/50/50' }
            ],
            total: 798,
            status: 'pending',
            paymentStatus: 'pending',
            paymentMethod: 'COD',
            orderDate: '2024-12-11T16:45:00Z',
            expectedDelivery: '2024-12-16T00:00:00Z',
            trackingNumber: '',
            notes: 'Cash on delivery order'
        }
    ]

    const statusOptions = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']
    const dateOptions = ['all', 'today', 'week', 'month', 'quarter']

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setOrders(dummyOrders)
            setLoading(false)
        }, 1000)
    }, [])

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <ClockIcon className="w-4 h-4" />
            case 'processing': return <RefreshCwIcon className="w-4 h-4" />
            case 'shipped': return <TruckIcon className="w-4 h-4" />
            case 'delivered': return <CheckCircleIcon className="w-4 h-4" />
            case 'cancelled': return <XCircleIcon className="w-4 h-4" />
            default: return <PackageIcon className="w-4 h-4" />
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-orange-500/20 text-orange-400'
            case 'processing': return 'bg-blue-500/20 text-blue-400'
            case 'shipped': return 'bg-purple-500/20 text-purple-400'
            case 'delivered': return 'bg-green-500/20 text-green-400'
            case 'cancelled': return 'bg-red-500/20 text-red-400'
            default: return 'bg-gray-500/20 text-gray-400'
        }
    }

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0A0E1A]">
                <div className="text-white">Loading orders...</div>
            </div>
        )
    }

    return (
        <div className="bg-[#0A0E1A] min-h-screen text-white p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Order <span className="text-gradient">Management</span>
                    </h1>
                    <p className="text-gray-400">Track and manage all Du Daddy orders</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button className="btn-secondary flex items-center gap-2">
                        <DownloadIcon className="w-4 h-4" />
                        Export Orders
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <RefreshCwIcon className="w-4 h-4" />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Orders</p>
                            <p className="text-2xl font-bold text-white">{orders.length}</p>
                        </div>
                        <PackageIcon className="w-8 h-8 text-[#de2529]" />
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Pending</p>
                            <p className="text-2xl font-bold text-orange-400">{orders.filter(o => o.status === 'pending').length}</p>
                        </div>
                        <ClockIcon className="w-8 h-8 text-orange-400" />
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Processing</p>
                            <p className="text-2xl font-bold text-blue-400">{orders.filter(o => o.status === 'processing').length}</p>
                        </div>
                        <RefreshCwIcon className="w-8 h-8 text-blue-400" />
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Shipped</p>
                            <p className="text-2xl font-bold text-purple-400">{orders.filter(o => o.status === 'shipped').length}</p>
                        </div>
                        <TruckIcon className="w-8 h-8 text-purple-400" />
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Delivered</p>
                            <p className="text-2xl font-bold text-green-400">{orders.filter(o => o.status === 'delivered').length}</p>
                        </div>
                        <CheckCircleIcon className="w-8 h-8 text-green-400" />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders, customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                        />
                    </div>
                    
                    {/* Status Filter */}
                    <div className="relative">
                        <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-10 pr-8 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none appearance-none"
                        >
                            {statusOptions.map(status => (
                                <option key={status} value={status}>
                                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Filter */}
                    <div className="relative">
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none appearance-none"
                        >
                            {dateOptions.map(date => (
                                <option key={date} value={date}>
                                    {date === 'all' ? 'All Time' : date.charAt(0).toUpperCase() + date.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#0A0E1A] border-b border-[#1A2332]">
                            <tr>
                                <th className="text-left p-4 text-gray-400 font-medium">Order</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Customer</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Products</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Total</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Payment</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="border-b border-[#1A2332] hover:bg-[#0A0E1A] transition-colors">
                                    <td className="p-4">
                                        <div>
                                            <p className="font-semibold text-white">{order.orderNumber}</p>
                                            <p className="text-sm text-gray-400">#{order.id}</p>
                                            {order.trackingNumber && (
                                                <p className="text-xs text-[#de2529]">Track: {order.trackingNumber}</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="font-medium text-white">{order.customer.name}</p>
                                            <p className="text-sm text-gray-400">{order.customer.email}</p>
                                            <p className="text-xs text-gray-500">{order.customer.phone}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            {order.products.map((product, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded flex items-center justify-center">
                                                        <PackageIcon className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-white">{product.name}</p>
                                                        <p className="text-xs text-gray-400">Qty: {product.quantity}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-bold text-white">₹{order.total.toLocaleString()}</p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                            className="mt-1 text-xs bg-[#0A0E1A] border border-[#1A2332] rounded px-2 py-1 text-white"
                                        >
                                            {statusOptions.filter(s => s !== 'all').map(status => (
                                                <option key={status} value={status}>
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                order.paymentStatus === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                                            }`}>
                                                {order.paymentStatus}
                                            </span>
                                            <p className="text-xs text-gray-400 mt-1">{order.paymentMethod}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="text-sm text-white">
                                                {new Date(order.orderDate).toLocaleDateString()}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {new Date(order.orderDate).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#0A0E1A] rounded-lg transition-colors">
                                                <EyeIcon className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#0A0E1A] rounded-lg transition-colors">
                                                <EditIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                    <PackageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No orders found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    )
}