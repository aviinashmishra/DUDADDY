'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {

    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const router = useRouter()

    const [mainImage, setMainImage] = useState(product.images[0]);

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }))
    }

    const averageRating = product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length;
    
    return (
        <div className="flex max-lg:flex-col gap-12">
            <div className="flex max-sm:flex-col-reverse gap-3">
                <div className="flex sm:flex-col gap-3">
                    {product.images.map((image, index) => (
                        <div key={index} onClick={() => setMainImage(product.images[index])} className="bg-[#0F1420] border border-[#1A2332] hover:border-[#de2529]/50 flex items-center justify-center size-26 rounded-xl group cursor-pointer transition-all">
                            <Image src={image} className="group-hover:scale-110 group-active:scale-95 transition-transform" alt="" width={45} height={45} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center h-100 sm:size-113 bg-[#0F1420] border border-[#1A2332] rounded-xl">
                    <Image src={mainImage} alt="" width={250} height={250} />
                </div>
            </div>
            <div className="flex-1">
                <h1 className="text-4xl font-bold text-gradient">{product.name}</h1>
                <div className='flex items-center mt-3'>
                    {Array(5).fill('').map((_, index) => (
                        <StarIcon key={index} size={16} className='text-transparent' fill={averageRating >= index + 1 ? "#de2529" : "#1A2332"} />
                    ))}
                    <p className="text-sm ml-3 text-gray-400">{product.rating.length} Reviews</p>
                </div>
                <div className="flex items-start my-6 gap-3 text-3xl font-bold">
                    <p className="text-[#de2529]"> {currency}{product.price} </p>
                    <p className="text-xl text-gray-500 line-through">{currency}{product.mrp}</p>
                </div>
                <div className="flex items-center gap-2 text-[#00D9FF] bg-[#00D9FF]/10 px-4 py-2 rounded-lg border border-[#00D9FF]/30 w-fit">
                    <TagIcon size={16} />
                    <p className="font-semibold">Save {((product.mrp - product.price) / product.mrp * 100).toFixed(0)}% right now</p>
                </div>
                <div className="flex items-end gap-5 mt-10">
                    {
                        cart[productId] && (
                            <div className="flex flex-col gap-3">
                                <p className="text-lg text-white font-semibold">Quantity</p>
                                <Counter productId={productId} />
                            </div>
                        )
                    }
                    <button onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')} className="btn-primary">
                        {!cart[productId] ? 'Add to Cart' : 'View Cart'}
                    </button>
                </div>
                <hr className="border-[#1A2332] my-6" />
                <div className="flex flex-col gap-4 text-gray-300">
                    <p className="flex gap-3 items-center"> <EarthIcon className="text-[#de2529]" size={20} /> Free shipping worldwide </p>
                    <p className="flex gap-3 items-center"> <CreditCardIcon className="text-[#de2529]" size={20} /> 100% Secured Payment </p>
                    <p className="flex gap-3 items-center"> <UserIcon className="text-[#de2529]" size={20} /> Trusted by top brands </p>
                </div>

            </div>
        </div>
    )
}

export default ProductDetails