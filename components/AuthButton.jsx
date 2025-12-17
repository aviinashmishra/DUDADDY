'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { User, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function AuthButton() {
  const { data: session, status } = useSession()
  const [showMenu, setShowMenu] = useState(false)

  if (status === 'loading') {
    return (
      <div className="w-8 h-8 rounded-full bg-[#1A2332] animate-pulse"></div>
    )
  }

  if (!session) {
    return (
      <Link
        href="/auth/signin"
        className="px-8 py-2.5 bg-gradient-to-r from-[#de2529] to-[#ff3b3f] hover:shadow-lg hover:shadow-red-500/50 transition-all hover:scale-105 active:scale-95 text-white rounded-lg flex items-center gap-2 font-semibold"
      >
        <User size={18} />
        <span className="hidden sm:inline">Sign In</span>
        <span className="sm:hidden">Login</span>
      </Link>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#0F1420] transition-colors"
      >
        <img
          src={session.user.image || '/default-avatar.png'}
          alt={session.user.name}
          className="w-8 h-8 rounded-full border-2 border-[#de2529] shadow-lg shadow-red-500/30"
        />
        <span className="hidden md:block text-sm font-medium text-gray-200">
          {session.user.name}
        </span>
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-[#0F1420] border border-[#1A2332] rounded-lg shadow-xl shadow-black/50 py-2 z-20">
            <div className="px-4 py-2 border-b border-[#1A2332]">
              <p className="text-sm font-medium text-white">
                {session.user.name}
              </p>
              <p className="text-xs text-gray-400">{session.user.email}</p>
            </div>
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#1A2332] hover:text-[#de2529] transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <User size={16} />
              My Profile
            </Link>
            <Link
              href="/orders"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#1A2332] hover:text-[#de2529] transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <User size={16} />
              My Orders
            </Link>
            {session.user.role === 'admin' && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#1A2332] hover:text-[#de2529] transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <User size={16} />
                Admin Panel
              </Link>
            )}
            <button
              onClick={() => {
                setShowMenu(false)
                signOut({ callbackUrl: '/' })
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#de2529] hover:bg-[#1A2332] transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
