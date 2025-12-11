'use client'

import { usePathname } from "next/navigation"
import { HomeIcon, PackageIcon, ShoppingCartIcon, TicketPercentIcon, UsersIcon, BarChart3Icon, SettingsIcon, Leaf } from "lucide-react"
import Link from "next/link"

const AdminSidebar = () => {

    const pathname = usePathname()

    const sidebarLinks = [
        { name: 'Dashboard', href: '/admin', icon: HomeIcon },
        { name: 'Products', href: '/admin/products', icon: PackageIcon },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingCartIcon },
        { name: 'Customers', href: '/admin/customers', icon: UsersIcon },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3Icon },
        { name: 'Coupons', href: '/admin/coupons', icon: TicketPercentIcon },
        { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
    ]

    return (
        <div className="inline-flex h-full flex-col gap-5 border-r border-[#1A2332] bg-[#0A0E1A] sm:min-w-60">
            <div className="flex flex-col gap-3 justify-center items-center pt-8 max-sm:hidden">
                <div className="w-16 h-16 bg-gradient-to-br from-[#de2529] to-[#ff3b3f] rounded-full flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-semibold">Du Daddy Admin</p>
                <p className="text-gray-400 text-xs">Ayurvedic Supplements</p>
            </div>

            <div className="max-sm:mt-6">
                {
                    sidebarLinks.map((link, index) => (
                        <Link key={index} href={link.href} className={`relative flex items-center gap-3 text-gray-400 hover:bg-[#0F1420] hover:text-white p-2.5 transition ${pathname === link.href && 'bg-[#0F1420] sm:text-white border-r-2 border-[#de2529]'}`}>
                            <link.icon size={18} className="sm:ml-5" />
                            <p className="max-sm:hidden">{link.name}</p>
                            {pathname === link.href && <span className="absolute bg-[#de2529] right-0 top-1.5 bottom-1.5 w-1 sm:w-1.5 rounded-l"></span>}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default AdminSidebar