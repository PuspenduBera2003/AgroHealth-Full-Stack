import React from 'react'
import { Link } from 'react-router-dom'

const NotAuthenticated = ({ data }) => {
    return (
        <div className="absolute inset-0 flex flex-col gap-5 items-center justify-center bg-black bg-opacity-40 text-white text-lg font-bold">
            {
                (data === 0) ?
                    <div>
                        Please login to get full access
                    </div>
                    :
                    <div>
                        You have exceeded free tier limit. Please subscribe to premium in order to upload more
                    </div>
            }
            {
                (data === 0) ?
                    <div>
                        <Link type="button" to='/auth/signin' className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Sign In
                        </Link>
                        <Link type="button" to='/auth/signup' className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Sign Up
                        </Link>
                    </div>
                    :
                    <div>
                        <button type="button" className="text-black bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-100 dark:focus:ring-amber-800 font-medium rounded-lg text-sm text-center p-2 cursor-pointer">
                            Get Premium
                        </button>
                    </div>
            }
        </div>
    )
}

export default NotAuthenticated