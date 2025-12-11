'use client'
import { Dumbbell, Zap, Heart, Brain, Shield, Leaf } from 'lucide-react'
import Link from 'next/link'

const ProductCategories = () => {
    const categories = [
        {
            id: 'strength',
            name: 'Strength & Power',
            sanskrit: 'बल वर्धक',
            description: 'Build natural strength and muscle power with time-tested herbs',
            icon: Dumbbell,
            color: 'from-[#de2529] to-[#ff3b3f]',
            products: ['Strength Booster', 'Muscle Builder', 'Power Enhancer'],
            keyIngredients: ['Ashwagandha', 'Safed Musli', 'Kaunch Beej'],
            benefits: 'Increases natural testosterone, builds lean muscle, enhances workout capacity'
        },
        {
            id: 'energy',
            name: 'Energy & Stamina',
            sanskrit: 'शक्ति वर्धक',
            description: 'Sustained energy without crashes or jitters',
            icon: Zap,
            color: 'from-yellow-500 to-orange-500',
            products: ['Energy Enhancer', 'Stamina Booster', 'Endurance Max'],
            keyIngredients: ['Brahmi', 'Shankhpushpi', 'Giloy'],
            benefits: 'All-day natural energy, improved endurance, mental alertness'
        },
        {
            id: 'recovery',
            name: 'Recovery & Repair',
            sanskrit: 'पुनर्जीवन',
            description: 'Faster recovery and muscle repair after intense workouts',
            icon: Heart,
            color: 'from-green-500 to-teal-500',
            products: ['Recovery Master', 'Muscle Repair', 'Sleep Support'],
            keyIngredients: ['Shatavari', 'Tulsi', 'Arjuna'],
            benefits: 'Reduces inflammation, improves sleep quality, faster muscle recovery'
        },
        {
            id: 'focus',
            name: 'Mental Focus',
            sanskrit: 'मानसिक एकाग्रता',
            description: 'Enhanced cognitive function and mind-muscle connection',
            icon: Brain,
            color: 'from-blue-500 to-purple-500',
            products: ['Focus Formula', 'Brain Booster', 'Clarity Plus'],
            keyIngredients: ['Brahmi', 'Mandukaparni', 'Jatamansi'],
            benefits: 'Improved concentration, better memory, enhanced mental clarity'
        },
        {
            id: 'immunity',
            name: 'Immunity & Health',
            sanskrit: 'प्रतिरक्षा शक्ति',
            description: 'Strengthen your natural defense system',
            icon: Shield,
            color: 'from-emerald-500 to-green-600',
            products: ['Immunity Shield', 'Health Guard', 'Vital Defense'],
            keyIngredients: ['Giloy', 'Tulsi', 'Amla'],
            benefits: 'Stronger immune system, better overall health, disease resistance'
        },
        {
            id: 'detox',
            name: 'Detox & Cleanse',
            sanskrit: 'शुद्धिकरण',
            description: 'Natural detoxification and body cleansing',
            icon: Leaf,
            color: 'from-teal-500 to-cyan-500',
            products: ['Detox Formula', 'Liver Cleanse', 'Body Purifier'],
            keyIngredients: ['Triphala', 'Neem', 'Kutki'],
            benefits: 'Natural detoxification, improved digestion, clearer skin'
        }
    ]

    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-[#de2529]/20 border border-green-600/30 px-4 py-2 rounded-full mb-6">
                        <Leaf className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">Product Categories</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
                        Complete Wellness Range
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        From strength building to recovery, our comprehensive range covers every aspect 
                        of your fitness and wellness journey.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <div 
                            key={category.id}
                            className="group relative bg-[#0F1420] border border-[#1A2332] rounded-2xl p-8 hover:border-[#de2529]/50 transition-all duration-500 hover:scale-105 cursor-pointer"
                        >
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#de2529]/5 to-green-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Icon */}
                            <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <category.icon className="w-full h-full text-white" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                                <p className="text-[#de2529] font-semibold text-lg mb-3">{category.sanskrit}</p>
                                <p className="text-gray-400 leading-relaxed mb-6">{category.description}</p>

                                {/* Products */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-white mb-2">Products:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {category.products.map((product, i) => (
                                            <span key={i} className="text-xs bg-[#1A2332] text-gray-300 px-2 py-1 rounded">
                                                {product}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Ingredients */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-white mb-2">Key Ingredients:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {category.keyIngredients.map((ingredient, i) => (
                                            <span key={i} className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded">
                                                {ingredient}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Benefits */}
                                <p className="text-sm text-gray-400 mb-6">{category.benefits}</p>

                                {/* CTA */}
                                <Link 
                                    href={`/shop?category=${category.id}`}
                                    className="inline-flex items-center gap-2 text-[#de2529] hover:text-[#ff3b3f] font-semibold transition-colors"
                                >
                                    Explore Products
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute top-4 right-4 w-8 h-8 border border-[#de2529]/20 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-[#de2529] rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="inline-block bg-[#0F1420] border border-[#1A2332] rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Not Sure Which Category is Right for You?
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-2xl">
                            Take our personalized assessment to find the perfect Du Daddy products 
                            for your fitness goals and body type.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="btn-primary">Take Assessment</button>
                            <button className="btn-secondary">Consult Expert</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductCategories