'use client'
import { Star, Leaf, Award, TrendingUp, ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const FeaturedProducts = () => {
    const [activeProduct, setActiveProduct] = useState(0)

    const products = [
        {
            id: 1,
            name: "Du Daddy Strength Booster",
            sanskrit: "दु डैडी बल वर्धक",
            category: "Strength & Power",
            price: 499,
            originalPrice: 699,
            rating: 4.9,
            reviews: 2847,
            image: "/api/placeholder/400/400",
            badge: "Best Seller",
            badgeColor: "from-[#de2529] to-[#ff3b3f]",
            keyIngredients: [
                { name: "Ashwagandha", amount: "600mg", benefit: "Stress reduction & strength" },
                { name: "Safed Musli", amount: "400mg", benefit: "Natural testosterone boost" },
                { name: "Kaunch Beej", amount: "300mg", benefit: "Muscle building support" },
                { name: "Shilajit", amount: "200mg", benefit: "Energy & vitality" }
            ],
            benefits: [
                "40% increase in workout capacity",
                "Natural testosterone support",
                "Enhanced muscle strength",
                "Improved recovery time",
                "Zero side effects"
            ],
            description: "Our flagship product combines the most potent Ayurvedic herbs for natural strength enhancement. Clinically proven to increase workout capacity by 40% within 3 weeks.",
            certifications: ["AYUSH Certified", "GMP Approved", "Lab Tested"],
            dosage: "2 capsules daily with warm milk",
            results: "Visible results in 2-3 weeks"
        },
        {
            id: 2,
            name: "Du Daddy Energy Enhancer",
            sanskrit: "दु डैडी शक्ति वर्धक",
            category: "Energy & Stamina",
            price: 449,
            originalPrice: 599,
            rating: 4.8,
            reviews: 1923,
            image: "/api/placeholder/400/400",
            badge: "New Launch",
            badgeColor: "from-yellow-500 to-orange-500",
            keyIngredients: [
                { name: "Brahmi", amount: "500mg", benefit: "Mental clarity & focus" },
                { name: "Shankhpushpi", amount: "400mg", benefit: "Cognitive enhancement" },
                { name: "Giloy", amount: "350mg", benefit: "Immunity & energy" },
                { name: "Ginseng", amount: "250mg", benefit: "Sustained energy" }
            ],
            benefits: [
                "8+ hours of natural energy",
                "No crashes or jitters",
                "Enhanced mental focus",
                "Improved endurance",
                "Better workout performance"
            ],
            description: "Experience all-day natural energy without the crash. Our unique blend of adaptogenic herbs provides sustained vitality for peak performance.",
            certifications: ["AYUSH Certified", "Organic", "Non-GMO"],
            dosage: "1 capsule in morning, 1 pre-workout",
            results: "Feel energized within 30 minutes"
        },
        {
            id: 3,
            name: "Du Daddy Recovery Master",
            sanskrit: "दु डैडी पुनर्जीवन",
            category: "Recovery & Repair",
            price: 549,
            originalPrice: 749,
            rating: 4.9,
            reviews: 1456,
            image: "/api/placeholder/400/400",
            badge: "Doctor Recommended",
            badgeColor: "from-green-500 to-teal-500",
            keyIngredients: [
                { name: "Shatavari", amount: "600mg", benefit: "Hormonal balance & recovery" },
                { name: "Tulsi", amount: "400mg", benefit: "Anti-inflammatory" },
                { name: "Arjuna", amount: "350mg", benefit: "Cardiovascular support" },
                { name: "Jatamansi", amount: "200mg", benefit: "Better sleep quality" }
            ],
            benefits: [
                "50% faster muscle recovery",
                "Reduced inflammation",
                "Better sleep quality",
                "Hormonal balance",
                "Enhanced repair process"
            ],
            description: "Accelerate your recovery with this powerful blend of rejuvenating herbs. Reduces muscle soreness and inflammation while promoting better sleep.",
            certifications: ["AYUSH Certified", "Clinical Tested", "Pure Extract"],
            dosage: "2 capsules post-workout or before bed",
            results: "Better recovery within 1 week"
        }
    ]

    const currentProduct = products[activeProduct]

    return (
        <section id="featured-products" className="py-20 px-6 bg-gradient-to-b from-[#0A0E1A] to-[#0F1420]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#de2529]/20 to-green-600/20 border border-[#de2529]/30 px-4 py-2 rounded-full mb-6">
                        <Award className="w-4 h-4 text-[#de2529]" />
                        <span className="text-sm font-semibold text-[#de2529]">Featured Products</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Our <span className="text-gradient">Top Performers</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Discover our most popular and effective Ayurvedic supplements, 
                        trusted by thousands of fitness enthusiasts across India.
                    </p>
                </div>

                {/* Product Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {products.map((product, index) => (
                        <button
                            key={product.id}
                            onClick={() => setActiveProduct(index)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${
                                activeProduct === index
                                    ? 'bg-gradient-to-r from-[#de2529] to-[#ff3b3f] text-white'
                                    : 'bg-[#0F1420] border border-[#1A2332] text-gray-400 hover:text-white hover:border-[#de2529]/50'
                            }`}
                        >
                            {product.name.split(' ').slice(-2).join(' ')}
                        </button>
                    ))}
                </div>

                {/* Featured Product Display */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Product Image & Info */}
                    <div className="relative">
                        {/* Badge */}
                        <div className={`absolute top-6 left-6 z-10 px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${currentProduct.badgeColor}`}>
                            {currentProduct.badge}
                        </div>

                        {/* Product Image */}
                        <div className="relative bg-gradient-to-br from-[#0F1420] to-[#1A1F2E] rounded-3xl p-12 border border-[#1A2332] hover:border-[#de2529]/50 transition-all">
                            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-[#de2529]/20 to-green-600/20 rounded-full flex items-center justify-center">
                                <Leaf className="w-32 h-32 text-[#de2529]" />
                            </div>
                            
                            {/* Floating Elements */}
                            <div className="absolute top-12 right-12 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-12 left-12 w-3 h-3 bg-[#de2529] rounded-full animate-pulse delay-1000"></div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex justify-center gap-6 mt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-[#de2529]">{currentProduct.rating}</div>
                                <div className="text-sm text-gray-400">Rating</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">{currentProduct.reviews.toLocaleString()}</div>
                                <div className="text-sm text-gray-400">Reviews</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-[#de2529]">₹{currentProduct.price}</div>
                                <div className="text-sm text-gray-400">Price</div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div>
                        {/* Product Name */}
                        <h3 className="text-4xl font-bold text-white mb-2">{currentProduct.name}</h3>
                        <p className="text-xl text-[#de2529] font-semibold mb-4">{currentProduct.sanskrit}</p>
                        <p className="text-green-400 font-medium mb-6">{currentProduct.category}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        className={`w-5 h-5 ${i < Math.floor(currentProduct.rating) ? 'text-[#de2529] fill-current' : 'text-gray-600'}`} 
                                    />
                                ))}
                            </div>
                            <span className="text-white font-semibold">{currentProduct.rating}</span>
                            <span className="text-gray-400">({currentProduct.reviews.toLocaleString()} reviews)</span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 leading-relaxed mb-6">{currentProduct.description}</p>

                        {/* Key Benefits */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Key Benefits:</h4>
                            <ul className="space-y-2">
                                {currentProduct.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-300">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-[#de2529]">₹{currentProduct.price}</span>
                            <span className="text-xl text-gray-500 line-through">₹{currentProduct.originalPrice}</span>
                            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {Math.round((1 - currentProduct.price / currentProduct.originalPrice) * 100)}% OFF
                            </span>
                        </div>

                        {/* Usage Info */}
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-[#0F1420] border border-[#1A2332] rounded-lg p-4">
                                <h5 className="text-white font-semibold mb-1">Dosage:</h5>
                                <p className="text-gray-400 text-sm">{currentProduct.dosage}</p>
                            </div>
                            <div className="bg-[#0F1420] border border-[#1A2332] rounded-lg p-4">
                                <h5 className="text-white font-semibold mb-1">Results:</h5>
                                <p className="text-gray-400 text-sm">{currentProduct.results}</p>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="btn-primary flex items-center justify-center gap-2 flex-1">
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button className="btn-secondary flex items-center justify-center gap-2">
                                <Heart className="w-5 h-5" />
                                Add to Wishlist
                            </button>
                        </div>

                        {/* Certifications */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {currentProduct.certifications.map((cert, i) => (
                                <span key={i} className="text-xs bg-green-600/20 text-green-400 px-3 py-1 rounded-full">
                                    {cert}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Ingredients Breakdown */}
                <div className="mt-16 bg-[#0F1420] border border-[#1A2332] rounded-3xl p-8">
                    <h4 className="text-2xl font-bold text-white mb-8 text-center">Key Ingredients Breakdown</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {currentProduct.keyIngredients.map((ingredient, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Leaf className="w-8 h-8 text-white" />
                                </div>
                                <h5 className="text-lg font-semibold text-white mb-1">{ingredient.name}</h5>
                                <p className="text-[#de2529] font-semibold text-sm mb-2">{ingredient.amount}</p>
                                <p className="text-gray-400 text-sm">{ingredient.benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Ready to Experience the Du Daddy Difference?
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have transformed their fitness journey with our authentic Ayurvedic supplements.
                    </p>
                    <Link href="/shop" className="btn-primary text-lg">
                        Shop All Products
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts