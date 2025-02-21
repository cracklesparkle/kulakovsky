import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const eventsData = [
    { date: 1677340800, title: 'Событие 1', link: '/events/1' }, // timestamp in seconds
    { date: 1677427200, title: 'Событие 2', link: '/events/2' },
    { date: 1677513600, title: 'Событие 3', link: '/events/3' },
    { date: 1677600000, title: 'Событие 4', link: '/events/4' },
    { date: 1677686400, title: 'Событие 5', link: '/events/5' },
];

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handleDateClick = (day: number) => {
        const newSelectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newSelectedDate);
    };

    const handleMonthChange = (direction: 'prev' | 'next') => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + (direction === 'prev' ? -1 : 1));

        // Only update selectedDate if it's invalid in the new month
        // if (selectedDate) {
        //     const newSelectedDate = new Date(newMonth.getFullYear(), newMonth.getMonth(), selectedDate.getDate());

        //     // If the selected date is invalid (e.g., 31st in a 30-day month), adjust to the last valid day
        //     if (newSelectedDate.getMonth() !== newMonth.getMonth()) {
        //         newMonth.setDate(0); // Move to the last day of the previous month
        //         setSelectedDate(new Date(newMonth)); // Adjust to the last valid day
        //     } else {
        //         // Don't change selectedDate if it's valid in the new month
        //         setSelectedDate(newSelectedDate);
        //     }
        // }

        setCurrentMonth(newMonth);
    };

    const generateCalendar = () => {
        const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const daysInMonth = endDate.getDate();
        let firstDayOfMonth = startDate.getDay();

        // Shift to make Monday as the first day
        firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const days = [];

        // Add empty cells for the days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }

        // Add the actual days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return days;
    };

    const getEventsForDay = (day: number) => {
        return eventsData.filter(event => {
            const eventDate = new Date(event.date * 1000);
            return eventDate.getDate() === day && eventDate.getMonth() === selectedDate?.getMonth();
        });
    };

    const [eventsForSelectedDay, setEventsForSelectedDay] = useState<{
        date: number;
        title: string;
        link: string;
    }[]>([])


    useEffect(() => {
        if (selectedDate) {
            setEventsForSelectedDay(getEventsForDay(selectedDate.getDate()))
        } else {
            setEventsForSelectedDay([])
        }
    }, [selectedDate])

    return (
        <div className='flex flex-col space-y-4'>
            <Link href={'/events'} className={`h-10 cursor-pointer font-bold text-2xl mr-auto relative w-fit hover:after:w-full after:w-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[4px] after:bg-orange-700 after:transition-all after:duration-300`}>Календарь событий</Link>
            <div className="flex flex-col md:flex-row space-x-4 space-y-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                    <div className="flex justify-between mb-4">
                        <button
                            onClick={() => handleMonthChange('prev')}
                            className="p-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300"
                        >
                            <IconChevronLeft size={24} />
                        </button>
                        <span>
                            {currentMonth.toLocaleString('ru', { month: 'long', year: 'numeric' })}
                        </span>
                        <button
                            onClick={() => handleMonthChange('next')}
                            className="p-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300"
                        >
                            <IconChevronRight size={24} />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                            <div key={day} className="text-center">{day}</div>
                        ))}
                        {generateCalendar().map((day, index) => (
                            <div
                                key={index}
                                className={`rounded-lg border-2 text-lg hover:bg-slate-100 transition-colors ${selectedDate && day === selectedDate.getDate() && selectedDate.getMonth() === currentMonth.getMonth() && selectedDate.getFullYear() === currentMonth.getFullYear() ? 'border-blue-500' : 'border-transparent'} text-center p-2 cursor-pointer ${day === new Date().getDate() && 'bg-gray-200'} ${day && getEventsForDay(day).length > 0 ? 'text-orange-600' : ''
                                    }`}
                                onClick={() => day && handleDateClick(day)}
                            >
                                {day || ''}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    {selectedDate ? (
                        <div>
                            <h3 className="text-lg font-semibold">{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric', day: 'numeric' })}</h3>
                            <ul className="mt-4">
                                {eventsForSelectedDay.length === 0 ? (
                                    <li>В этот день нет мероприятий</li>
                                ) : (
                                    eventsForSelectedDay.map((event) => (
                                        <li key={event.link} className="mb-2">
                                            <a href={event.link} className="text-blue-500">
                                                {event.title}
                                            </a>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
