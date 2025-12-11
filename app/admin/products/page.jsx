'use client'
import { useState, useEffect } from 'react'
import { PlusIcon, EditIcon, TrashIcon, SearchIcon, FilterIcon, PackageIcon, StarIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'

export default function AdminProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterCategory, setFilterCategory] = useState('all')

    const dummyProducts = [
        {
            id: 1,
            name: 'Du Daddy Strength Booster',
            sanskrit: 'दु डैडी बल वर्धक',
            category: 'Strength & Power',
            price: 499,
            originalPrice: 699,
            stock: 150,
            sold: 156,
            rating: 4.9,
            reviews: 2847,
            status: 'active',
            image: '/api/placeholder/100/100',
            ingredients: ['Ashwagandha', 'Safed Musli', 'Kaunch Beej', 'Shilajit'],
            createdAt: '2024-01-15'
        },
        {
            id: 2,
            name: 'Du Daddy Energy Enhancer',
            sanskrit: 'दु डैडी शक्ति वर्धक',
            category: 'Energy & Stamina',
            price: 449,
            originalPrice: 599,
            stock: 89,
            sold: 98,
            rating: 4.8,
            reviews: 1923,
            status: 'active',
            image: '/api/placeholder/100/100',
            ingredients: ['Brahmi', 'Shankhpushpi', 'Giloy', 'Ginseng'],
            createdAt: '2024-02-01'
        },
        {
            id: 3,
            name: 'Du Daddy Recovery Master',
            sanskrit: 'दु डैडी पुनर्जीवन',
            category: 'Recovery & Repair',
            price: 549,
            originalPrice: 749,
            stock: 45,
            sold: 88,
            rating: 4.9,
            reviews: 1456,
            status: 'active',
            image: '/api/placeholder/100/100',
            ingredients: ['Shatavari', 'Tulsi', 'Arjuna', 'Jatamansi'],
            createdAt: '2024-01-20'
        },
        {
            id: 4,
            name: 'Du Daddy Immunity Shield',
            sanskrit: 'दु डैडी रक्षा कवच',
            category: 'Immunity & Health',
            price: 399,
            originalPrice: 549,
            stock: 12,
            sold: 67,
            rating: 4.7,
            reviews: 892,
            status: 'low_stock',
            image: '/api/placeholder/100/100',
            ingredients: ['Giloy', 'Tulsi', 'Amla', 'Neem'],
            createdAt: '2024-02-10'
        }
    ]

    const categories = ['all', 'Strength & Power', 'Energy & Stamina', 'Recovery & Repair', 'Immunity & Health']

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setProducts(dummyProducts)
            setLoading(false)
        }, 1000)
    }, [])

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.sanskrit.includes(searchTerm) ||
                            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory
        return matchesSearch && matchesCategory
    })

    const getStockStatus = (stock) => {
        if (stock === 0) return { text: 'Out of Stock', color: 'bg-red-500/20 text-red-400' }
        if (stock < 20) return { text: 'Low Stock', color: 'bg-orange-500/20 text-orange-400' }
        if (stock < 50) return { text: 'Medium Stock', color: 'bg-yellow-500/20 text-yellow-400' }
        return { text: 'In Stock', color: 'bg-green-500/20 text-green-400' }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0A0E1A]">
                <div className="text-white">Loading products...</div>
            </div>
        )
    }

    return (
        <div className="bg-[#0A0E1A] min-h-screen text-white p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Product <span className="text-gradient">Management</span>
                    </h1>
                    <p className="text-gray-400">Manage your Du Daddy Ayurvedic supplement inventory</p>
                </div>
                <Link href="/admin/products/add" className="btn-primary flex items-center gap-2 mt-4 md:mt-0">
                    <PlusIcon className="w-5 h-5" />
                    Add New Product
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Products</p>
                            <p className="text-2xl font-bold text-white">{products.length}</p>
                        </div>
                        <PackageIcon className="w-8 h-8 text-[#de2529]" />
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Active Products</p>
                            <p className="text-2xl font-bold text-white">{products.filter(p => p.status === 'active').length}</p>
                        </div>
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Low Stock</p>
                            <p className="text-2xl font-bold text-orange-400">{products.filter(p => p.stock < 20).length}</p>
                        </div>
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Sales</p>
                            <p className="text-2xl font-bold text-white">{products.reduce((sum, p) => sum + p.sold, 0)}</p>
                        </div>
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
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
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white placeholder-gray-400 focus:border-[#de2529] focus:outline-none"
                        />
                    </div>
                    
                    {/* Category Filter */}
                    <div className="relative">
                        <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="pl-10 pr-8 py-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg text-white focus:border-[#de2529] focus:outline-none appearance-none"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#0F1420] border border-[#1A2332] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#0A0E1A] border-b border-[#1A2332]">
                            <tr>
                                <th className="text-left p-4 text-gray-400 font-medium">Product</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Category</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Price</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Stock</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Sales</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Rating</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => {
                                const stockStatus = getStockStatus(product.stock)
                                return (
                                    <tr key={product.id} className="border-b border-[#1A2332] hover:bg-[#0A0E1A] transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-lg flex items-center justify-center">
                                                    <PackageIcon className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{product.name}</p>
                                                    <p className="text-sm text-gray-400">{product.sanskrit}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm text-gray-300">{product.category}</span>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <p className="font-semibold text-white">₹{product.price}</p>
                                                <p className="text-sm text-gray-400 line-through">₹{product.originalPrice}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <p className="font-semibold text-white">{product.stock}</p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${stockStatus.color}`}>
                                                    {stockStatus.text}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-semibold text-white">{product.sold}</p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1">
                                                <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-white font-medium">{product.rating}</span>
                                                <span className="text-gray-400 text-sm">({product.reviews})</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                product.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                                            }`}>
                                                {product.status === 'active' ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-gray-400 hover:text-white hover:bg-[#0A0E1A] rounded-lg transition-colors">
                                                    <EyeIcon className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-white hover:bg-[#0A0E1A] rounded-lg transition-colors">
                                                    <EditIcon className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#0A0E1A] rounded-lg transition-colors">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <PackageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                    <Link href="/admin/products/add" className="btn-primary">
                        Add Your First Product
                    </Link>
                </div>
            )}
        </div>
    )
}