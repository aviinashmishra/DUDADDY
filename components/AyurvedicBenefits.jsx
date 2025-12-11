'use client'
import { Target, Zap, Shield, Heart, Brain, Leaf, TrendingUp, Clock } from 'lucide-react'

const AyurvedicBenefits = () => {
    const benefits = [
        {
            icon: Target,
            title: "Enhanced Performance",
            description: "Natural strength and endurance boost without synthetic stimulants",
            stats: "40% increase in workout capacity"
        },
        {
            icon: Zap,
            title: "Sustained Energy",
            description: "All-day vitality from adaptogenic herbs, no crashes or jitters",
            stats: "8+ hours of natural energy"
        },
        {
            icon: Shield,
            title: "Immune Support",
            description: "Strengthen your body's natural defense system with powerful herbs",
            stats: "3x stronger immunity"
        },
        {
            icon: Heart,
            title: "Cardiovascular Health",
            description: "Support heart health and improve circulation naturally",
            stats: "Better heart rate variability"
        },
        {
            icon: Brain,
            title: "Mental Clarity",
            description: "Enhanced focus and cognitive function for better mind-muscle connection",
            stats: "Improved concentration by 60%"
        },
        {
            icon: Clock,
            title: "Faster Recovery",
            description: "Reduce inflammation and speed up muscle recovery post-workout",
            stats: "50% faster recovery time"
        }
    ]

    const principles = [
        {
            title: "Holistic Approach",
            description: "Treats the whole person, not just symptoms",
            icon: "🕉️"
        },
        {
            title: "Natural Balance",
            description: "Restores body's natural equilibrium",
            icon: "⚖️"
        },
        {
            title: "Time-Tested",
            description: "5000+ years of proven effectiveness",
            icon: "📿"
        },
        {
            title: "Personalized",
            description: "Adapts to individual body constitution",
            icon: "🧘‍♂️"
        }
    ]

    return (
        <section className="py-20 px-6 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23de2529' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#de2529]/20 to-green-600/20 border border-[#de2529]/30 px-4 py-2 rounded-full mb-6">
                        <TrendingUp className="w-4 h-4 text-[#de2529]" />
                        <span className="text-sm font-semibold text-[#de2529]">Proven Benefits</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Why Choose <span className="text-gradient">Ayurveda?</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Experience the transformative power of ancient wisdom combined with modern science. 
                        Our Ayurvedic approach delivers results that last.
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
                            <div className="w-16 h-16 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <benefit.icon className="w-8 h-8 text-white" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                            <p className="text-gray-400 mb-4 leading-relaxed">{benefit.description}</p>
                            <div className="text-[#de2529] font-semibold text-sm">{benefit.stats}</div>
                        </div>
                    ))}
                </div>

                {/* Ayurvedic Principles */}
                <div className="bg-gradient-to-br from-[#0F1420] to-[#1A1F2E] border border-[#1A2332] rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            The Ayurvedic Advantage
                        </h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Unlike synthetic supplements, Ayurveda works with your body's natural intelligence 
                            to create lasting health and vitality.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {principles.map((principle, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                    {principle.icon}
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">{principle.title}</h4>
                                <p className="text-gray-400 text-sm">{principle.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Quote */}
                    <div className="text-center mt-12 pt-8 border-t border-[#1A2332]">
                        <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-4">
                            "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need."
                        </blockquote>
                        <cite className="text-[#de2529] font-semibold">- Ancient Ayurvedic Wisdom</cite>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Ready to Transform Your Health Naturally?
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join thousands who have discovered the power of authentic Ayurvedic supplements.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-primary">Start Your Journey</button>
                        <button className="btn-secondary">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AyurvedicBenefits