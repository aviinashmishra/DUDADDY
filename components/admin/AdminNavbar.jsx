'use client'
import Link from "next/link"

const AdminNavbar = () => {

    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-[#1A2332] bg-[#0A0E1A] transition-all">
            <Link href="/" className="relative font-bold text-white group flex items-center gap-2">
                {/* Du Daddy Logo */}
                <div className="relative">
                    <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5 L20 5 L30 10 L30 40 L20 45 L5 45 L5 5 Z" fill="url(#logoGradient)"/>
                        <path d="M8 8 L8 42 L18 42 L26 37 L26 13 L18 8 L8 8 Z" fill="#0A0E1A"/>
                        <rect x="22" y="5" width="3" height="40" fill="#de2529" transform="rotate(25 24 25)"/>
                        <defs>
                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#999999" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl leading-none">
                        <span className="text-white">Du</span>
                        <span className="text-gradient">Daddy</span>
                    </span>
                    <span className="text-[7px] text-gray-500 tracking-wider uppercase">Admin Panel</span>
                </div>
                <div className="absolute text-xs font-semibold -top-1 -right-16 px-3 py-1 rounded-full flex items-center gap-2 text-white bg-gradient-to-r from-[#de2529] to-[#ff3b3f]">
                    Admin
                </div>
            </Link>
            <div className="flex items-center gap-3">
                <p className="text-gray-300">Hi, Du Daddy Admin</p>
            </div>
        </div>
    )
}

export default AdminNavbar