'use client'
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import AuthButton from "./AuthButton";

const Navbar = () => {

    const router = useRouter();

    const [search, setSearch] = useState('')
    const cartCount = useSelector(state => state.cart.total)

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    return (
        <nav className="relative bg-[#0A0E1A] border-b border-[#1A2332] backdrop-blur-lg sticky top-0 z-50">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-3 transition-all">

                    {/* Du Daddy Logo */}
                    <Link href="/" className="relative font-bold text-white group flex items-center gap-2">
                        {/* Logo Icon - D with red slash */}
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
                            <span className="text-[7px] text-gray-500 tracking-wider uppercase">Har Gym Ka Daddy</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-gray-300">
                        <Link href="/" className="hover:text-[#de2529] transition-colors font-medium">Home</Link>
                        <Link href="/shop" className="hover:text-[#de2529] transition-colors font-medium">Shop</Link>
                        <Link href="/products" className="hover:text-[#de2529] transition-colors font-medium">Products</Link>
                        <Link href="/about" className="hover:text-[#de2529] transition-colors font-medium">About</Link>
                        <Link href="/contact" className="hover:text-[#de2529] transition-colors font-medium">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-[#0F1420] border border-[#1A2332] px-4 py-2.5 rounded-lg hover:border-[#de2529]/50 transition-all">
                            <Search size={18} className="text-gray-400" />
                            <input className="w-full bg-transparent outline-none placeholder-gray-500 text-white" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-gray-300 hover:text-[#de2529] transition-colors font-medium">
                            <ShoppingCart size={18} />
                            Cart
                            <span className="absolute -top-1 left-3 text-[9px] font-bold text-white bg-gradient-to-r from-[#de2529] to-[#ff3b3f] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{cartCount}</span>
                        </Link>

                        <AuthButton />

                    </div>

                    {/* Mobile User Button  */}
                    <div className="sm:hidden">
                        <AuthButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar