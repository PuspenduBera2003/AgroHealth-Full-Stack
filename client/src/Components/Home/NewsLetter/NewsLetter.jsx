import React, { useState } from 'react'

const NewsLetter = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Subscribed with:', email);
    };

    return (
        <div className="flex flex-col items-center justify-center py-2 md:py-10 bg-gradient-to-br px-2">
            <div className="w-full md:hidden flex items-center justify-center">
            <div className='premium-button mb-2 w-24'>
                <div className='text-black bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-100 dark:focus:ring-amber-800 font-medium rounded-lg text-sm text-center p-2 cursor-pointer'>
                    Get Premium
                </div>
            </div>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                Subscribe to our Newsletter
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Stay updated with the latest news and updates on crop and cattle health!
            </p>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col px-1 sm:flex-row items-center justify-center gap-4 w-full sm:w-2/3 md:w-1/2"
            >
                <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full sm:w-auto flex-1 px-4 py-2 bg-white border-2 border-gray-300 dark:bg-neutral-700 dark:border-neutral-600 rounded-md shadow-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-lime-500 dark:focus:border-lime-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="px-6 py-2 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg shadow-md"
                >
                    Subscribe
                </button>
            </form>
        </div>
    )
}

export default NewsLetter
