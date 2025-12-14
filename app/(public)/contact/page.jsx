'use client'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            detail: "dudaddyworld@gmail.com",
            link: "mailto:dudaddyworld@gmail.com",
            color: "from-[#de2529] to-[#ff3b3f]"
        },
        {
            icon: Phone,
            title: "Call Us",
            detail: "+91 8840808354",
            link: "tel:+918840808354",
            color: "from-[#00D9FF] to-[#0099FF]"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            detail: "Delhi, India",
            link: "#",
            color: "from-[#de2529] to-[#ff3b3f]"
        },
        {
            icon: Clock,
            title: "Working Hours",
            detail: "Mon - Sat: 9AM - 6PM",
            link: "#",
            color: "from-[#00D9FF] to-[#0099FF]"
        }
    ]

    const socialLinks = [
        { icon: Instagram, link: "https://instagram.com/dudaddyy", label: "Instagram" },
        { icon: Facebook, link: "https://facebook.com", label: "Facebook" },
        { icon: Linkedin, link: "https://linkedin.com/company/dudaddy", label: "LinkedIn" },
        { icon: Twitter, link: "https://twitter.com", label: "Twitter" }
    ]

    const faqs = [
        {
            question: "Are your products 100% herbal?",
            answer: "Yes! All Du Daddy products are 100% herbal with zero synthetic chemicals. We use potent natural ingredients backed by Ayurvedic science."
        },
        {
            question: "How long does delivery take?",
            answer: "We typically deliver within 3-5 business days across India. Express delivery options are available for major cities."
        },
        {
            question: "Do you offer gym partnerships?",
            answer: "Absolutely! We have a specialized gym partnership program. Contact us to learn more about becoming a Du Daddy partner gym."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day money-back guarantee if you're not satisfied with our products. Your health and satisfaction are our priority."
        }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="min-h-screen bg-[#0A0E1A]">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#de2529]/20 via-transparent to-[#00D9FF]/20"></div>
                <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
                            Get In Touch
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Info Cards */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((info, index) => (
                        <a
                            key={index}
                            href={info.link}
                            className="card-dark group hover:scale-105 transition-all text-center"
                        >
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <info.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
                            <p className="text-gray-400">{info.detail}</p>
                        </a>
                    ))}
                </div>
            </div>

            {/* Contact Form & Info */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#0F1420] border border-[#1A2332] rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <MessageSquare className="w-8 h-8 text-[#de2529]" />
                                <h2 className="text-3xl font-bold text-white">Send us a Message</h2>
                            </div>
                            
                            <form onSubmit={(e) => toast.promise(handleSubmit(e), { loading: 'Sending message...' })} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-400 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#0A0E1A] border border-[#1A2332] rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#de2529] transition-colors"
                                            placeholder="Avinash Mishra"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-400 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#0A0E1A] border border-[#1A2332] rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#de2529] transition-colors"
                                            placeholder="dudaddyworld@gmail.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-400 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-[#0A0E1A] border border-[#1A2332] rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#de2529] transition-colors"
                                            placeholder="+91 8840808354"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-400 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#0A0E1A] border border-[#1A2332] rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#de2529] transition-colors"
                                            placeholder="Product Inquiry"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-400 mb-2">
                                        Your Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full bg-[#0A0E1A] border border-[#1A2332] rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#de2529] transition-colors resize-none"
                                        placeholder="Tell us how we can help you..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn-primary w-full md:w-auto flex items-center justify-center gap-2">
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Social Links */}
                        <div className="bg-[#0F1420] border border-[#1A2332] rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                            <p className="text-gray-400 mb-6 text-sm">
                                Stay connected with us on social media for updates, tips, and exclusive offers.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-[#0A0E1A] border border-[#1A2332] rounded-lg p-3 hover:border-[#de2529] hover:bg-[#de2529]/10 transition-all group"
                                    >
                                        <social.icon className="w-5 h-5 text-gray-400 group-hover:text-[#de2529] transition-colors" />
                                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                            {social.label}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-2xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-3">Need Immediate Help?</h3>
                            <p className="text-white/90 mb-4 text-sm">
                                Our customer support team is available to assist you with any questions or concerns.
                            </p>
                            <a href="tel:+918840808354" className="btn-secondary bg-white text-[#de2529] border-white hover:bg-white/90 w-full justify-center">
                                Call Now
                            </a>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-[#0F1420] border border-[#1A2332] rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Business Hours</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Monday - Friday</span>
                                    <span className="text-white font-semibold">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Saturday</span>
                                    <span className="text-white font-semibold">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Sunday</span>
                                    <span className="text-[#de2529] font-semibold">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gradient mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-400">Quick answers to common questions</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="card-dark">
                            <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                            <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Map Section (Placeholder) */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="bg-[#0F1420] border border-[#1A2332] rounded-2xl overflow-hidden h-96 flex items-center justify-center">
                    <div className="text-center">
                        <MapPin className="w-16 h-16 text-[#de2529] mx-auto mb-4" />
                        <p className="text-gray-400">Map integration coming soon</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
