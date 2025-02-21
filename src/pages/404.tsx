import { IconFileSadFilled } from '@tabler/icons-react'
import React from 'react'

const NotFoundPage = () => {
    return (
        <div className={`flex flex-col w-full space-y-4`}>
            <div className="flex flex-col w-full max-w-screen-lg mx-auto p-4 space-y-8">
                <h1 className='font-bold text-3xl'>404</h1>
                <div className='flex space-x-2 items-center'>
                    <IconFileSadFilled />
                    <h1 className='font-bold text-2xl'>Страница не найдена</h1>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage