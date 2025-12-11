import { PlusIcon, SquarePenIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react'
import AddressModal from './AddressModal';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OrderSummary = ({ totalPrice, items }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const router = useRouter();

    const addressList = useSelector(state => state.address.list);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [coupon, setCoupon] = useState('');

    const handleCouponCode = async (event) => {
        event.preventDefault();
        
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        router.push('/orders')
    }

    return (
        <div className='w-full max-w-lg lg:max-w-[340px] bg-[#0F1420] border border-[#1A2332] text-gray-400 text-sm rounded-xl p-7 sticky top-24'>
            <h2 className='text-xl font-bold text-white'>Payment Summary</h2>
            <p className='text-gray-500 text-xs my-4 font-semibold'>Payment Method</p>
            <div className='flex gap-2 items-center'>
                <input type="radio" id="COD" onChange={() => setPaymentMethod('COD')} checked={paymentMethod === 'COD'} className='accent-[#de2529]' />
                <label htmlFor="COD" className='cursor-pointer text-white'>COD</label>
            </div>
            <div className='flex gap-2 items-center mt-2'>
                <input type="radio" id="STRIPE" name='payment' onChange={() => setPaymentMethod('STRIPE')} checked={paymentMethod === 'STRIPE'} className='accent-[#de2529]' />
                <label htmlFor="STRIPE" className='cursor-pointer text-white'>Stripe Payment</label>
            </div>
            <div className='my-4 py-4 border-y border-[#1A2332] text-gray-400'>
                <p className='font-semibold text-gray-500 text-xs mb-2'>Address</p>
                {
                    selectedAddress ? (
                        <div className='flex gap-2 items-center'>
                            <p className='text-white'>{selectedAddress.name}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zip}</p>
                            <SquarePenIcon onClick={() => setSelectedAddress(null)} className='cursor-pointer hover:text-[#de2529] transition-colors' size={18} />
                        </div>
                    ) : (
                        <div>
                            {
                                addressList.length > 0 && (
                                    <select className='border border-[#1A2332] bg-[#0A0E1A] text-white p-2 w-full my-3 outline-none rounded-lg focus:border-[#de2529] transition-colors' onChange={(e) => setSelectedAddress(addressList[e.target.value])} >
                                        <option value="">Select Address</option>
                                        {
                                            addressList.map((address, index) => (
                                                <option key={index} value={index}>{address.name}, {address.city}, {address.state}, {address.zip}</option>
                                            ))
                                        }
                                    </select>
                                )
                            }
                            <button className='flex items-center gap-1 text-[#de2529] hover:text-[#ff3b3f] mt-1 font-semibold transition-colors' onClick={() => setShowAddressModal(true)} >Add Address <PlusIcon size={18} /></button>
                        </div>
                    )
                }
            </div>
            <div className='pb-4 border-b border-[#1A2332]'>
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-2 text-gray-400'>
                        <p>Subtotal:</p>
                        <p>Shipping:</p>
                        {coupon && <p>Coupon:</p>}
                    </div>
                    <div className='flex flex-col gap-2 font-semibold text-right text-white'>
                        <p>{currency}{totalPrice.toLocaleString()}</p>
                        <p className='text-[#00D9FF]'>Free</p>
                        {coupon && <p className='text-[#de2529]'>{`-${currency}${(coupon.discount / 100 * totalPrice).toFixed(2)}`}</p>}
                    </div>
                </div>
                {
                    !coupon ? (
                        <form onSubmit={e => toast.promise(handleCouponCode(e), { loading: 'Checking Coupon...' })} className='flex justify-center gap-3 mt-4'>
                            <input onChange={(e) => setCouponCodeInput(e.target.value)} value={couponCodeInput} type="text" placeholder='Coupon Code' className='border border-[#1A2332] bg-[#0A0E1A] text-white placeholder-gray-500 p-2 rounded-lg w-full outline-none focus:border-[#de2529] transition-colors' />
                            <button className='bg-gradient-to-r from-[#de2529] to-[#ff3b3f] text-white px-4 rounded-lg hover:shadow-lg hover:shadow-red-500/50 active:scale-95 transition-all font-semibold'>Apply</button>
                        </form>
                    ) : (
                        <div className='w-full flex items-center justify-center gap-2 text-xs mt-3 bg-[#0A0E1A] p-2 rounded-lg border border-[#1A2332]'>
                            <p className='text-white'>Code: <span className='font-semibold ml-1 text-[#de2529]'>{coupon.code.toUpperCase()}</span></p>
                            <p>{coupon.description}</p>
                            <XIcon size={18} onClick={() => setCoupon('')} className='hover:text-[#de2529] transition cursor-pointer' />
                        </div>
                    )
                }
            </div>
            <div className='flex justify-between py-4'>
                <p className='text-white font-semibold'>Total:</p>
                <p className='font-bold text-right text-[#de2529] text-lg'>{currency}{coupon ? (totalPrice - (coupon.discount / 100 * totalPrice)).toFixed(2) : totalPrice.toLocaleString()}</p>
            </div>
            <button onClick={e => toast.promise(handlePlaceOrder(e), { loading: 'placing Order...' })} className='w-full btn-primary'>Place Order</button>

            {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}

        </div>
    )
}

export default OrderSummary