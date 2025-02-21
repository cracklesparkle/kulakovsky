import Calendar from '@/components/Events/Calendar'
import React from 'react'

const EventsPage = () => {
    return (
        <div className={`flex flex-col w-full space-y-4`}>
            <div className="flex flex-col w-full max-w-screen-lg mx-auto p-4 space-y-8">
                <Calendar />
            </div>
        </div>
    )
}

export default EventsPage