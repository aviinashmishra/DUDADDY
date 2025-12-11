'use client'
import { TrendingUp, Clock, Shield, Heart, Zap, Award } from 'lucide-react'

const ProductBenefits = () => {
    const benefits = [
        {
            icon: TrendingUp,
            title: "Proven Results",
            stat: "95% Success Rate",
            description: "Clinical studies show 95% of users experience significant improvements within 3 weeks",
            color: "from-[#de2529] to-[#ff3b3f]"
        },
        {
            icon: Clock,
            title: "Fast Acting",
            stat: "2-3 Weeks",
            description: "Notice visible improvements in strength, energy, and performance in just 2-3 weeks",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: Shield,
            title: "Zero Side Effects",
            stat: "100% Natural",
            description: "Pure Ayurvedic formulations with no synthetic chemicals or harmful additives",
            color: "from-green-500 to-teal-500"
        },
        {
            icon: Heart,
            title: "Holistic Health",
            stat: "Complete Wellness",
            description: "Supports overall health while targeting specific fitness and performance goals",
            color: "from-pink-500 to-red-500"
        },
        {
            icon: Zap,
            title: "Sustained Energy",
            stat: "8+ Hours",
            description: "Long-lasting natural energy without crashes, jitters, or dependency",
            color: "from-blue-500 to-purple-500"
        },
        {
            icon: Award,
            title: "Quality Assured",
            stat: "AYUSH Certified",
            description: "Government certified, lab-tested, and manufactured in GMP facilities",
            color: "from-emerald-500 to-green-600"
        }
    ]

    const testimonialStats = [
        { number: "40%", label: "Increase in Strength", description: "Average improvement in workout capacity" },
        { number: "50%", label: "Faster Recovery", description: "Reduced muscle soreness and inflammation" },
        { number: "8hrs", label: "Natural Energy", description: "Sustained energy without crashes" },
        { number: "95%", label: "Customer Satisfaction", description: "Users report positive results" }
    ]

    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-[#de2529]/20 border border-green-600/30 px-4 py-2 rounded-full mb-6">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">Proven Benefits</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Why Choose <span className="text-gradient">Du Daddy?</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Experience the difference that authentic Ayurvedic supplements can make 
                        in your fitness journey and overall well-being.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {benefits.map((benefit, index) => (
                        <div 
                            key={index}
                            className="group bg-[#0F1420] border border-[#1A2332] rounded-2xl p-8 hover:border-[#de2529]/50 transition-all duration-300 hover:scale-105"
                        >
                            {/* Icon */}
                            <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <benefit.icon className="w-8 h-8 text-white" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                            <div className="text-2xl font-bold text-[#de2529] mb-4">{benefit.stat}</div>
                            <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-br from-[#0F1420] to-[#1A1F2E] border border-[#1A2332] rounded-3xl p-8 md:p-12 mb-16">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Real Results from Real People
                        </h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Our customers consistently report significant improvements in their fitness 
                            and wellness goals with Du Daddy products.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {testimonialStats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold text-[#de2529] mb-2 group-hover:scale-110 transition-transform">
                                    {stat.number}
                                </div>
                                <div className="text-lg font-semibold text-white mb-2">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {stat.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comparison Section */}
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-3xl p-8 md:p-12">
                    <h3 className="text-3xl font-bold text-white mb-8 text-center">
                        Du Daddy vs. Synthetic Supplements
                    </h3>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#1A2332]">
                                    <th className="text-left py-4 text-white font-semibold">Feature</th>
                                    <th className="text-center py-4 text-[#de2529] font-semibold">Du Daddy (Ayurvedic)</th>
                                    <th className="text-center py-4 text-gray-400 font-semibold">Synthetic Supplements</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b border-[#1A2332]/50">
                                    <td className="py-4 text-gray-300">Ingredients</td>
                                    <td className="py-4 text-center text-green-400">100% Natural Herbs</td>
                                    <td className="py-4 text-center text-gray-400">Synthetic Chemicals</td>
                                </tr>
                                <tr className="border-b border-[#1A2332]/50">
                                    <td className="py-4 text-gray-300">Side Effects</td>
                                    <td className="py-4 text-center text-green-400">Zero Side Effects</td>
                                    <td className="py-4 text-center text-red-400">Potential Side Effects</td>
                                </tr>
                                <tr className="border-b border-[#1A2332]/50">
                                    <td className="py-4 text-gray-300">Long-term Use</td>
                                    <td className="py-4 text-center text-green-400">Safe for Long-term</td>
                                    <td className="py-4 text-center text-red-400">May Cause Dependency</td>
                                </tr>
                                <tr className="border-b border-[#1A2332]/50">
                                    <td className="py-4 text-gray-300">Holistic Benefits</td>
                                    <td className="py-4 text-center text-green-400">Complete Wellness</td>
                                    <td className="py-4 text-center text-gray-400">Targeted Only</td>
                                </tr>
                                <tr>
                                    <td className="py-4 text-gray-300">Certification</td>
                                    <td className="py-4 text-center text-green-400">AYUSH Certified</td>
                                    <td className="py-4 text-center text-gray-400">Varies</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Experience the Natural Advantage
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Make the switch to authentic Ayurvedic supplements and feel the difference 
                        that nature's wisdom can make in your fitness journey.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-primary">Start Your Journey</button>
                        <button className="btn-secondary">Compare Products</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductBenefits