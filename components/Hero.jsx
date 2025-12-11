'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>
                <div className='relative flex-1 flex flex-col bg-gradient-to-br from-[#0F1420] via-[#1A1F2E] to-[#0A0E1A] rounded-3xl xl:min-h-100 group border border-[#1A2332] hover:border-[#de2529]/50 transition-all overflow-hidden'>
                    {/* Glow effect */}
                    <div className='absolute inset-0 bg-gradient-to-br from-[#de2529]/10 via-transparent to-[#00D9FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                    
                    <div className='relative p-5 sm:p-16 z-10'>
                        <div className='inline-flex items-center gap-3 bg-gradient-to-r from-[#de2529] to-[#ff3b3f] text-white pr-4 p-1 rounded-full text-xs sm:text-sm shadow-lg shadow-red-500/30'>
                            <span className='bg-white/20 backdrop-blur-sm px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs font-bold'>NEW</span> 
                            Free Shipping on Orders Above $50! 
                            <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
                        </div>
                        <h2 className='text-3xl sm:text-6xl leading-[1.1] my-5 font-bold text-gradient max-w-xs sm:max-w-md'>
                            Premium Products. Unbeatable Prices.
                        </h2>
                        <div className='text-gray-300 text-sm font-medium mt-4 sm:mt-8'>
                            <p className='text-gray-400'>Starts from</p>
                            <p className='text-4xl font-bold text-gradient mt-1'>{currency}4.90</p>
                        </div>
                        <button className='btn-primary mt-6 sm:mt-10 text-sm sm:text-base'>
                            SHOP NOW
                        </button>
                    </div>
                    <Image className='sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm opacity-90 group-hover:opacity-100 transition-opacity' src={assets.hero_model_img} alt="" />
                </div>
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm'>
                    <div className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-[#0F1420] to-[#1A1F2E] border border-[#1A2332] hover:border-[#ff3b3f]/50 rounded-3xl p-6 px-8 group transition-all cursor-pointer'>
                        <div>
                            <p className='text-3xl font-bold bg-gradient-to-r from-white to-[#ff3b3f] bg-clip-text text-transparent max-w-40'>Best products</p>
                            <p className='flex items-center gap-1 mt-4 text-[#ff3b3f] font-semibold'>
                                View more 
                                <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> 
                            </p>
                        </div>
                        <Image className='w-35 group-hover:scale-110 transition-transform' src={assets.hero_product_img1} alt="" />
                    </div>
                    <div className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-[#0F1420] to-[#1A1F2E] border border-[#1A2332] hover:border-[#00D9FF]/50 rounded-3xl p-6 px-8 group transition-all cursor-pointer'>
                        <div>
                            <p className='text-3xl font-bold bg-gradient-to-r from-white to-[#00D9FF] bg-clip-text text-transparent max-w-40'>20% discounts</p>
                            <p className='flex items-center gap-1 mt-4 text-[#00D9FF] font-semibold'>
                                View more 
                                <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> 
                            </p>
                        </div>
                        <Image className='w-35 group-hover:scale-110 transition-transform' src={assets.hero_product_img2} alt="" />
                    </div>
                </div>
            </div>
            <CategoriesMarquee />
        </div>

    )
}

export default Hero