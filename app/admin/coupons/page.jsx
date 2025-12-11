'use client'
import { useState, useEffect } from 'react'
import { PlusIcon, EditIcon, TrashIcon, SearchIcon, FilterIcon, TicketIcon, CalendarIcon, PercentIcon, DollarSignIcon, UsersIcon, EyeIcon, CopyIcon, ToggleLeftIcon, ToggleRightIcon } from 'lucide-react'

export default function AdminCoupons() {
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [typeFilter, setTypeFilter] = useState('all')
    const [showCreateModal, setShowCreateModal] = useState(false)

    const dummyCoupons = [
        {
            id: 'COUP001',
            code: 'WELCOME20',
            name: 'Welcome Discount',
            description: 'Welcome discount for new customers',
            type: 'percentage',
            value: 20,
            minOrderValue: 500,
            maxDiscount: 200,
            usageLimit: 1000,
            usedCount: 245,
            status: 'active',
            startDate: '2024-01-01T00:00:00Z',
            endDate: '2024-12-31T23:59:59Z',
            applicableProducts: ['all'],
            customerSegment: 'new',
            createdAt: '2024-01-01T00:00:00Z',
            createdBy: 'Admin'
        },
        {
            id: 'COUP002',
            code: 'STRENGTH50',
            name: 'Strength Products Discount',
            description: '₹50 off on strength category products',
            type: 'fixed',
            value: 50,
            minOrderValue: 300,
            maxDiscount: 50,
            usageLimit: 500,
            usedCount: 123,
            status: 'active',
            startDate: '2024-11-01T00:00:00Z',
            endDate: '2024-12-31T23:59:59Z',
            applicableProducts: ['strength'],
            customerSegment: 'all',
            createdAt: '2024-10-25T00:00:00Z',
            createdBy: 'Admin'
        },
        {
            id: 'COUP003',
            code: 'FESTIVE30',
            name: 'Festive Season Sale',
            description: '30% off on all products during festive season',
            type: 'percentage',
            value: 30,
            minOrderValue: 1000,
            maxDiscount: 500,
            usageLimit: 2000,
            usedCount: 1567,
            status: 'expired',
            startDate: '2024-10-01T00:00:00Z',
            endDate: '2024-11-15T23:59:59Z',
            applicableProducts: ['all'],
            customerSegment: 'all',
            createdAt: '2024-09-25T00:00:00Z',
            createdBy: 'Admin'
        },
        {
            id: 'COUP004',
            code: 'VIP100',
            name: 'VIP Customer Exclusive',
            description: '₹100 off for VIP customers',
            type: 'fixed',
            value: 100,
            minOrderValue: 800,
            maxDiscount: 100,
            usageLimit: 100,
            usedCount: 34,
            status: 'active',
            startDate: '2024-12-01T00:00:00Z',
            endDate: '2024-12-31T23:59:59Z',
            applicableProducts: ['all'],
            customerSegment: 'vip',
            createdAt: '2024-11-28T00:00:00Z',
            createdBy: 'Admin'
        },
        {
            id: 'COUP005',
            code: 'RECOVERY25',
            name: 'Recovery Products Special',
            description: '25% off on recovery category',
            type: 'percentage',
            value: 25,
            minOrderValue: 400,
            maxDiscount: 300,
            usageLimit: 300,
            usedCount: 89,
            status: 'paused',
            startDate: '2024-11-15T00:00:00Z',
            endDate: '2024-12-25T23:59:59Z',
            applicableProducts: ['recovery'],
            customerSegment: 'all',
            createdAt: '2024-11-10T00:00:00Z',
            createdBy: 'Admin'
        }
    ]

    const statusOptions = ['all', 'active', 'paused', 'expired', 'draft']
    const typeOptions = ['all', 'percentage', 'fixed']

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setCoupons(dummyCoupons)
            setLoading(false)
        }, 1000)
    }, [])

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/20 text-green-400'
            case 'paused': return 'bg-orange-500/20 text-orange-400'
            case 'expired': return 'bg-red-500/20 text-red-400'
            case 'draft': return 'bg-gray-500/20 text-gray-400'
            default: return 'bg-gray-500/20 text-gray-400'
        }
    }

    const getUsagePercentage = (used, limit) => {
        return Math.round((used / limit) * 100)
    }

    const toggleCouponStatus = (couponId) => {
        setCoupons(coupons.map(coupon => {
            if (coupon.id === couponId) {
                const newStatus = coupon.status === 'active' ? 'paused' : 'active'
                return { ...coupon, status: newStatus }
            }
            return coupon
        }))
    }

    const copyCouponCode = (code) => {
        navigator.clipboard.writeText(code)
        // You could add a toast notification here
    }

    const filteredCoupons = coupons.filter(coupon => {
        const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || coupon.status === statusFilter
        const matchesType = typeFilter === 'all' || coupon.type === typeFilter
        return matchesSearch && matchesStatus && matchesType
    })

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0A0E1A]">
                <div className="text-white">Loading coupons...</div>
            </div>
        )
    }

    return (
        <div className="bg-[#0A0E1A] min-h-screen text-white p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Coupon <span className="text-gradient">Management</span>
                    </h1>
                    <p className="text-gray-400">Create and manage discount coupons for Du Daddy products</p>
                </div>
                <button 
                    onClick={() => setShowCreateModal(true)}
                    className="btn-primary flex items-center gap-2 mt-4 md:mt-0"
                >
                    <PlusIcon className="w-5 h-5" />
                    Create Coupon
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Coupons</p>
                            <p className="text-2xl font-bold text-white">{coupons.length}</p>
                        </div>
                        <TicketIcon className="w-8 h-8 text-[#de2529]" />
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Active Coupons</p>
                            <p className="text-2xl font-bold text-green-400">{coupons.filter(c => c.status === 'active').length}</p>
                        </div>
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Usage</p>
                            <p className="text-2xl font-bold text-white">{coupons.reduce((sum, c) => sum + c.usedCount, 0)}</p>
                        </div>
                        <UsersIcon className="w-8 h-8 text-blue-400" />
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Avg Discount</p>
                            <p className="text-2xl font-bold text-white">
                                {Math.round(coupons.reduce((sum, c) => sum + (c.type === 'percentage' ? c.value : 0), 0) / coupons.filter(c => c.type === 'percentage').length)}%
                            </p>
                        </div>
                        <PercentIcon className="w-8 h-8 text-purple-400" />
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
                            placeholder="Search coupons..."
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

                    {/* Type Filter */}
                    <div className="relative">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none appearance-none"
                        >
                            {typeOptions.map(type => (
                                <option key={type} value={type}>
                                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Coupons Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCoupons.map((coupon) => {
                    const usagePercentage = getUsagePercentage(coupon.usedCount, coupon.usageLimit)
                    const isExpired = new Date(coupon.endDate) < new Date()
                    
                    return (
                        <div key={coupon.id} className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6 hover:border-[#de2529]/50 transition-all">
                            {/* Coupon Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-lg flex items-center justify-center">
                                        <TicketIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{coupon.name}</h3>
                                        <p className="text-sm text-gray-400">#{coupon.id}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(coupon.status)}`}>
                                        {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                                    </span>
                                    <button
                                        onClick={() => toggleCouponStatus(coupon.id)}
                                        className="text-gray-400 hover:text-white"
                                        disabled={isExpired}
                                    >
                                        {coupon.status === 'active' ? 
                                            <ToggleRightIcon className="w-5 h-5 text-green-400" /> : 
                                            <ToggleLeftIcon className="w-5 h-5" />
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Coupon Code */}
                            <div className="bg-[#0A0E1A] border border-[#1A2332] rounded-lg p-3 mb-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Coupon Code</p>
                                        <p className="text-lg font-bold text-[#de2529] font-mono">{coupon.code}</p>
                                    </div>
                                    <button
                                        onClick={() => copyCouponCode(coupon.code)}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-[#0F1420] rounded-lg transition-colors"
                                    >
                                        <CopyIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Discount Details */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-[#0A0E1A] rounded-lg p-3 text-center">
                                    <div className="flex items-center justify-center mb-1">
                                        {coupon.type === 'percentage' ? 
                                            <PercentIcon className="w-4 h-4 text-[#de2529]" /> : 
                                            <DollarSignIcon className="w-4 h-4 text-[#de2529]" />
                                        }
                                    </div>
                                    <p className="text-lg font-bold text-white">
                                        {coupon.type === 'percentage' ? `${coupon.value}%` : `₹${coupon.value}`}
                                    </p>
                                    <p className="text-xs text-gray-400">Discount</p>
                                </div>
                                <div className="bg-[#0A0E1A] rounded-lg p-3 text-center">
                                    <p className="text-lg font-bold text-white">₹{coupon.minOrderValue}</p>
                                    <p className="text-xs text-gray-400">Min Order</p>
                                </div>
                            </div>

                            {/* Usage Progress */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Usage</span>
                                    <span className="text-white">{coupon.usedCount}/{coupon.usageLimit}</span>
                                </div>
                                <div className="w-full bg-[#0A0E1A] rounded-full h-2">
                                    <div 
                                        className="h-2 bg-gradient-to-r from-[#de2529] to-[#ff3b3f] rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">{usagePercentage}% used</p>
                            </div>

                            {/* Validity */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                                    <span>Valid until: {new Date(coupon.endDate).toLocaleDateString()}</span>
                                </div>
                                {isExpired && (
                                    <p className="text-xs text-red-400">This coupon has expired</p>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-400 mb-4">{coupon.description}</p>

                            {/* Additional Info */}
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Target:</span>
                                    <span className="text-white capitalize">{coupon.customerSegment} customers</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Products:</span>
                                    <span className="text-white capitalize">{coupon.applicableProducts.join(', ')}</span>
                                </div>
                                {coupon.maxDiscount && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Max Discount:</span>
                                        <span className="text-white">₹{coupon.maxDiscount}</span>
                                    </div>
                                )}
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
                                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#0A0E1A] rounded-lg transition-colors">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Empty State */}
            {filteredCoupons.length === 0 && (
                <div className="text-center py-12">
                    <TicketIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No coupons found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                    <button 
                        onClick={() => setShowCreateModal(true)}
                        className="btn-primary"
                    >
                        Create Your First Coupon
                    </button>
                </div>
            )}
        </div>
    )
}