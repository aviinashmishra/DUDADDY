'use client'
import { Leaf, Award, Shield, Zap, ArrowDown } from 'lucide-react'
import Link from 'next/link'

const ProductShowcaseHero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E1A] via-[#0F1420] to-[#1A1F2E]"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-[#de2529] rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    >
                        <Leaf className="w-4 h-4 text-green-400 opacity-30" />
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#de2529]/20 to-green-600/20 border border-[#de2529]/30 px-6 py-3 rounded-full mb-8">
                        <Award className="w-5 h-5 text-[#de2529]" />
                        <span className="text-sm font-bold text-white">India's #1 Ayurvedic Performance Brand</span>
                        <Shield className="w-5 h-5 text-green-400" />
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none">
                        <span className="block text-white">Du Daddy</span>
                        <span className="block text-gradient">Products</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-6 leading-relaxed">
                        Discover our complete range of 
                        <span className="text-[#de2529] font-bold"> 100% Ayurvedic supplements</span> 
                        designed for modern athletes and fitness enthusiasts.
                    </p>

                    {/* Key Features */}
                    <div className="flex flex-wrap justify-center gap-6 mb-12 text-lg">
                        <div className="flex items-center gap-2 bg-[#0F1420] border border-[#1A2332] px-4 py-2 rounded-full">
                            <Leaf className="w-5 h-5 text-green-400" />
                            <span className="text-white">100% Natural</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#0F1420] border border-[#1A2332] px-4 py-2 rounded-full">
                            <Shield className="w-5 h-5 text-blue-400" />
                            <span className="text-white">Zero Side Effects</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#0F1420] border border-[#1A2332] px-4 py-2 rounded-full">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <span className="text-white">Clinically Proven</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <Link href="#featured-products" className="btn-primary text-xl px-12 py-4 scroll-smooth">
                            Explore Products
                        </Link>
                        <Link href="/shop" className="btn-secondary text-xl px-12 py-4">
                            Shop Now
                        </Link>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="animate-bounce">
                        <ArrowDown className="w-8 h-8 text-gray-400 mx-auto" />
                        <p className="text-gray-400 text-sm mt-2">Scroll to explore</p>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0E1A] to-transparent"></div>
        </section>
    )
}

export default ProductShowcaseHero