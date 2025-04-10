import React from 'react'
import { TypeAnimation } from 'react-type-animation';

const HomePageTyping = () => {
    return (
        <div className='w-full flex items-center justify-center mt-3 z-10'>
            <TypeAnimation
                sequence={[
                    // Same substring at the start will only be typed out once, initially
                    'Detect, Diagnose, and Safeguard',
                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                    'Detect, Diagnose, and Improve',
                    1000,
                    'Detect, Diagnose, and Prevent',
                    1000,
                    'Detect, Diagnose, and Defend',
                    1000
                ]}
                wrapper="span"
                speed={50}
                style={{ display: 'inline-block' }}
                repeat={Infinity}
                className='text-gradient bg-gradient-to-r z-10 font-semibold from-purple-400 via-pink-500 to-red-500 text-2xl sm:text-3xl md:text-4xl'
            />
        </div>
    )
}

export default HomePageTyping
