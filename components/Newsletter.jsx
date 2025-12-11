import React from 'react'
import Title from './Title'

const Newsletter = () => {
    return (
        <div className='flex flex-col items-center mx-4 my-36'>
            <Title title="Join Newsletter" description="Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week." visibleButton={false} />
            <div className='flex bg-[#0F1420] text-sm p-1.5 rounded-xl w-full max-w-xl my-10 border-2 border-[#1A2332] hover:border-[#de2529]/50 transition-all'>
                <input className='flex-1 pl-5 outline-none bg-transparent text-white placeholder-gray-500' type="text" placeholder='Enter your email address' />
                <button className='font-semibold bg-gradient-to-r from-[#de2529] to-[#ff3b3f] text-white px-7 py-3 rounded-lg hover:shadow-lg hover:shadow-red-500/50 hover:scale-105 active:scale-95 transition-all'>Get Updates</button>
            </div>
        </div>
    )
}

export default Newsletter