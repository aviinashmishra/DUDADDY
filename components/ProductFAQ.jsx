'use client'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'

const ProductFAQ = () => {
    const [openFAQ, setOpenFAQ] = useState(0)

    const faqs = [
        {
            question: "Are Du Daddy products 100% natural and safe?",
            answer: "Yes, all Du Daddy products are 100% natural and made from authentic Ayurvedic herbs. They are AYUSH certified, lab-tested for purity, and manufactured in GMP-certified facilities. Our products contain zero synthetic chemicals, artificial additives, or harmful substances."
        },
        {
            question: "How long does it take to see results?",
            answer: "Most customers start noticing improvements within 2-3 weeks of consistent use. However, results may vary based on individual body constitution, lifestyle, and fitness goals. For optimal results, we recommend using the products for at least 3 months along with a balanced diet and regular exercise."
        },
        {
            question: "Can I take multiple Du Daddy products together?",
            answer: "Yes, our products are designed to complement each other and can be safely combined. Many customers use Strength Booster with Recovery Master for comprehensive fitness support. However, we recommend consulting our experts or following the combination guidelines provided with each product."
        },
        {
            question: "Are there any side effects?",
            answer: "Du Daddy products are made from natural Ayurvedic herbs and are generally safe with no known side effects when used as directed. However, if you have any pre-existing medical conditions, are pregnant, nursing, or taking medications, please consult your healthcare provider before use."
        },
        {
            question: "What makes Du Daddy different from other supplements?",
            answer: "Du Daddy is India's first 100% herbal performance supplement brand. Unlike synthetic supplements, we use authentic Ayurvedic formulations backed by 5000+ years of traditional wisdom and modern clinical research. Our products provide holistic benefits without side effects or dependency."
        },
        {
            question: "How should I take Du Daddy products?",
            answer: "Each product comes with specific dosage instructions. Generally, take 1-2 capsules daily with warm water or milk, preferably after meals. For pre-workout products like Energy Enhancer, take 30-45 minutes before exercise. Always follow the recommended dosage on the product label."
        },
        {
            question: "Are your products suitable for vegetarians and vegans?",
            answer: "Yes, all Du Daddy products are 100% vegetarian. Our capsules are made from plant-based materials, and all ingredients are derived from herbs and natural sources. They are suitable for both vegetarians and vegans."
        },
        {
            question: "Do you offer money-back guarantee?",
            answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with the results, you can return the unused portion within 30 days of purchase for a full refund. Your satisfaction and health are our top priorities."
        },
        {
            question: "Can women use Du Daddy products?",
            answer: "Absolutely! While our branding focuses on 'Har Gym Ka Daddy', our products are formulated to be effective for both men and women. Many female athletes and fitness enthusiasts use our products successfully. The natural herbs work effectively regardless of gender."
        },
        {
            question: "Where are Du Daddy products manufactured?",
            answer: "All Du Daddy products are manufactured in India in state-of-the-art, GMP-certified facilities. We source our herbs from their native regions across India to ensure maximum potency and authenticity. Every batch undergoes rigorous quality testing before reaching you."
        }
    ]

    return (
        <section className="py-20 px-6 bg-gradient-to-b from-[#0A0E1A] to-[#0F1420]">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-[#de2529]/20 border border-blue-600/30 px-4 py-2 rounded-full mb-6">
                        <HelpCircle className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-semibold text-blue-400">Frequently Asked Questions</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Got <span className="text-gradient">Questions?</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Find answers to the most common questions about Du Daddy products, 
                        ingredients, usage, and benefits.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            className="bg-[#0F1420] border border-[#1A2332] rounded-2xl overflow-hidden hover:border-[#de2529]/50 transition-all"
                        >
                            <button
                                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                                className="w-full p-6 text-left flex items-center justify-between hover:bg-[#1A2332]/30 transition-colors"
                            >
                                <h3 className="text-lg font-semibold text-white pr-4">
                                    {faq.question}
                                </h3>
                                <ChevronDown 
                                    className={`w-5 h-5 text-[#de2529] transition-transform flex-shrink-0 ${
                                        openFAQ === index ? 'rotate-180' : ''
                                    }`} 
                                />
                            </button>
                            
                            {openFAQ === index && (
                                <div className="px-6 pb-6">
                                    <div className="border-t border-[#1A2332] pt-4">
                                        <p className="text-gray-300 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="mt-16 bg-gradient-to-br from-[#0F1420] to-[#1A1F2E] border border-[#1A2332] rounded-3xl p-8 md:p-12 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        Still Have Questions?
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Our team of Ayurvedic experts and customer support specialists are here to help. 
                        Get personalized advice and answers to all your questions.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">📞</span>
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">Call Us</h4>
                            <p className="text-gray-400 text-sm">+91 98765 43210</p>
                            <p className="text-gray-400 text-sm">Mon-Sat: 9AM-6PM</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">💬</span>
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">Live Chat</h4>
                            <p className="text-gray-400 text-sm">Instant support</p>
                            <p className="text-gray-400 text-sm">Available 24/7</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">📧</span>
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">Email Us</h4>
                            <p className="text-gray-400 text-sm">support@dudaddy.com</p>
                            <p className="text-gray-400 text-sm">Response within 24hrs</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-primary">Contact Support</button>
                        <button className="btn-secondary">Book Consultation</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductFAQ