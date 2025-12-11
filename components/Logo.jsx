import Link from 'next/link'
import Image from 'next/image'

const Logo = ({ className = "", size = "default" }) => {
    const sizes = {
        small: { text: "text-xl", icon: "w-6 h-6" },
        default: { text: "text-3xl", icon: "w-10 h-10" },
        large: { text: "text-4xl", icon: "w-12 h-12" }
    }

    const currentSize = sizes[size] || sizes.default

    return (
        <Link href="/" className={`relative font-bold text-white group flex items-center gap-2 ${className}`}>
            {/* Logo Icon - D with red slash */}
            <div className="relative">
                <svg className={currentSize.icon} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* D Letter */}
                    <path d="M5 5 L20 5 L30 10 L30 40 L20 45 L5 45 L5 5 Z" fill="url(#logoGradient)"/>
                    <path d="M8 8 L8 42 L18 42 L26 37 L26 13 L18 8 L8 8 Z" fill="#0A0E1A"/>
                    
                    {/* Red Slash */}
                    <rect x="22" y="5" width="3" height="40" fill="#de2529" transform="rotate(25 24 25)"/>
                    
                    <defs>
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#999999" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            
            {/* Text */}
            <div className="flex flex-col">
                <span className={`${currentSize.text} leading-none`}>
                    <span className="text-white">Du</span>
                    <span className="text-gradient">Daddy</span>
                </span>
                <span className="text-[8px] text-gray-400 tracking-wider uppercase">Har Gym Ka Daddy</span>
            </div>
        </Link>
    )
}

export default Logo
