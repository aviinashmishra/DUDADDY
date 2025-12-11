'use client'
import { Star, Quote, User, Award, TrendingUp } from 'lucide-react'

const AyurvedicTestimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Rajesh Kumar",
            age: 32,
            location: "Mumbai",
            profession: "Fitness Trainer",
            rating: 5,
            product: "Strength Booster",
            testimonial: "After 3 weeks of using Du Daddy's Strength Booster, I've seen a 40% increase in my workout capacity. The best part? No side effects, just pure natural energy!",
            image: "/api/placeholder/80/80",
            results: "40% strength increase",
            duration: "3 weeks"
        },
        {
            id: 2,
            name: "Priya Sharma",
            age: 28,
            location: "Delhi",
            profession: "Yoga Instructor",
            rating: 5,
            product: "Energy Enhancer",
            testimonial: "As a yoga instructor, I need sustained energy throughout the day. Du Daddy's Energy Enhancer gives me natural vitality without any crashes. Highly recommended!",
            image: "/api/placeholder/80/80",
            results: "All-day energy",
            duration: "2 weeks"
        },
        {
            id: 3,
            name: "Amit Patel",
            age: 35,
            location: "Bangalore",
            profession: "Software Engineer",
            rating: 5,
            product: "Recovery Master",
            testimonial: "Working long hours was affecting my recovery. Since starting Recovery Master, my sleep quality improved and muscle soreness reduced significantly.",
            image: "/api/placeholder/80/80",
            results: "Better recovery",
            duration: "4 weeks"
        },
        {
            id: 4,
            name: "Dr. Sunita Rao",
            age: 45,
            location: "Chennai",
            profession: "Ayurvedic Doctor",
            rating: 5,
            product: "Complete Range",
            testimonial: "As an Ayurvedic practitioner, I'm impressed by Du Daddy's authentic formulations. The quality and potency match traditional standards while being convenient for modern lifestyles.",
            image: "/api/placeholder/80/80",
            results: "Professional approval",
            duration: "6 months"
        }
    ]

    const stats = [
        {
            number: "10,000+",
            label: "Happy Customers",
            icon: User
        },
        {
            number: "4.8/5",
            label: "Average Rating",
            icon: Star
        },
        {
            number: "95%",
            label: "Satisfaction Rate",
            icon: Award
        },
        {
            number: "3x",
            label: "Repeat Customers",
            icon: TrendingUp
        }
    ]

    return (
        <section className="py-20 px-6 bg-gradient-to-b from-[#0F1420] to-[#0A0E1A]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-[#de2529]/20 border border-green-600/30 px-4 py-2 rounded-full mb-6">
                        <Quote className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">Success Stories</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Real People, <span className="text-gradient">Real Results</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Discover how Du Daddy's Ayurvedic supplements have transformed the lives 
                        of thousands across India.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <stat.icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-3xl font-bold text-[#de2529] mb-2">{stat.number}</div>
                            <div className="text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {testimonials.map((testimonial, index) => (
                        <div key={testimonial.id} className="bg-[#0F1420] border border-[#1A2332] rounded-2xl p-8 hover:border-[#de2529]/50 transition-all group">
                            {/* Quote Icon */}
                            <div className="w-12 h-12 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center mb-6">
                                <Quote className="w-6 h-6 text-white" />
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-[#de2529] fill-current" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <blockquote className="text-gray-300 leading-relaxed mb-6 italic">
                                "{testimonial.testimonial}"
                            </blockquote>

                            {/* Results Badge */}
                            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-600/30 px-3 py-1 rounded-full mb-6">
                                <TrendingUp className="w-4 h-4 text-green-400" />
                                <span className="text-sm font-semibold text-green-400">{testimonial.results}</span>
                                <span className="text-xs text-gray-400">in {testimonial.duration}</span>
                            </div>

                            {/* User Info */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold text-white">{testimonial.name}, {testimonial.age}</div>
                                    <div className="text-sm text-gray-400">{testimonial.profession}</div>
                                    <div className="text-xs text-[#de2529]">{testimonial.location} • {testimonial.product}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Video Testimonial Section */}
                <div className="bg-gradient-to-br from-[#0F1420] to-[#1A1F2E] border border-[#1A2332] rounded-3xl p-8 md:p-12 text-center">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        See the Transformation
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Watch real customers share their journey with Du Daddy's Ayurvedic supplements 
                        and the incredible results they've achieved.
                    </p>
                    
                    {/* Video Placeholder */}
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl h-64 md:h-80 flex items-center justify-center mb-8 group cursor-pointer hover:scale-105 transition-transform">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                        </div>
                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                            Customer Success Stories
                        </div>
                    </div>

                    <button className="btn-primary">
                        Watch More Stories
                    </button>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Ready to Write Your Success Story?
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have transformed their health with Du Daddy's authentic Ayurvedic supplements.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-primary">Start Your Journey</button>
                        <button className="btn-secondary">Read More Reviews</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AyurvedicTestimonials