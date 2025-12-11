'use client'
import { Leaf, Zap, Heart, Brain, Dumbbell, Shield } from 'lucide-react'

const AyurvedicIngredients = () => {
    const ingredients = [
        {
            name: "Ashwagandha",
            sanskrit: "अश्वगंधा",
            benefit: "Stress Relief & Strength",
            description: "The king of herbs, known for reducing cortisol and boosting natural testosterone.",
            icon: Dumbbell,
            color: "from-green-500 to-green-600"
        },
        {
            name: "Safed Musli",
            sanskrit: "सफेद मूसली",
            benefit: "Energy & Vitality",
            description: "Natural aphrodisiac that enhances stamina and physical performance.",
            icon: Zap,
            color: "from-yellow-500 to-orange-500"
        },
        {
            name: "Shatavari",
            sanskrit: "शतावरी",
            benefit: "Recovery & Balance",
            description: "Adaptogenic herb that supports hormonal balance and faster recovery.",
            icon: Heart,
            color: "from-pink-500 to-red-500"
        },
        {
            name: "Brahmi",
            sanskrit: "ब्राह्मी",
            benefit: "Mental Focus",
            description: "Enhances cognitive function and mental clarity during workouts.",
            icon: Brain,
            color: "from-blue-500 to-purple-500"
        },
        {
            name: "Giloy",
            sanskrit: "गिलोय",
            benefit: "Immunity Boost",
            description: "Powerful immunomodulator that strengthens natural defense systems.",
            icon: Shield,
            color: "from-green-400 to-teal-500"
        },
        {
            name: "Tulsi",
            sanskrit: "तुलसी",
            benefit: "Detox & Purify",
            description: "Sacred herb that purifies the body and enhances oxygen utilization.",
            icon: Leaf,
            color: "from-emerald-500 to-green-600"
        }
    ]

    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-[#de2529]/20 border border-green-600/30 px-4 py-2 rounded-full mb-6">
                        <Leaf className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">Sacred Ingredients</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
                        Nature's Pharmacy
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Each ingredient is carefully selected from ancient Ayurvedic texts, 
                        backed by modern science, and sourced from the purest origins.
                    </p>
                </div>

                {/* Ingredients Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ingredients.map((ingredient, index) => (
                        <div 
                            key={index} 
                            className="group relative bg-[#0F1420] border border-[#1A2332] rounded-2xl p-8 hover:border-[#de2529]/50 transition-all duration-500 hover:scale-105"
                        >
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#de2529]/5 to-green-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Icon */}
                            <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${ingredient.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <ingredient.icon className="w-full h-full text-white" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-2">{ingredient.name}</h3>
                                <p className="text-[#de2529] font-semibold text-lg mb-2">{ingredient.sanskrit}</p>
                                <p className="text-green-400 font-medium mb-4">{ingredient.benefit}</p>
                                <p className="text-gray-400 leading-relaxed">{ingredient.description}</p>
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
                            Experience the Power of Pure Ayurveda
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-2xl">
                            Every Du Daddy product combines these time-tested ingredients in scientifically proven ratios 
                            for maximum effectiveness and zero side effects.
                        </p>
                        <button className="btn-primary">
                            View All Ingredients
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AyurvedicIngredients