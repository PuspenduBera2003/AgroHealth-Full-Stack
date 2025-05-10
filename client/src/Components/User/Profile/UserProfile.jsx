import React from 'react'
import UserDetails from './UserDetails'

const UserProfile = () => {

    return (
        <section className={`user-right-panel border-l bg-gradient-to-r dark:border-gray-700 p-2 z-0 bg-neutral-50 dark:bg-stone-800 transition-colors duration-200 ease-in-out`} style={{minHeight: 'calc(100vh - 57px)'}}>
            <UserDetails />
        </section>
    )
}

export default UserProfile