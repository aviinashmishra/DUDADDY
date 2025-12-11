'use client'
import { addToCart, removeFromCart } from "@/lib/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Counter = ({ productId }) => {

    const { cartItems } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }))
    }

    const removeFromCartHandler = () => {
        dispatch(removeFromCart({ productId }))
    }

    return (
        <div className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1.5 rounded-lg border border-[#1A2332] bg-[#0F1420] max-sm:text-sm text-white">
            <button onClick={removeFromCartHandler} className="p-1 select-none hover:text-[#de2529] transition-colors font-bold">-</button>
            <p className="p-1 font-semibold min-w-[20px] text-center">{cartItems[productId]}</p>
            <button onClick={addToCartHandler} className="p-1 select-none hover:text-[#de2529] transition-colors font-bold">+</button>
        </div>
    )
}

export default Counter