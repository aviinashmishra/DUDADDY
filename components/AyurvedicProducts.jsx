'use client'
import { Star, Leaf, Zap, Heart, Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const AyurvedicProducts = () => {
    const products = [
        {
            id: 1,
            name: "Strength Booster",
            sanskrit: "बल वर्धक",
            category: "Performance",
            price: 499,
            originalPrice: 699,
            rating: 4.8,
            reviews: 1250,
            image: "/api/placeholder/300/300",
            keyIngredients: ["Ashwagandha", "Safed Musli", "Kaunch Beej"],
            benefits: ["Increases Strength", "Boosts Testosterone", "Enhances Stamina"],
            badge: "Best Seller",
            color: "from-[#de2529] to-[#ff3b3f]"
        },
        {
            id: 2,
            name: "Energy Enhancer",
            sanskrit: "शक्ति वर्धक",
            category: "Energy",
            price: 449,
            originalPrice: 599,
            rating: 4.7,
            reviews: 980,
            image: "/api/placeholder/300/300",
            keyIngredients: ["Brahmi", "Shankhpushpi", "Giloy"],
            benefits: ["All-Day Energy", "Mental Clarity", "No Crashes"],
            badge: "New Launch",
            color: "from-yellow-500 to-orange-500"
        },
        {
            id: 3,
            name: "Recovery Master",
            sanskrit: "पुनर्जीवन",
            category: "Recovery",
            price: 549,
            originalPrice: 749,
            rating: 4.9,
            reviews: 756,
            image: "/api/placeholder/300/300",
            keyIngredients: ["Shatavari", "Tulsi", "Arjuna"],
            benefits: ["Faster Recovery", "Reduces Inflammation", "Better Sleep"],
            badge: "Doctor Recommended",
            color: "from-green-500 to-teal-500"
        }
    ]

    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#de2529]/20 to-green-600/20 border border-[#de2529]/30 px-4 py-2 rounded-full mb-6">
                        <Leaf className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">Premium Products</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Our <span className="text-gradient">Signature</span> Range
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Carefully crafted formulations that combine the wisdom of Ayurveda 
                        with the precision of modern science.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {products.map((product, index) => (
                        <div key={product.id} className="group relative bg-[#0F1420] border border-[#1A2332] rounded-2xl overflow-hidden hover:border-[#de2529]/50 transition-all duration-500 hover:scale-105">
                            {/* Badge */}
                            <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${product.color}`}>
                                {product.badge}
                            </div>

                            {/* Product Image */}
                            <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <div className="w-32 h-32 bg-gradient-to-br from-[#de2529]/20 to-green-600/20 rounded-full flex items-center justify-center">
                                    <Leaf className="w-16 h-16 text-[#de2529]" />
                                </div>
                                {/* Floating elements */}
                                <div className="absolute top-8 right-8 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-[#de2529] rounded-full animate-pulse delay-1000"></div>
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                {/* Category */}
                                <div className="text-[#de2529] text-sm font-semibold mb-2">{product.category}</div>
                                
                                {/* Name */}
                                <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{product.sanskrit}</p>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-[#de2529] fill-current' : 'text-gray-600'}`} 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-400">({product.reviews})</span>
                                </div>

                                {/* Key Ingredients */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-white mb-2">Key Ingredients:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {product.keyIngredients.map((ingredient, i) => (
                                            <span key={i} className="text-xs bg-[#1A2332] text-gray-300 px-2 py-1 rounded">
                                                {ingredient}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-white mb-2">Benefits:</h4>
                                    <ul className="space-y-1">
                                        {product.benefits.map((benefit, i) => (
                                            <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                                                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-2xl font-bold text-[#de2529]">₹{product.price}</span>
                                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                                    <span className="text-sm bg-green-600 text-white px-2 py-1 rounded">
                                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                    </span>
                                </div>

                                {/* CTA Button */}
                                <button className="w-full btn-primary group-hover:scale-105 transition-transform">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">100% Natural</h3>
                        <p className="text-gray-400 text-sm">No synthetic chemicals or artificial additives</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Leaf className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Ayurvedic Certified</h3>
                        <p className="text-gray-400 text-sm">Approved by AYUSH ministry standards</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Fast Results</h3>
                        <p className="text-gray-400 text-sm">Notice improvements within 2-3 weeks</p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-br from-[#0F1420] to-[#1A1F2E] border border-[#1A2332] rounded-3xl p-8 md:p-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Transform Your Health?
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have experienced the power of authentic Ayurvedic supplements.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/shop" className="btn-primary flex items-center gap-2">
                            View All Products
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button className="btn-secondary">
                            Get Consultation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AyurvedicProducts