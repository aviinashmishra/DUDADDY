'use client'
import { Leaf, Award, Microscope, Globe } from 'lucide-react'
import { useState } from 'react'

const IngredientSpotlight = () => {
    const [activeIngredient, setActiveIngredient] = useState(0)

    const ingredients = [
        {
            name: "Ashwagandha",
            sanskrit: "अश्वगंधा",
            scientificName: "Withania somnifera",
            origin: "Indian Subcontinent",
            benefits: [
                "Reduces cortisol levels by 30%",
                "Increases muscle mass and strength",
                "Improves testosterone levels",
                "Enhances stress resistance",
                "Boosts energy and vitality"
            ],
            research: "500+ clinical studies",
            dosage: "300-600mg daily",
            description: "Known as the 'King of Herbs' in Ayurveda, Ashwagandha is a powerful adaptogen that has been used for over 3000 years to enhance strength, reduce stress, and improve overall vitality.",
            color: "from-green-500 to-teal-500"
        },
        {
            name: "Safed Musli",
            sanskrit: "सफेद मूसली",
            scientificName: "Chlorophytum borivilianum",
            origin: "Western India",
            benefits: [
                "Natural aphrodisiac properties",
                "Enhances physical performance",
                "Improves stamina and endurance",
                "Supports reproductive health",
                "Boosts immune system"
            ],
            research: "200+ clinical studies",
            dosage: "250-500mg daily",
            description: "Often called 'White Gold' or 'Divya Aushadhi', Safed Musli is a rare herb known for its exceptional ability to enhance physical performance and vitality naturally.",
            color: "from-yellow-500 to-orange-500"
        },
        {
            name: "Shatavari",
            sanskrit: "शतावरी",
            scientificName: "Asparagus racemosus",
            origin: "Himalayan regions",
            benefits: [
                "Hormonal balance support",
                "Enhanced recovery and repair",
                "Improved digestive health",
                "Stress reduction properties",
                "Anti-inflammatory effects"
            ],
            research: "300+ clinical studies",
            dosage: "400-600mg daily",
            description: "Meaning 'she who possesses a hundred husbands', Shatavari is revered for its rejuvenating properties and ability to support recovery and hormonal balance.",
            color: "from-pink-500 to-red-500"
        }
    ]

    const currentIngredient = ingredients[activeIngredient]

    return (
        <section className="py-20 px-6 bg-gradient-to-b from-[#0F1420] to-[#0A0E1A]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-[#de2529]/20 border border-green-600/30 px-4 py-2 rounded-full mb-6">
                        <Microscope className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">Ingredient Science</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Spotlight on <span className="text-gradient">Sacred Herbs</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Dive deep into the science behind our most powerful Ayurvedic ingredients 
                        and discover why they've been trusted for thousands of years.
                    </p>
                </div>

                {/* Ingredient Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {ingredients.map((ingredient, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIngredient(index)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${
                                activeIngredient === index
                                    ? 'bg-gradient-to-r from-[#de2529] to-[#ff3b3f] text-white'
                                    : 'bg-[#0F1420] border border-[#1A2332] text-gray-400 hover:text-white hover:border-[#de2529]/50'
                            }`}
                        >
                            {ingredient.name}
                        </button>
                    ))}
                </div>

                {/* Ingredient Details */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Visual Side */}
                    <div className="relative">
                        <div className="relative bg-gradient-to-br from-[#0F1420] to-[#1A1F2E] rounded-3xl p-12 border border-[#1A2332] hover:border-[#de2529]/50 transition-all">
                            <div className={`w-80 h-80 mx-auto bg-gradient-to-br ${currentIngredient.color} rounded-full flex items-center justify-center opacity-20`}>
                                <Leaf className="w-40 h-40 text-white" />
                            </div>
                            
                            {/* Floating Info Cards */}
                            <div className="absolute top-8 right-8 bg-[#0F1420] border border-[#1A2332] rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-green-400" />
                                    <span className="text-xs text-white">{currentIngredient.origin}</span>
                                </div>
                            </div>
                            
                            <div className="absolute bottom-8 left-8 bg-[#0F1420] border border-[#1A2332] rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-[#de2529]" />
                                    <span className="text-xs text-white">{currentIngredient.research}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div>
                        <h3 className="text-4xl font-bold text-white mb-2">{currentIngredient.name}</h3>
                        <p className="text-2xl text-[#de2529] font-semibold mb-2">{currentIngredient.sanskrit}</p>
                        <p className="text-gray-400 italic mb-6">{currentIngredient.scientificName}</p>

                        <p className="text-gray-300 leading-relaxed mb-8">{currentIngredient.description}</p>

                        {/* Benefits */}
                        <div className="mb-8">
                            <h4 className="text-xl font-semibold text-white mb-4">Proven Benefits:</h4>
                            <ul className="space-y-3">
                                {currentIngredient.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Usage Info */}
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-[#0F1420] border border-[#1A2332] rounded-lg p-4">
                                <h5 className="text-white font-semibold mb-1">Recommended Dosage:</h5>
                                <p className="text-gray-400 text-sm">{currentIngredient.dosage}</p>
                            </div>
                            <div className="bg-[#0F1420] border border-[#1A2332] rounded-lg p-4">
                                <h5 className="text-white font-semibold mb-1">Research Studies:</h5>
                                <p className="text-gray-400 text-sm">{currentIngredient.research}</p>
                            </div>
                        </div>

                        {/* CTA */}
                        <button className="btn-primary">
                            View Products with {currentIngredient.name}
                        </button>
                    </div>
                </div>

                {/* Research Section */}
                <div className="mt-20 bg-[#0F1420] border border-[#1A2332] rounded-3xl p-8 md:p-12">
                    <h3 className="text-3xl font-bold text-white mb-8 text-center">
                        Scientific Validation
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Microscope className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">Clinical Studies</h4>
                            <p className="text-gray-400 text-sm">Over 1000+ peer-reviewed studies validate the efficacy of our key ingredients</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">Quality Assured</h4>
                            <p className="text-gray-400 text-sm">Every batch is tested for purity, potency, and safety in certified laboratories</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">Global Recognition</h4>
                            <p className="text-gray-400 text-sm">Our ingredients are recognized and used by health practitioners worldwide</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default IngredientSpotlight