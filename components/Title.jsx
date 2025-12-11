'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Title = ({ title, description, visibleButton = true, href = '' }) => {

    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-3xl font-bold text-gradient'>{title}</h2>
            <Link href={href} className='flex items-center gap-5 text-sm text-gray-400 mt-3'>
                <p className='max-w-lg text-center leading-relaxed'>{description}</p>
                {visibleButton && <button className='text-[#de2529] hover:text-[#ff3b3f] flex items-center gap-1 transition-colors font-semibold whitespace-nowrap'>View more <ArrowRight size={14} /></button>}
            </Link>
        </div>
    )
}

export default Title