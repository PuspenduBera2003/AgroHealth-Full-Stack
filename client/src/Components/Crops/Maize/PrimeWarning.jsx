import React from 'react'

const PrimeWarning = () => {
    return (
        <div className='fixed bottom-3 w-full z-10 flex items-center justify-center'>
            <div className="w-96 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                <div className='bg-gray-100 dark:bg-stone-900 font-bold text-center cursor-pointer w-96 p-3 rounded-md flex flex-col gap-2 items-center justify-center'>
                    <div className='text-gray-900 dark:text-white z-10 font-semibold uppercase'>
                        Subscribe to Premium to upload more
                    </div>
                    <button type="button" className="text-black bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-100 dark:focus:ring-amber-800 font-medium rounded-lg text-sm text-center p-2 cursor-pointer">
                        Get Premium
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PrimeWarning
