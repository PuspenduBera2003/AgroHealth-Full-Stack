import React from 'react'
import { useSelector } from 'react-redux'
import UserDetails from './UserDetails'

const UserProfile = () => {

    return (
        <section className={`user-right-panel border-l bg-gradient-to-r dark:border-gray-700 p-2 z-0 $ bg-neutral-50 dark:bg-stone-800`} style={{minHeight: 'calc(100vh - 57px)'}}>
            <UserDetails />
        </section>
    )
}

export default UserProfile