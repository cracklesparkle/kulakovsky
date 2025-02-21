import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useRef, useState } from "react";
import Link from "next/link";
import Calendar from "@/components/Events/Calendar";
import Hero from "@/components/Hero/Hero";

const newsData = [
  {
    title: 'Прошел творческий конкурс',
    description: 'Лучшие работы были награждены на фестивале',
    link: '',
    thumb: '/news1.jpg'
  },
  {
    title: 'Запуск нового проекта',
    description: 'Открытие образовательного интенсива',
    link: '',
    thumb: '/news2.jpg'
  },
  {
    title: 'Фестиваль национальных культур',
    description: 'Молодежь представила традиции и обычаи',
    link: '',
    thumb: '/news3.jpg'
  },
  {
    title: 'Новый курс по видеомонтажу',
    description: 'Старт бесплатных мастер-классов',
    link: '',
    thumb: '/news4.jpg'
  },
  {
    title: 'Прошел творческий конкурс',
    description: 'Лучшие работы были награждены на фестивале',
    link: '',
    thumb: '/news1.jpg'
  },
  {
    title: 'Запуск нового проекта',
    description: 'Открытие образовательного интенсива',
    link: '',
    thumb: '/news2.jpg'
  },
  {
    title: 'Фестиваль национальных культур',
    description: 'Молодежь представила традиции и обычаи',
    link: '',
    thumb: '/news3.jpg'
  },
  {
    title: 'Новый курс по видеомонтажу',
    description: 'Старт бесплатных мастер-классов',
    link: '',
    thumb: '/news4.jpg'
  },
  {
    title: 'Фестиваль национальных культур',
    description: 'Молодежь представила традиции и обычаи',
    link: '',
    thumb: '/news3.jpg'
  },
  {
    title: 'Новый курс по видеомонтажу',
    description: 'Старт бесплатных мастер-классов',
    link: '',
    thumb: '/news4.jpg'
  },
]

const BlockNews = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0)
  const news = newsData
  const itemCount = 10
  const itemsPerView = 2
  const itemsPerViewLg = 4
  const gap = 16

  const getItemWidth = () => {
    if (!carouselRef.current) return 0;
    const item = carouselRef.current.querySelector(".carousel-item") as HTMLElement;
    return item ? item.offsetWidth + gap : 0;
  }

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    //const itemWidth = getItemWidth();
    const itemsPerRow = window.innerWidth >= 1024 ? itemsPerViewLg : itemsPerView;

    setIndex((prev) => {
      const newIndex = direction === "left" ? Math.max(prev - 1, 0) : Math.min(prev + 1, itemCount - itemsPerRow);
      return newIndex;
    });
  };


  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const [currentHover, setCurrentHover] = useState<number | null>(null)

  return (
    <div className="relative w-full flex flex-col space-y-4">

      <div className="flex space-x-2 z-10">
        <Link href={'/news'} className={`h-10 cursor-pointer font-bold text-2xl mr-auto relative w-fit hover:after:w-full after:w-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[4px] after:bg-orange-700 after:transition-all after:duration-300`}>Новости</Link>
        <button
          onClick={() => scroll("left")}
          className="p-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300"
        >
          <IconChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300"
        >
          <IconChevronRight size={24} />
        </button>
      </div>

      <div
        className="overflow-hidden"
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchMove={(e) => {
          if (!touchStartX) return;
          const touchEndX = e.touches[0].clientX;
          const diff = touchStartX - touchEndX;
          if (diff > 50) scroll("right");
          if (diff < -50) scroll("left");
          setTouchStartX(null);
        }}
      >
        <div
          ref={carouselRef}
          className="flex space-x-4 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${index * getItemWidth()}px)` }}
        >
          {news.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="select-none relative overflow-hidden hover:cursor-pointer h-56 carousel-item max-w-[calc(50%-0.5rem)] md:max-w-[calc(25%-0.75rem)] min-w-[calc(50%-0.5rem)] md:min-w-[calc(25%-0.75rem)] bg-orange-200 rounded-lg"
            >
              <div className="flex flex-col relative w-full h-full" onMouseOver={() => setCurrentHover(index)} onMouseLeave={() => setCurrentHover(null)}>
                <Image className="absolute inset-0 overflow-hidden object-cover w-full h-full" src={item.thumb} width={160} height={160} alt="thumb" />
                <div className={`absolute flex flex-col bottom-0 w-full bg-gradient-to-t from-black to-transparent ${currentHover === index ? 'h-full' : 'h-1/2'} transition-all duration-300 ease-in-out`}></div>
                <div className={`absolute flex flex-col inset-0 w-full h-full p-4`}>
                  <p className="text-left font-semibold mt-auto text-white">{item.title}</p>
                  <p className={`${currentHover === index ? 'max-h-full' : 'max-h-0'} transition-all duration-300 ease-in-out overflow-hidden font-light text-sm text-white`}>{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

// const BlockHero = () => {
//   return (
//     <div className="relative w-full h-auto rounded-xl">
//       <div className="overflow-hidden absolute inset-0 -z-10 h-full w-full bg-slate-950">
//         <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
//         </div>
//         <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#020617)]">
//         </div>
//       </div>

//       <Image className="object-scale-down w-full max-h-96" alt="kulakovsky" src={`/kulakovsky.png`} width={3000} height={2132} />

//       <div className="absolute inset-0 flex-grow flex justify-center">
//         <div className="lg:w-3/4 space-y-4 w-full h-full flex flex-col px-4 py-10">
//           <h4 className="md:text-3xl text-xl font-bold text-white mt-auto">
//             Проект по популяризации творчества <br /> А.Е. Кулаковского среди молодежи
//           </h4>
//           <Link href={'/about'} className="text-white font-bold border hover:border-transparent active:bg-orange-800 rounded-md py-2 px-4 w-fit hover:bg-orange-700 transition-colors">
//             Подробнее
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

export default function Home() {
  return (
    <div className={`flex flex-col w-full space-y-4`}>
      <Hero />

      <div className="flex flex-col w-full max-w-screen-lg mx-auto p-4 space-y-8">
        <BlockNews />

        <Calendar />
      </div>
    </div>
  );
}
