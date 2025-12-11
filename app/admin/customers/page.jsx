'use client'
import { useState, useEffect } from 'react'
import { SearchIcon, FilterIcon, EyeIcon, EditIcon, UserIcon, MailIcon, PhoneIcon, MapPinIcon, CalendarIcon, ShoppingBagIcon, StarIcon, DownloadIcon, UserPlusIcon } from 'lucide-react'

export default function AdminCustomers() {
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [sortBy, setSortBy] = useState('recent')

    const dummyCustomers = [
        {
            id: 'CUST001',
            name: 'Rahul Sharma',
            email: 'rahul.sharma@email.com',
            phone: '+91 9876543210',
            address: '123 Fitness Street, Mumbai, Maharashtra 400001',
            joinDate: '2024-01-15T00:00:00Z',
            lastOrder: '2024-12-10T10:30:00Z',
            totalOrders: 8,
            totalSpent: 4992,
            averageOrderValue: 624,
            status: 'active',
            loyaltyPoints: 250,
            favoriteProducts: ['Du Daddy Strength Booster', 'Du Daddy Energy Enhancer'],
            orderHistory: [
                { date: '2024-12-10', amount: 1447, products: 3 },
                { date: '2024-11-25', amount: 499, products: 1 },
                { date: '2024-11-10', amount: 998, products: 2 }
            ],
            preferences: {
                category: 'Strength & Power',
                communication: 'email',
                newsletter: true
            }
        },
        {
            id: 'CUST002',
            name: 'Priya Singh',
            email: 'priya.singh@email.com',
            phone: '+91 9876543211',
            address: '456 Health Avenue, Delhi, Delhi 110001',
            joinDate: '2024-02-20T00:00:00Z',
            lastOrder: '2024-12-09T14:20:00Z',
            totalOrders: 5,
            totalSpent: 2745,
            averageOrderValue: 549,
            status: 'active',
            loyaltyPoints: 137,
            favoriteProducts: ['Du Daddy Recovery Master', 'Du Daddy Immunity Shield'],
            orderHistory: [
                { date: '2024-12-09', amount: 549, products: 1 },
                { date: '2024-11-20', amount: 798, products: 2 },
                { date: '2024-10-15', amount: 449, products: 1 }
            ],
            preferences: {
                category: 'Recovery & Repair',
                communication: 'sms',
                newsletter: true
            }
        },
        {
            id: 'CUST003',
            name: 'Amit Kumar',
            email: 'amit.kumar@email.com',
            phone: '+91 9876543212',
            address: '789 Wellness Road, Bangalore, Karnataka 560001',
            joinDate: '2024-01-10T00:00:00Z',
            lastOrder: '2024-12-05T09:15:00Z',
            totalOrders: 12,
            totalSpent: 7485,
            averageOrderValue: 624,
            status: 'vip',
            loyaltyPoints: 374,
            favoriteProducts: ['Du Daddy Strength Booster', 'Du Daddy Energy Enhancer', 'Du Daddy Recovery Master'],
            orderHistory: [
                { date: '2024-12-05', amount: 1497, products: 3 },
                { date: '2024-11-28', amount: 998, products: 2 },
                { date: '2024-11-15', amount: 1347, products: 3 }
            ],
            preferences: {
                category: 'All Categories',
                communication: 'email',
                newsletter: true
            }
        },
        {
            id: 'CUST004',
            name: 'Sneha Patel',
            email: 'sneha.patel@email.com',
            phone: '+91 9876543213',
            address: '321 Gym Street, Pune, Maharashtra 411001',
            joinDate: '2024-03-05T00:00:00Z',
            lastOrder: '2024-12-11T16:45:00Z',
            totalOrders: 3,
            totalSpent: 1596,
            averageOrderValue: 532,
            status: 'new',
            loyaltyPoints: 80,
            favoriteProducts: ['Du Daddy Immunity Shield'],
            orderHistory: [
                { date: '2024-12-11', amount: 798, products: 2 },
                { date: '2024-11-30', amount: 399, products: 1 },
                { date: '2024-11-01', amount: 399, products: 1 }
            ],
            preferences: {
                category: 'Immunity & Health',
                communication: 'email',
                newsletter: false
            }
        },
        {
            id: 'CUST005',
            name: 'Vikash Gupta',
            email: 'vikash.gupta@email.com',
            phone: '+91 9876543214',
            address: '654 Power Lane, Chennai, Tamil Nadu 600001',
            joinDate: '2024-06-15T00:00:00Z',
            lastOrder: '2024-10-20T12:00:00Z',
            totalOrders: 2,
            totalSpent: 898,
            averageOrderValue: 449,
            status: 'inactive',
            loyaltyPoints: 45,
            favoriteProducts: ['Du Daddy Energy Enhancer'],
            orderHistory: [
                { date: '2024-10-20', amount: 449, products: 1 },
                { date: '2024-07-10', amount: 449, products: 1 }
            ],
            preferences: {
                category: 'Energy & Stamina',
                communication: 'email',
                newsletter: true
            }
        }
    ]

    const statusOptions = ['all', 'active', 'vip', 'new', 'inactive']
    const sortOptions = ['recent', 'name', 'spent', 'orders']

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setCustomers(dummyCustomers)
            setLoading(false)
        }, 1000)
    }, [])

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/20 text-green-400'
            case 'vip': return 'bg-purple-500/20 text-purple-400'
            case 'new': return 'bg-blue-500/20 text-blue-400'
            case 'inactive': return 'bg-gray-500/20 text-gray-400'
            default: return 'bg-gray-500/20 text-gray-400'
        }
    }

    const getCustomerTier = (totalSpent) => {
        if (totalSpent >= 5000) return { tier: 'VIP', color: 'text-purple-400' }
        if (totalSpent >= 2000) return { tier: 'Gold', color: 'text-yellow-400' }
        if (totalSpent >= 1000) return { tier: 'Silver', color: 'text-gray-400' }
        return { tier: 'Bronze', color: 'text-orange-400' }
    }

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.phone.includes(searchTerm)
        const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        switch (sortBy) {
            case 'name': return a.name.localeCompare(b.name)
            case 'spent': return b.totalSpent - a.totalSpent
            case 'orders': return b.totalOrders - a.totalOrders
            case 'recent': return new Date(b.lastOrder) - new Date(a.lastOrder)
            default: return 0
        }
    })

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0A0E1A]">
                <div className="text-white">Loading customers...</div>
            </div>
        )
    }

    return (
        <div className="bg-[#0A0E1A] min-h-screen text-white p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Customer <span className="text-gradient">Management</span>
                    </h1>
                    <p className="text-gray-400">Manage and analyze your Du Daddy customer base</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button className="btn-secondary flex items-center gap-2">
                        <DownloadIcon className="w-4 h-4" />
                        Export Data
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <UserPlusIcon className="w-4 h-4" />
                        Add Customer
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Customers</p>
                            <p className="text-2xl font-bold text-white">{customers.length}</p>
                        </div>
                        <UserIcon className="w-8 h-8 text-[#de2529]" />
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Active</p>
                            <p className="text-2xl font-bold text-green-400">{customers.filter(c => c.status === 'active').length}</p>
                        </div>
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">VIP</p>
                            <p className="text-2xl font-bold text-purple-400">{customers.filter(c => c.status === 'vip').length}</p>
                        </div>
                        <StarIcon className="w-8 h-8 text-purple-400" />
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">New This Month</p>
                            <p className="text-2xl font-bold text-blue-400">{customers.filter(c => c.status === 'new').length}</p>
                        </div>
                        <UserPlusIcon className="w-8 h-8 text-blue-400" />
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Avg Order Value</p>
                            <p className="text-2xl font-bold text-white">₹{Math.round(customers.reduce((sum, c) => sum + c.averageOrderValue, 0) / customers.length)}</p>
                        </div>
                        <ShoppingBagIcon className="w-8 h-8 text-yellow-400" />
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
                            placeholder="Search customers..."
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

                    {/* Sort */}
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none appearance-none"
                        >
                            {sortOptions.map(sort => (
                                <option key={sort} value={sort}>
                                    Sort by {sort.charAt(0).toUpperCase() + sort.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedCustomers.map((customer) => {
                    const tier = getCustomerTier(customer.totalSpent)
                    return (
                        <div key={customer.id} className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6 hover:border-[#de2529]/50 transition-all">
                            {/* Customer Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center">
                                        <UserIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{customer.name}</h3>
                                        <p className="text-sm text-gray-400">#{customer.id}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(customer.status)}`}>
                                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                                    </span>
                                    <span className={`text-xs font-semibold ${tier.color}`}>
                                        {tier.tier}
                                    </span>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <MailIcon className="w-4 h-4 text-gray-400" />
                                    {customer.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <PhoneIcon className="w-4 h-4 text-gray-400" />
                                    {customer.phone}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <MapPinIcon className="w-4 h-4 text-gray-400" />
                                    {customer.address.split(',')[0]}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-[#0A0E1A] rounded-lg p-3 text-center">
                                    <p className="text-lg font-bold text-white">{customer.totalOrders}</p>
                                    <p className="text-xs text-gray-400">Orders</p>
                                </div>
                                <div className="bg-[#0A0E1A] rounded-lg p-3 text-center">
                                    <p className="text-lg font-bold text-[#de2529]">₹{customer.totalSpent.toLocaleString()}</p>
                                    <p className="text-xs text-gray-400">Total Spent</p>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Avg Order:</span>
                                    <span className="text-white">₹{customer.averageOrderValue}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Loyalty Points:</span>
                                    <span className="text-yellow-400">{customer.loyaltyPoints}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Last Order:</span>
                                    <span className="text-white">{new Date(customer.lastOrder).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Favorite Products */}
                            <div className="mb-4">
                                <p className="text-xs text-gray-400 mb-2">Favorite Products:</p>
                                <div className="flex flex-wrap gap-1">
                                    {customer.favoriteProducts.slice(0, 2).map((product, idx) => (
                                        <span key={idx} className="text-xs bg-[#de2529]/20 text-[#de2529] px-2 py-1 rounded">
                                            {product.split(' ').slice(-2).join(' ')}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1">
                                    <EyeIcon className="w-4 h-4" />
                                    View
                                </button>
                                <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-1">
                                    <EditIcon className="w-4 h-4" />
                                    Edit
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Empty State */}
            {sortedCustomers.length === 0 && (
                <div className="text-center py-12">
                    <UserIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No customers found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                    <button className="btn-primary">
                        Add Your First Customer
                    </button>
                </div>
            )}
        </div>
    )
}