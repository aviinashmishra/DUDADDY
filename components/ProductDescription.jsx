'use client'
import { ArrowRight, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }) => {

    const [selectedTab, setSelectedTab] = useState('Description')

    return (
        <div className="my-18 text-sm text-gray-300">

            {/* Tabs */}
            <div className="flex border-b border-[#1A2332] mb-6 max-w-2xl">
                {['Description', 'Reviews'].map((tab, index) => (
                    <button className={`${tab === selectedTab ? 'border-b-2 border-[#de2529] text-white font-bold' : 'text-gray-500'} px-4 py-3 font-medium transition-colors`} key={index} onClick={() => setSelectedTab(tab)}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Description */}
            {selectedTab === "Description" && (
                <p className="max-w-xl leading-relaxed text-gray-400">{product.description}</p>
            )}

            {/* Reviews */}
            {selectedTab === "Reviews" && (
                <div className="flex flex-col gap-3 mt-14">
                    {product.rating.map((item,index) => (
                        <div key={index} className="flex gap-5 mb-10 bg-[#0F1420] border border-[#1A2332] rounded-xl p-6">
                            <Image src={item.user.image} alt="" className="size-12 rounded-full border-2 border-[#de2529]" width={100} height={100} />
                            <div>
                                <div className="flex items-center" >
                                    {Array(5).fill('').map((_, index) => (
                                        <StarIcon key={index} size={18} className='text-transparent' fill={item.rating >= index + 1 ? "#de2529" : "#1A2332"} />
                                    ))}
                                </div>
                                <p className="text-sm max-w-lg my-4 text-gray-300 leading-relaxed">{item.review}</p>
                                <p className="font-semibold text-white">{item.user.name}</p>
                                <p className="mt-2 text-gray-500 text-xs">{new Date(item.createdAt).toDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Store Page */}
            <div className="flex gap-4 mt-14 bg-[#0F1420] border border-[#1A2332] rounded-xl p-6 hover:border-[#de2529]/50 transition-all">
                <Image src={product.store.logo} alt="" className="size-14 rounded-full ring-2 ring-[#de2529]" width={100} height={100} />
                <div>
                    <p className="font-semibold text-white">Product by {product.store.name}</p>
                    <Link href={`/shop/${product.store.username}`} className="flex items-center gap-1.5 text-[#de2529] hover:text-[#ff3b3f] transition-colors mt-1 font-medium"> 
                        view store <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription