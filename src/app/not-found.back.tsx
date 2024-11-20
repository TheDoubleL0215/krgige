import React from 'react'

const NotFoundPage = () => {
    return (
        <div className='flex justify-center items-center h-screen gap-3'>
            <h1 className='text-3xl font-bold'>404</h1>
            <hr className="h-px my-8 bg-gray-200 border-1 dark:bg-gray-700" />
            <p>Az oldal nem található</p>
        </div>
    )
}

export default NotFoundPage