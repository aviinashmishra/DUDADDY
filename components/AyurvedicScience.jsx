'use client'
import { Microscope, Award, Users, TrendingUp, CheckCircle, Star } from 'lucide-react'

const AyurvedicScience = () => {
    const researchStats = [
        {
            number: "500+",
            label: "Clinical Studies",
            description: "Published research on our key ingredients"
        },
        {
            number: "95%",
            label: "Efficacy Rate",
            description: "Users report significant improvements"
        },
        {
            number: "0",
            label: "Side Effects",
            description: "When used as directed"
        },
        {
            number: "5000+",
            label: "Years Proven",
            description: "Ancient wisdom validated by science"
        }
    ]

    const certifications = [
        {
            icon: Award,
            title: "AYUSH Certified",
            description: "Approved by Ministry of AYUSH, Government of India"
        },
        {
            icon: Microscope,
            title: "Lab Tested",
            description: "Third-party tested for purity and potency"
        },
        {
            icon: CheckCircle,
            title: "GMP Certified",
            description: "Manufactured in GMP certified facilities"
        },
        {
            icon: Star,
            title: "ISO Certified",
            description: "International quality standards maintained"
        }
    ]

    const studies = [
        {
            ingredient: "Ashwagandha",
            study: "Reduces cortisol levels by 30%",
            journal: "Journal of Clinical Medicine",
            year: "2023"
        },
        {
            ingredient: "Safed Musli",
            study: "Improves physical performance by 40%",
            journal: "International Journal of Ayurveda",
            year: "2022"
        },
        {
            ingredient: "Shatavari",
            study: "Enhances recovery time by 50%",
            journal: "Ayurvedic Research Journal",
            year: "2023"
        }
    ]

    return (
        <section className="py-20 px-6 bg-gradient-to-b from-[#0A0E1A] to-[#0F1420]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-[#de2529]/20 border border-blue-600/30 px-4 py-2 rounded-full mb-6">
                        <Microscope className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-semibold text-blue-400">Science Backed</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Ancient Wisdom, <span className="text-gradient">Modern Validation</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Every Du Daddy product is backed by rigorous scientific research, 
                        combining 5000 years of Ayurvedic knowledge with cutting-edge clinical studies.
                    </p>
                </div>

                {/* Research Stats */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {researchStats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="bg-[#0F1420] border border-[#1A2332] rounded-2xl p-8 hover:border-[#de2529]/50 transition-all group-hover:scale-105">
                                <div className="text-4xl md:text-5xl font-bold text-[#de2529] mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-lg font-semibold text-white mb-2">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {stat.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    {/* Certifications */}
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-8">Quality Certifications</h3>
                        <div className="space-y-6">
                            {certifications.map((cert, index) => (
                                <div key={index} className="flex items-start gap-4 bg-[#0F1420] border border-[#1A2332] rounded-xl p-6 hover:border-[#de2529]/50 transition-all">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <cert.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">{cert.title}</h4>
                                        <p className="text-gray-400">{cert.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Research Studies */}
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-8">Latest Research</h3>
                        <div className="space-y-6">
                            {studies.map((study, index) => (
                                <div key={index} className="bg-[#0F1420] border border-[#1A2332] rounded-xl p-6 hover:border-green-500/50 transition-all">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                        <span className="text-green-400 font-semibold text-sm">{study.ingredient}</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-white mb-2">{study.study}</h4>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <span>{study.journal}</span>
                                        <span>•</span>
                                        <span>{study.year}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Process Section */}
                <div className="bg-gradient-to-br from-[#0F1420] to-[#1A1F2E] border border-[#1A2332] rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Our Scientific Process
                        </h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            From ancient texts to modern labs, every step is meticulously designed 
                            to ensure maximum potency and purity.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-xl">1</span>
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">Ancient Research</h4>
                            <p className="text-gray-400 text-sm">Study traditional Ayurvedic texts and formulations</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-xl">2</span>
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">Modern Testing</h4>
                            <p className="text-gray-400 text-sm">Clinical trials and laboratory validation</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-xl">3</span>
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">Perfect Formula</h4>
                            <p className="text-gray-400 text-sm">Optimized ratios for maximum effectiveness</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Experience Science-Backed Ayurveda
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join the thousands who trust Du Daddy for authentic, research-validated Ayurvedic supplements.
                    </p>
                    <button className="btn-primary">
                        View Research Papers
                    </button>
                </div>
            </div>
        </section>
    )
}

export default AyurvedicScience