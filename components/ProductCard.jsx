'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // calculate the average rating of the product
    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length);

    return (
        <Link href={`/product/${product.id}`} className='group max-xl:mx-auto'>
            <div className='bg-[#0F1420] border border-[#1A2332] h-40 sm:w-60 sm:h-68 rounded-xl flex items-center justify-center overflow-hidden group-hover:border-[#de2529]/50 transition-all relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#de2529]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                <Image width={500} height={500} className='max-h-30 sm:max-h-40 w-auto group-hover:scale-110 transition-transform duration-500 relative z-10' src={product.images[0]} alt={product.name} />
            </div>
            <div className='flex justify-between gap-3 text-sm text-gray-300 pt-3 max-w-60'>
                <div>
                    <p className='group-hover:text-[#de2529] transition-colors font-medium'>{product.name}</p>
                    <div className='flex mt-1'>
                        {Array(5).fill('').map((_, index) => (
                            <StarIcon key={index} size={14} className='text-transparent' fill={rating >= index + 1 ? "#de2529" : "#1A2332"} />
                        ))}
                    </div>
                </div>
                <p className='text-[#de2529] font-bold'>{currency}{product.price}</p>
            </div>
        </Link>
    )
}

export default ProductCard