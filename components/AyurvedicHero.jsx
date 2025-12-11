'use client'
import { Leaf, Shield, Award, Sparkles } from 'lucide-react'
import Link from 'next/link'

const AyurvedicHero = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23de2529' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-2 h-2 bg-[#de2529] rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-1 h-1 bg-green-500 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse delay-2000"></div>
                <div className="absolute bottom-20 right-10 w-2 h-2 bg-[#de2529] rounded-full animate-pulse delay-500"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#de2529]/20 to-green-600/20 border border-[#de2529]/30 px-6 py-2 rounded-full mb-8">
                        <Leaf className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-white">100% Ayurvedic • Zero Chemicals</span>
                        <Sparkles className="w-4 h-4 text-[#de2529]" />
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
                        <span className="block text-white">Ancient</span>
                        <span className="block text-gradient">Wisdom</span>
                        <span className="block text-white">Modern</span>
                        <span className="block text-[#de2529]">Power</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                        India's first 100% herbal performance supplement brand. 
                        <span className="text-[#de2529] font-semibold"> Train Clean. Recover Deep. Grow Natural.</span>
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mb-12">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#de2529]">100%</div>
                            <div className="text-sm text-gray-400">Herbal</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400">5000+</div>
                            <div className="text-sm text-gray-400">Years of Ayurveda</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#de2529]">0</div>
                            <div className="text-sm text-gray-400">Side Effects</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400">₹499</div>
                            <div className="text-sm text-gray-400">Starting Price</div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Link href="/shop" className="btn-primary text-lg px-12 py-4">
                            Explore Products
                        </Link>
                        <Link href="/about" className="btn-secondary text-lg px-12 py-4">
                            Our Story
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-400" />
                            <span className="text-sm">Clinically Tested</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-[#de2529]" />
                            <span className="text-sm">Ayurvedic Certified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-green-400" />
                            <span className="text-sm">Natural Ingredients</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0E1A] to-transparent"></div>
        </div>
    )
}

export default AyurvedicHero