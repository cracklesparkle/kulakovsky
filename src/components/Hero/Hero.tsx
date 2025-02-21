import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import styles from '@/components/Hero/Hero.module.scss'

const heroData = [
    { link: '/kbuild/about', image: '/kulakovsky.png', title: 'Проект по популяризации творчества А.Е. Кулаковского среди молодежи' },
    { link: '/kbuild/link2', image: '/kulakovsky.jpg', title: 'Запуск нового проекта' },
    { link: '/kbuild/link3', image: '/kulakovsky-1.jpg', title: 'Фестиваль национальных культур' },
    // Add more items as needed
]

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(100)
        }, 10000); // Increment progress every 50ms to achieve 5 seconds (100% in 5000ms)

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            setAnimate(false)
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
            setProgress(0)
        } else if (progress === 0) {
            setAnimate(true)
        }
    }, [progress])

    return (
        <div className="relative w-full h-96 overflow-hidden">
            <div className="overflow-hidden absolute top-0 left-0 right-0 bottom-0 -z-10 h-full w-full bg-slate-950">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                </div>
                <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#020617)]">
                </div>
            </div>

            {/* Container for the hero images */}
            <div
                className="absolute top-0 left-0 right-0 bottom-0 flex transition-transform duration-1000"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`, // Slide effect
                }}
            >
                {heroData.map((item, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        <Image
                            className="object-cover w-full h-full max-h-96"
                            alt={item.title}
                            src={item.image}
                            width={3000}
                            height={2132}
                        />
                    </div>
                ))}
            </div>

            {/* Content inside hero */}
            <div className="absolute top-0 left-0 right-0 bottom-0 flex-grow flex justify-center bg-gradient-to-t from-black to-transparent">
                <div className="lg:w-3/4 space-y-4 w-full h-auto mt-auto flex flex-col px-4 py-10">
                    <h4 className="md:text-3xl text-xl font-bold text-white lg:w-1/2">
                        {heroData[currentIndex].title}
                    </h4>
                    <Link href={heroData[currentIndex].link} className="text-white font-bold border hover:border-transparent active:bg-orange-800 rounded-md py-2 px-4 w-fit hover:bg-orange-700 transition-colors">
                        Подробнее
                    </Link>
                </div>
            </div>

            <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gray-400 ${animate? styles.animate_progress : ''}`}
            />
        </div>
    );
}

export default Hero