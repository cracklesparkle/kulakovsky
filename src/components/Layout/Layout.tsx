import { ptSans } from "@/pages/_app";
import { IconActivityHeartbeat, IconAddressBook, IconAffiliate, IconBrandTelegram, IconBrandVk, IconBrandYandex, IconBrush, IconCalendar, IconHome, IconInfoCircle, IconMenu2, IconNews, IconSocial } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, ReactNode } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const navLinks = [
    {
        title: 'Главная',
        link: '/',
        icon: <IconHome />,
    },
    {
        title: 'Kulakovsky.',
        colored: 'LIVE',
        color: '#b91c1c',
        link: '/live',
        icon: <IconActivityHeartbeat />,
    },
    {
        title: 'Kulakovsky.',
        colored: 'ART',
        color: '#a16207',
        link: '/art',
        icon: <IconBrush />,
    },
    {
        title: 'Kulakovsky.',
        colored: 'UNITY',
        color: '#1d4ed8',
        link: '/unity',
        icon: <IconAffiliate />,
    },
    {
        title: 'Новости',
        link: '/news',
        icon: <IconNews />,
    },
    {
        title: 'Социальные сети',
        link: '/socials',
        icon: <IconSocial />,
    },
    {
        title: 'Контакты',
        link: '/contact',
        icon: <IconAddressBook />,
    },
    {
        title: 'Календарь событий',
        link: '/events',
        icon: <IconCalendar />,
    },
    {
        title: 'О проекте',
        link: '/about',
        icon: <IconInfoCircle />,
    },
]

const NavLink = ({ title, href, icon, colored, color }: { title: string; href: string, icon: ReactNode, colored?: string, color?: string }) => {
    const [hover, setHover] = useState(false)

    return (
        <Link
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            href={href}
            className={`relative py-2  transition-colors cursor-pointer font-semibold`}
        >
            <div className={`relative w-fit flex space-x-2 ${hover ? 'after:w-full' : 'after:w-0'} after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:bg-orange-700 after:transition-all after:duration-300`}>
                {icon}
                <span>
                    <span className={`${hover ? 'text-orange-700' : 'text-orange-950'}`}>{title}</span>
                    {colored && color &&
                        <span style={{ color: color }}>{colored}</span>
                    }
                </span>
            </div>
        </Link>
    )
}

export default function Layout({ children }: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isSidebarOpen]);


    return (
        <div className={`${ptSans.className} flex flex-col min-h-screen`}>
            {/* Sidebar */}
            <div className="flex flex-grow">
                <aside ref={sidebarRef} className={`z-50 flex-shrink-0 fixed space-y-4 inset-y-0 left-0 w-64 bg-gray-100 p-4 transition-transform lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex w-full justify-between">
                        <Link href={'/'} className="flex justify-start h-16 w-32">
                            <Image alt="logo" className="w-auto h-auto object-scale-down" width={160} height={60} src={`/logo-black.png`} />
                        </Link>

                        <button className="absolute top-4 right-4 lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                            <IconMenu2 className="text-orange-950" />
                        </button>
                    </div>

                    <nav>
                        <ul className="flex flex-col">
                            {navLinks.map((navLink, index) => (
                                <NavLink key={index} title={navLink.title} href={navLink.link} icon={navLink.icon} colored={navLink?.colored} color={navLink?.color} />
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="flex flex-col w-full">
                    <header className="flex flex-row space-x-4 align-middle w-full border-b border-b-slate-300 p-4 lg:hidden">
                        <button className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                            <IconMenu2 />
                        </button>

                        <div className="flex w-full">
                            <Link href={'/'} className="flex justify-start h-10 w-32">
                                <Image alt="logo" className="w-auto h-auto object-scale-down" width={160} height={60} src={`/logo-black.png`} />
                            </Link>
                        </div>
                    </header>

                    <main className="flex flex-grow w-full mb-32">
                        {children}
                    </main>
                </div>
            </div>

            <div className="flex p-8 bg-slate-800 justify-between">
                <div className="flex justify-center flex-col font-medium text-slate-400">
                    <h4>© 2025 Полёт Өксөкү. <br /> Все права защищены.</h4>
                </div>

                <div className="flex p-4 justify-center space-x-4">
                    <Link href={'https://t.me/'} className="bg-slate-700 overflow-hidden rounded-md p-2 hover:bg-slate-500 transition-colors active:bg-slate-600">
                        <IconBrandTelegram color="white" stroke={1} />
                    </Link>

                    <Link href={'https://t.me/'} className="bg-slate-700 overflow-hidden rounded-md p-2 hover:bg-slate-500 transition-colors active:bg-slate-600">
                        <IconBrandVk color="white" stroke={1} />
                    </Link>

                    <Link href={'https://t.me/'} className="bg-slate-700 overflow-hidden rounded-md p-2 hover:bg-slate-500 transition-colors active:bg-slate-600">
                        <IconBrandYandex color="white" stroke={1} />
                    </Link>
                </div>
            </div>
        </div>
    );
}