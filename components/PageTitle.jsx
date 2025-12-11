'use client'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

const PageTitle = ({ heading, text, path = "/", linkText }) => {
    return (
        <div className="my-8">
            <h2 className="text-3xl font-bold text-gradient">{heading}</h2>
            <div className="flex items-center gap-3 mt-2">
                <p className="text-gray-400">{text}</p>
                <Link href={path} className="flex items-center gap-1 text-[#de2529] hover:text-[#ff3b3f] text-sm font-semibold transition-colors">
                    {linkText} <ArrowRightIcon size={14} />
                </Link>
            </div>
        </div>
    )
}

export default PageTitle