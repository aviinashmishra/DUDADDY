'use client'
import { Check, X, Star, Award } from 'lucide-react'

const ProductComparison = () => {
    const products = [
        {
            name: "Strength Booster",
            price: 499,
            category: "Strength & Power",
            rating: 4.9,
            features: {
                ashwagandha: true,
                safedMusli: true,
                shilajit: true,
                brahmi: false,
                shatavari: false,
                giloy: false,
                strengthBoost: true,
                energySupport: true,
                recoveryAid: false,
                mentalFocus: false,
                immunityBoost: false,
                stressRelief: true
            },
            bestFor: "Muscle building, strength training, powerlifting",
            results: "40% strength increase in 3 weeks"
        },
        {
            name: "Energy Enhancer",
            price: 449,
            category: "Energy & Stamina",
            rating: 4.8,
            features: {
                ashwagandha: false,
                safedMusli: false,
                shilajit: false,
                brahmi: true,
                shatavari: false,
                giloy: true,
                strengthBoost: false,
                energySupport: true,
                recoveryAid: false,
                mentalFocus: true,
                immunityBoost: true,
                stressRelief: false
            },
            bestFor: "Endurance training, cardio, mental focus",
            results: "8+ hours sustained energy"
        },
        {
            name: "Recovery Master",
            price: 549,
            category: "Recovery & Repair",
            rating: 4.9,
            features: {
                ashwagandha: false,
                safedMusli: false,
                shilajit: false,
                brahmi: false,
                shatavari: true,
                giloy: true,
                strengthBoost: false,
                energySupport: false,
                recoveryAid: true,
                mentalFocus: false,
                immunityBoost: true,
                stressRelief: true
            },
            bestFor: "Post-workout recovery, sleep improvement",
            results: "50% faster recovery time"
        }
    ]

    const featureLabels = {
        ashwagandha: "Ashwagandha",
        safedMusli: "Safed Musli",
        shilajit: "Shilajit",
        brahmi: "Brahmi",
        shatavari: "Shatavari",
        giloy: "Giloy",
        strengthBoost: "Strength Boost",
        energySupport: "Energy Support",
        recoveryAid: "Recovery Aid",
        mentalFocus: "Mental Focus",
        immunityBoost: "Immunity Boost",
        stressRelief: "Stress Relief"
    }

    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-[#de2529]/20 border border-blue-600/30 px-4 py-2 rounded-full mb-6">
                        <Award className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-semibold text-blue-400">Product Comparison</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Find Your <span className="text-gradient">Perfect Match</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Compare our top products side by side to find the perfect supplement 
                        for your specific fitness goals and needs.
                    </p>
                </div>

                {/* Comparison Table */}
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            {/* Header */}
                            <thead>
                                <tr className="border-b border-[#1A2332]">
                                    <th className="text-left p-6 text-white font-semibold">Features</th>
                                    {products.map((product, index) => (
                                        <th key={index} className="text-center p-6 min-w-[200px]">
                                            <div className="text-center">
                                                <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                                                <p className="text-[#de2529] text-sm font-semibold mb-2">{product.category}</p>
                                                <div className="flex items-center justify-center gap-1 mb-2">
                                                    <Star className="w-4 h-4 text-[#de2529] fill-current" />
                                                    <span className="text-white text-sm">{product.rating}</span>
                                                </div>
                                                <div className="text-2xl font-bold text-[#de2529]">₹{product.price}</div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody>
                                {/* Key Ingredients Section */}
                                <tr className="bg-[#1A2332]/30">
                                    <td colSpan={4} className="p-4 text-center text-white font-semibold">
                                        Key Ingredients
                                    </td>
                                </tr>
                                {Object.entries(featureLabels).slice(0, 6).map(([key, label]) => (
                                    <tr key={key} className="border-b border-[#1A2332]/50">
                                        <td className="p-4 text-gray-300">{label}</td>
                                        {products.map((product, index) => (
                                            <td key={index} className="p-4 text-center">
                                                {product.features[key] ? (
                                                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-gray-600 mx-auto" />
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}

                                {/* Benefits Section */}
                                <tr className="bg-[#1A2332]/30">
                                    <td colSpan={4} className="p-4 text-center text-white font-semibold">
                                        Primary Benefits
                                    </td>
                                </tr>
                                {Object.entries(featureLabels).slice(6).map(([key, label]) => (
                                    <tr key={key} className="border-b border-[#1A2332]/50">
                                        <td className="p-4 text-gray-300">{label}</td>
                                        {products.map((product, index) => (
                                            <td key={index} className="p-4 text-center">
                                                {product.features[key] ? (
                                                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-gray-600 mx-auto" />
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}

                                {/* Best For */}
                                <tr className="border-b border-[#1A2332]/50">
                                    <td className="p-4 text-gray-300 font-semibold">Best For</td>
                                    {products.map((product, index) => (
                                        <td key={index} className="p-4 text-center text-gray-400 text-sm">
                                            {product.bestFor}
                                        </td>
                                    ))}
                                </tr>

                                {/* Expected Results */}
                                <tr className="border-b border-[#1A2332]/50">
                                    <td className="p-4 text-gray-300 font-semibold">Expected Results</td>
                                    {products.map((product, index) => (
                                        <td key={index} className="p-4 text-center text-green-400 text-sm font-semibold">
                                            {product.results}
                                        </td>
                                    ))}
                                </tr>

                                {/* CTA Row */}
                                <tr>
                                    <td className="p-4"></td>
                                    {products.map((product, index) => (
                                        <td key={index} className="p-4 text-center">
                                            <button className="btn-primary w-full">
                                                Choose {product.name.split(' ')[1]}
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recommendation Section */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <div className="bg-[#0F1420] border border-[#1A2332] rounded-2xl p-6 text-center hover:border-[#de2529]/50 transition-all">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">💪</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">For Strength Training</h3>
                        <p className="text-gray-400 text-sm mb-4">Building muscle mass and increasing power</p>
                        <p className="text-[#de2529] font-semibold">Recommended: Strength Booster</p>
                    </div>

                    <div className="bg-[#0F1420] border border-[#1A2332] rounded-2xl p-6 text-center hover:border-yellow-500/50 transition-all">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">⚡</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">For Endurance</h3>
                        <p className="text-gray-400 text-sm mb-4">Long cardio sessions and stamina</p>
                        <p className="text-yellow-500 font-semibold">Recommended: Energy Enhancer</p>
                    </div>

                    <div className="bg-[#0F1420] border border-[#1A2332] rounded-2xl p-6 text-center hover:border-green-500/50 transition-all">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">🔄</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">For Recovery</h3>
                        <p className="text-gray-400 text-sm mb-4">Faster healing and better sleep</p>
                        <p className="text-green-500 font-semibold">Recommended: Recovery Master</p>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Still Not Sure Which Product is Right for You?
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Take our personalized quiz or consult with our Ayurvedic experts to find 
                        the perfect supplement combination for your goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-primary">Take Product Quiz</button>
                        <button className="btn-secondary">Consult Expert</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductComparison