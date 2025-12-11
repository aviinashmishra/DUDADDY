'use client'
import { Target, Heart, Award, Users, Leaf, Shield, TrendingUp, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function About() {
    const stats = [
        { number: "100%", label: "Herbal", icon: Leaf },
        { number: "0", label: "Chemicals", icon: Shield },
        { number: "2028", label: "Vision Year", icon: TrendingUp },
        { number: "₹499", label: "Starting Price", icon: Sparkles }
    ]

    const values = [
        {
            icon: Leaf,
            title: "100% Herbal",
            description: "Zero synthetic chemicals. Pure, potent herbs like Ashwagandha, Safed Musli, and Shatavari for natural strength and stamina."
        },
        {
            icon: Heart,
            title: "Holistic Health",
            description: "We address both physical performance and mental recovery—a complete approach to wellness that no other brand offers."
        },
        {
            icon: Shield,
            title: "Total Transparency",
            description: "Transparent sourcing with QR code verification system. Know exactly what you're putting in your body."
        },
        {
            icon: Award,
            title: "Clinically Backed",
            description: "Ancient Ayurvedic wisdom meets modern sports science. Every formula is researched and clinically validated."
        }
    ]

    const mission = [
        {
            icon: Target,
            title: "Our Core Mission",
            description: "Train Clean. Recover Deep. Grow Natural.",
            detail: "Modern performance should never come at the cost of long-term health. We're India's first 100% herbal performance supplement brand."
        },
        {
            icon: Users,
            title: "Our Vision",
            description: "India's #1 Herbal Performance Brand by 2028",
            detail: "Leading the revolution in natural fitness supplements through gym-first distribution and uncompromising quality."
        }
    ]

    return (
        <div className="min-h-screen bg-[#0A0E1A]">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#de2529]/20 via-transparent to-[#00D9FF]/20"></div>
                <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
                            About Du Daddy
                        </h1>
                        <p className="text-2xl md:text-3xl text-white font-semibold mb-4">
                            The Revolution of Clean Performance
                        </p>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Train Clean. Recover Deep. Grow Natural.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="card-dark text-center group hover:scale-105 transition-transform">
                            <stat.icon className="w-10 h-10 mx-auto mb-4 text-[#de2529]" />
                            <p className="text-4xl font-bold text-gradient mb-2">{stat.number}</p>
                            <p className="text-gray-400 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-8">
                    {mission.map((item, index) => (
                        <div key={index} className="relative bg-gradient-to-br from-[#0F1420] to-[#1A1F2E] border border-[#1A2332] rounded-2xl p-8 hover:border-[#de2529]/50 transition-all group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#de2529]/10 to-transparent rounded-bl-full"></div>
                            <item.icon className="w-12 h-12 text-[#de2529] mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-xl text-[#ff3b3f] font-semibold mb-4">{item.description}</p>
                            <p className="text-gray-400 leading-relaxed">{item.detail}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Story Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-2xl p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">Our Story</h2>
                    <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                        <p>
                            Du Daddy was founded on a singular principle: <span className="text-[#de2529] font-semibold">modern performance should never come at the cost of long-term health</span>. We are India's first 100% herbal performance supplement brand, dedicated to challenging the status quo of synthetic, chemical-based fitness products.
                        </p>
                        <p>
                            We saw a market failing athletes, offering supplements filled with chemicals and contaminants that cause long-term harm, from liver stress to hormonal imbalances. The modern fitness generation (18-35) wants safe, natural, and transparent products—and <span className="text-white font-semibold">Du Daddy is the answer</span>.
                        </p>
                        <p className="text-2xl font-bold text-gradient pt-4">
                            DU DADDY. Har Gym Ka Daddy.
                        </p>
                    </div>
                </div>
            </div>

            {/* The Du Daddy Difference */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                        The Du Daddy Difference
                    </h2>
                    <p className="text-xl text-gray-400">Ancient Wisdom, Modern Science</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {values.map((value, index) => (
                        <div key={index} className="card-dark group hover:scale-105 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="bg-gradient-to-br from-[#de2529] to-[#ff3b3f] p-3 rounded-xl">
                                    <value.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-[#0F1420] to-[#1A1F2E] border border-[#1A2332] rounded-2xl p-8 md:p-12">
                    <p className="text-gray-300 leading-relaxed text-lg mb-6">
                        We don't believe in quick fixes. We believe in <span className="text-[#de2529] font-semibold">sustainable, natural power</span>. Our flagship products are the result of meticulous research, combining the deep knowledge of Ayurveda with cutting-edge sports science.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        Every Du Daddy product is a unique, clinically-backed formulation designed to enhance strength, stamina, and mental recovery—something no other brand offers holistically.
                    </p>
                </div>
            </div>

            {/* Vision Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="bg-gradient-to-r from-[#de2529] to-[#ff3b3f] rounded-2xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Our Vision: India's #1 Herbal Performance Brand
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                        We are the first movers in a rapidly shifting consumer landscape. Our goal is clear: to become India's #1 Gym-Based Herbal Performance Brand by 2028.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-2">Unique Distribution</h3>
                            <p className="text-white/80">Specialized gym-first distribution strategy and strong gym partnership model.</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-2">Accessible Quality</h3>
                            <p className="text-white/80">High efficacy at a mid-premium price point starting at ₹499.</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-2">Strong Foundation</h3>
                            <p className="text-white/80">Backed by Ayurvedic Doctors and Researchers from esteemed institutes.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Join the Revolution
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Experience the power of natural, herbal performance supplements
                    </p>
                    <button className="btn-primary text-lg">
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    )
}
