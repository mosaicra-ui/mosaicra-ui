import React, { useEffect, useState } from "react";
import { FiArrowRight, FiBarChart2, FiChevronDown, FiHome, FiPieChart } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useThemeSwitcher from "@/components/Hooks/useThemeSwitcher";
import SERVERX_LOGO from '../../../public/packages/svgs/server-x.svg';
import { SunIcon, MoonIcon } from "@/components/Utils/Icons/Icons";
import Dropdown from '@/components/Dropdown/Dropdown'

const NavLink = ({ href, title, className = "" }) => {
    const router = useRouter();
    return (
        <li className="text-md font-medium">
            <Link href={href} className={`${className} relative group rounded-full`}>
                <div>
                    <span
                        className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-all duration-300 ease-in-out hover:text-primary hover:dark:text-primary hover:bg-light-secondary hover:dark:bg-neutral-800 text-dark dark:text-light  ${router.asPath === href ? "text-primary dark:text-primary bg-light-secondary dark:bg-neutral-800" : ""}`}
                    >{title}</span>
                </div>
            </Link>
        </li>
    );
};

const DropNavLink = ({ title, className = "" }) => {
    const [isHovered, setIsHovered] = useState(false);

    const toggleHover = () => {
        setIsHovered(!isHovered);
    };

    return (
        <div className={`${className} relative group text-md cursor-pointer`} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <div>
                <span className='flex items-center justify-center hover:text-primary-light transition-all duration-200 ease-linear'>
                    {title}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isHovered ? "#ff3f63" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition-transform transform ${isHovered ? 'rotate-180' : ''}`} aria-hidden="true">
                        <path d="m6 9 6 6 6-6"></path>
                    </svg>
                </span>
            </div>
        </div>
    );
};

const MobileNavLink = ({ href, title, className = "" }) => {
    const router = useRouter();
    return (
        <Link href={href} className={`${className} relative group inline-block text-3xl`}>
            <div>
                {title}
                <span
                    className={`h-[2px] inline-block bg-dark/85 dark:bg-light absolute group-hover:left-0 right-0 top-8 -bottom-0.5 
                    group-hover:w-full transition-[width] ease duration-300 rounded-full
                    ${router.asPath === href ? "w-full" : "w-0"}`}
                ></span>
            </div>
        </Link>
    );
};

const Tabs = () => {
    const [selected, setSelected] = useState(null);
    const [dir, setDir] = useState(null);

    const handleSetSelected = (val) => {
        setDir(typeof selected === "number" && typeof val === "number" ? (selected > val ? "r" : "l") : null);
        setSelected(val);
    };

    return (
        <div onMouseLeave={() => handleSetSelected(null)} className="relative flex h-fit gap-2">
            {TABS.map((t) => (
                <Tab key={t.id} selected={selected} handleSetSelected={handleSetSelected} tab={t.id}>
                    {t.title}
                </Tab>
            ))}
            <AnimatePresence>{selected && <Content dir={dir} selected={selected} />}</AnimatePresence>
        </div>
    );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => (
    <button
        id={`shift-tab-${tab}`}
        onMouseEnter={() => handleSetSelected(tab)}
        onClick={() => handleSetSelected(tab)}
        className={`flex items-center gap-1 rounded-full px-2 pl-3 py-1.5 text-sm transition-colors font-semibold  ${selected === tab ? "bg-light-secondary dark:bg-neutral-800 text-primary" : "text-dark dark:text-light"}`}
    >
        <span>{children}</span>
        <FiChevronDown className={`transition-transform ease-in-out ${selected === tab ? "rotate-180" : ""}`} />
    </button>
);

const Content = ({ selected, dir }) => (
    <motion.div
        id="overlay-content"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        layout
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`absolute left-0 top-[calc(100%_+_24px)] rounded-xl border border-light-secondary dark:border-dark-secondary bg-light dark:bg-dark shadow-lg`}
    >
        <Bridge />
        {/* <Nub selected={selected} /> */}
        {TABS.map((t) => (
            <div className="overflow-hidden w-full" key={t.id}>
                {selected === t.id && (
                    <motion.div
                        initial={{ opacity: 0, x: dir === "l" ? 100 : dir === "r" ? -100 : 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        layout
                    >
                        <t.Component />
                    </motion.div>
                )}
            </div>
        ))}
    </motion.div>
);

const Bridge = () => <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />;

const Nub = ({ selected }) => {
    const [left, setLeft] = useState(0);

    useEffect(() => {
        if (selected) {
            const hoveredTab = document.getElementById(`shift-tab-${selected}`);
            const overlayContent = document.getElementById("overlay-content");
            if (hoveredTab && overlayContent) {
                const tabRect = hoveredTab.getBoundingClientRect();
                const { left: contentLeft } = overlayContent.getBoundingClientRect();
                setLeft(tabRect.left + tabRect.width / 2 - contentLeft);
            }
        }
    }, [selected]);

    return <motion.span style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)" }} animate={{ left }} transition={{ duration: 0.25, ease: "easeInOut" }} className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900" />;
};

const Products = () => (
    <div className="flex  flex-row xl:flex-col">
        <div className="flex p-8 px-4 items-center justify-start gap-4">
            <div className=" xl:mt-0 w-[20rem]">
                <div className="flex flex-col items-center gap-6">
                    <li>
                        <Link
                            className="flex group items-center gap-2.5 text-light-light text-sm hover:text-dark transition-all duration-300 ease-in-out hover:dark:text-light focus-visible:text-dark dark:focus-visible:text-light focus-visible:ring-2 focus-visible:outline-none focus-visible:rounded focus-visible:ring-light-lighter"
                            href="/"
                        >
                            <div className="relative rounded-lg bg-light-secondary/40 dark:bg-dark-secondary/40 p-2" style={{ width: '38px', height: '38px' }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    color="currentColor"
                                    fill="none"
                                    stroke="currentColor"
                                    className=" stroke-dark/70 dark:stroke-light/70 group-hover:stroke-foreground-title group-hover:dark:stroke-light"
                                    width="100%"
                                    height="100%"
                                    strokeWidth="1.2"
                                >
                                    <path
                                        d="M4.20351 9.85778H11.7038M4.20351 7.35767H11.7038M4.20351 12.3579H9.20372M14.2498 5.00126V13C14.2498 14.3807 13.1305 15.5001 11.7497 15.5001H4.2499C2.86913 15.5001 1.74979 14.3807 1.74979 13V3.00018C1.74979 1.61941 2.86912 0.500076 4.24989 0.500076H9.72709L14.2498 5.00126ZM14.2058 4.98025L9.72549 0.500076L9.72526 3.73011C9.72522 4.42053 10.2849 4.98025 10.9753 4.98025L14.2058 4.98025Z"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="flex gap-2 items-center text-dark/80 dark:text-light/80 group-hover:text-dark dark:group-hover:text-light font-[550] text-sm">Mosaicra UI
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="sbui-icon w-3 -ml-1 transition-all will-change-transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                    >
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>

                                </span>
                                <span className="text-sm text-foreground group-hover:text-dark/90 dark:text-foreground group-hover:dark:text-light/50 block xl:hidden">Awesome Animated Components</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="flex group items-center gap-2.5 text-light-light text-sm hover:text-dark transition-all duration-300 ease-in-out hover:dark:text-light focus-visible:text-dark dark:focus-visible:text-light focus-visible:ring-2 focus-visible:outline-none focus-visible:rounded focus-visible:ring-light-lighter"
                            href="/docs"
                        >
                            <div className="relative rounded-lg bg-light-secondary/40 dark:bg-dark-secondary/40 p-2" style={{ width: '38px', height: '38px' }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    color="currentColor"
                                    fill="none"
                                    stroke="currentColor"
                                    className=" stroke-dark/70 dark:stroke-light/70 group-hover:stroke-foreground-title group-hover:dark:stroke-light"
                                    width="100%"
                                    height="100%"
                                    strokeWidth="1.2"
                                >
                                    <path
                                        d="M4.20351 9.85778H11.7038M4.20351 7.35767H11.7038M4.20351 12.3579H9.20372M14.2498 5.00126V13C14.2498 14.3807 13.1305 15.5001 11.7497 15.5001H4.2499C2.86913 15.5001 1.74979 14.3807 1.74979 13V3.00018C1.74979 1.61941 2.86912 0.500076 4.24989 0.500076H9.72709L14.2498 5.00126ZM14.2058 4.98025L9.72549 0.500076L9.72526 3.73011C9.72522 4.42053 10.2849 4.98025 10.9753 4.98025L14.2058 4.98025Z"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="flex gap-2 items-center text-dark/80 dark:text-light/80 group-hover:text-dark dark:group-hover:text-light font-[550] text-sm">Mosaicra UI
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="sbui-icon w-3 -ml-1 transition-all will-change-transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                    >
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>

                                </span>
                                <span className="text-sm text-foreground group-hover:text-dark/90 dark:text-foreground group-hover:dark:text-light/50 block xl:hidden">Awesome Animated Components</span>
                            </div>
                        </Link>
                    </li>
                </div>
            </div>
        </div>
        <div className="flex flex-col border-l xl:border-t p-8 border-light-secondary dark:border-dark-secondary w-[38rem] xl:w-[28rem]">
            <Link href="/products" className="group flex-shrink-0 text-xs uppercase font-code mb-4">
                <span className="flex gap-2 flex-shrink-0 text-xs uppercase font-code mb-4 text-dark/70 group-hover:text-dark dark:text-light/70 group-hover:dark:text-light">All Products
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="sbui-icon w-3 -ml-1 transition-all will-change-transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>

                </span>
            </Link>
            <Link href="/articles/dsa-mastery" className="group">
                <h3 className="font-semibold text-sm text-dark/80 dark:text-light/80 group-hover:text-dark group-hover:dark:text-light">DSA Mastery: The Ultimate Roadmap to learn Data Structures and Algorithms</h3>
                <span className="text-xs line-clamp-2 dark:text-dark-text text-light-text group-hover:text-dark/90 dark:group-hover:text-light/50">Data structures and algorithms form the backbone of computational science, serving as the cornerstone for organizing and manipulating data efficiently.</span>
            </Link>
        </div>
    </div>
);

const Developers = () => (
    <div className="flex  flex-row xl:flex-col">
        <div className="flex p-8 items-center justify-start gap-4">
            <div className="-mt-6 xl:mt-0">
                <div className="flex gap-2 flex-shrink-0 text-xs uppercase font-code mb-4 text-dark/70 group-hover:text-dark dark:text-light/70 group-hover:dark:text-light">Developers</div>
                <div className="flex items-center gap-4">


                    <li>
                        <Link
                            className="flex group items-center gap-2 text-light-light text-sm hover:text-dark hover:dark:text-light focus-visible:text-dark dark:focus-visible:text-light focus-visible:ring-2 focus-visible:outline-none focus-visible:rounded focus-visible:ring-light-lighter"
                            href="/docs"
                        >
                            <div className="relative " style={{ width: '16px', height: '16px' }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    color="currentColor"
                                    fill="none"
                                    stroke="currentColor"
                                    className="sbui-icon"
                                    width="100%"
                                    height="100%"
                                    strokeWidth="1.2"
                                >
                                    <path
                                        d="M4.20351 9.85778H11.7038M4.20351 7.35767H11.7038M4.20351 12.3579H9.20372M14.2498 5.00126V13C14.2498 14.3807 13.1305 15.5001 11.7497 15.5001H4.2499C2.86913 15.5001 1.74979 14.3807 1.74979 13V3.00018C1.74979 1.61941 2.86912 0.500076 4.24989 0.500076H9.72709L14.2498 5.00126ZM14.2058 4.98025L9.72549 0.500076L9.72526 3.73011C9.72522 4.42053 10.2849 4.98025 10.9753 4.98025L14.2058 4.98025Z"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                            <span className="">Documentation</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="sbui-icon w-3 -ml-1 transition-all will-change-transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            >
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </Link>
                    </li>
                </div>
            </div>
            <div className="-mt-6 xl:mt-0">
                <div className="flex gap-2 flex-shrink-0 text-xs uppercase font-code mb-4 text-dark/70 group-hover:text-dark dark:text-light/70 group-hover:dark:text-light">Resources</div>
                <div className="flex items-center gap-4">
                    <li>
                        <Link
                            className="flex group items-center gap-2 text-light-light text-sm hover:text-dark hover:dark:text-light focus-visible:text-dark dark:focus-visible:text-light focus-visible:ring-2 focus-visible:outline-none focus-visible:rounded focus-visible:ring-light-lighter"
                            href="/docs"
                        >
                            <div className="relative " style={{ width: '16px', height: '16px' }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    color="currentColor"
                                    fill="none"
                                    stroke="currentColor"
                                    className="sbui-icon"
                                    width="100%"
                                    height="100%"
                                    strokeWidth="1.2"
                                >
                                    <path
                                        d="M4.20351 9.85778H11.7038M4.20351 7.35767H11.7038M4.20351 12.3579H9.20372M14.2498 5.00126V13C14.2498 14.3807 13.1305 15.5001 11.7497 15.5001H4.2499C2.86913 15.5001 1.74979 14.3807 1.74979 13V3.00018C1.74979 1.61941 2.86912 0.500076 4.24989 0.500076H9.72709L14.2498 5.00126ZM14.2058 4.98025L9.72549 0.500076L9.72526 3.73011C9.72522 4.42053 10.2849 4.98025 10.9753 4.98025L14.2058 4.98025Z"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                            <span className="">Documentation</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="sbui-icon w-3 -ml-1 transition-all will-change-transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            >
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </Link>
                    </li>
                </div>
            </div>
        </div>
        <div className="flex flex-col border-l xl:border-t p-8 border-light-secondary dark:border-dark-secondary w-[38rem] xl:w-[28rem]">
            <div className="flex gap-2 flex-shrink-0 text-xs uppercase font-code mb-4 text-dark/70 group-hover:text-dark dark:text-light/70 group-hover:dark:text-light">Developer Blog</div>
            <Link href="/articles/dsa-mastery" className="group">
                <h3 className="font-semibold text-sm text-dark/80 group-hover:text-dark">DSA Mastery: The Ultimate Roadmap to learn Data Structures and Algorithms</h3>
                <span className="text-xs line-clamp-2 text-dark-text group-hover:text-dark/90">Data structures and algorithms form the backbone of computational science, serving as the cornerstone for organizing and manipulating data efficiently.</span>
            </Link>
        </div>
    </div>
);

const Blog = () => (
    <div>
        <div className="grid grid-cols-2 gap-2">
            {["4", "5"].map((img) => (
                <Link key={img} href="#">
                    <Image className="mb-2 h-14 w-full rounded object-cover" src={`/imgs/blog/${img}.png`} alt="Placeholder" />
                    <h4 className="mb-0.5 text-sm font-medium">Lorem ipsum dolor</h4>
                    <p className="text-xs text-neutral-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo quidem eos.</p>
                </Link>
            ))}
        </div>
        <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
            <span>View more</span>
            <FiArrowRight />
        </button>
    </div>
);

const TABS = [
    { title: "Products", Component: Products },
    { title: "Developers", Component: Developers },
    // { title: "Blog", Component: Blog },
].map((n, idx) => ({ ...n, id: idx + 1 }));

const MosaicraUiNavbar = () => {
    const [mode, setMode] = useThemeSwitcher();
    const [burgerMenuActive, setBurgerActive] = useState(false);

    const toggleBurgerMenu = () => {
        setBurgerActive(!burgerMenuActive);
    };

    const motionVariants = {
        open: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                ease: "easeOut",
                type: "spring",
            },
        },
        closed: {
            opacity: 0,
            transition: {
                staggerChildren: 0,
                duration: 0,
            },
        },
    };

    const listItemVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.45,
                ease: "easeOut",
            },
        },
        closed: {
            y: 100,
            opacity: 0,
            transition: {
                duration: 0,
            },
        },
    };

    return (

        <>
            <div className="sticky top-0 z-40 transform" style={{ transform: 'translate3d(0,0,999px)' }}>
                <div className="absolute inset-0 h-full w-full bg-light dark:bg-dark transition-all duration-300 ease-in-out"></div>
                <nav className="relative z-40 border-light-secondary dark:border-dark-secondary border-b backdrop-blur-sm transition-all duration-300 ease-in-out">
                    <div className="relative flex justify-between h-16 mx-auto container lg:!px-6 xl:px-20 px-20">
                        <div className="flex items-center lg:px-0 flex-1 sm:items-stretch justify-between">
                            <div className="flex items-center">
                                <div className="flex items-center flex-shrink-0">
                                    <span className="flex items-center justify-center gap-2 w-auto h-6 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-gray-600 focus-visible:ring-offset-4 focus-visible:ring-offset-background-alternative focus-visible:rounded-sm" type="button" id="radix-:R1amcq6:" aria-haspopup="menu" aria-expanded="false" data-state="closed">
                                        <Link href={`/`} target="blank">
                                            <Image
                                                src={SERVERX_LOGO}
                                                placeholder='blur'
                                                blurDataURL={`${SERVERX_LOGO}`}
                                                width={`40px`}
                                                height={`40px`}
                                                className='w-8 h-8'
                                                alt="mosaicra-logo"
                                            />
                                        </Link>
                                        <Link href="/" passHref className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary-light font-bold uppercase">Mosaicra UI</Link>
                                    </span>
                                </div>
                                <nav aria-label="Main" data-orientation="horizontal" dir="ltr" className="relative z-10 flex-1 items-center justify-center flex pl-8 sm:space-x-4 lg:hidden h-16">
                                    <div style={{ position: 'relative' }}>
                                        <ul data-orientation="horizontal" className="flex flex-1 list-none items-center justify-center space-x-1" dir="ltr">
                                            <Tabs />
                                            {/* <NavLink href={`/pricing`} title={`Pricing`} /> */}
                                            <NavLink href={`/docs`} title={`Docs`} />
                                            <NavLink href={`/articles`} title={`Articles`} />
                                        </ul>
                                    </div>
                                    <div className="absolute left-0 top-full flex justify-center"></div>
                                </nav>
                            </div>
                            <div className="flex items-center gap-2 opacity-100 animate-fade-in !scale-100 delay-300">
                                <div className='text-sm'>
                                    <button
                                        onClick={() => setMode(mode === "light" ? "dark" : "light")}
                                        className={`w-5  py-0.5 mx-0 flex items-center justify-center rounded-full p-[0.2rem] ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"}`}
                                        aria-label="theme-switcher"
                                    >
                                        {
                                            mode === "dark"
                                                ? <SunIcon className={"fill-dark"} />
                                                : <MoonIcon className={"fill-dark"} />
                                        }
                                    </button>
                                </div>

                                <Link href="https://github.com/serverx-org/server-x-101" target="_blank" rel="noopener noreferrer" data-size="tiny" className="relative justify-center cursor-pointer items-center space-x-2 text-center rounded-md outline-none outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border hover:bg-codeBg-light hover:dark:bg-codeBg-dark shadow-none focus-visible:outline-bord-dark data-[state=open]:bg-codeBg-dark border-transparent text-xs px-2.5 py-1 pr-3.5 h-[26px] flex group lg:hidden text-dark-primary dark:text-light-primary hover:text-dark hover:dark:text-light">
                                    <span className="truncate">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-6 h-6" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.5 2.22168C5.23312 2.22168 2.58496 4.87398 2.58496 8.14677C2.58496 10.7642 4.27962 12.9853 6.63026 13.7684C6.92601 13.8228 7.03366 13.6401 7.03366 13.4827C7.03366 13.3425 7.02893 12.9693 7.02597 12.4754C5.38041 12.8333 5.0332 11.681 5.0332 11.681C4.76465 10.996 4.37663 10.8139 4.37663 10.8139C3.83954 10.4471 4.41744 10.4542 4.41744 10.4542C5.01072 10.4956 5.32303 11.0647 5.32303 11.0647C5.85065 11.9697 6.70774 11.7082 7.04431 11.5568C7.09873 11.1741 7.25134 10.9132 7.42051 10.7654C6.10737 10.6157 4.72621 10.107 4.72621 7.83683C4.72621 7.19031 4.95689 6.66092 5.33486 6.24686C5.27394 6.09721 5.07105 5.49447 5.39283 4.67938C5.39283 4.67938 5.88969 4.51967 7.01947 5.28626C7.502 5.15466 7.99985 5.08763 8.5 5.08692C9.00278 5.08929 9.50851 5.15495 9.98113 5.28626C11.1103 4.51967 11.606 4.67879 11.606 4.67879C11.9289 5.49447 11.7255 6.09721 11.6651 6.24686C12.0437 6.66092 12.2732 7.19031 12.2732 7.83683C12.2732 10.1129 10.8897 10.6139 9.5724 10.7606C9.78475 10.9434 9.97344 11.3048 9.97344 11.8579C9.97344 12.6493 9.96634 13.2887 9.96634 13.4827C9.96634 13.6413 10.0728 13.8258 10.3733 13.7678C11.5512 13.3728 12.5751 12.6175 13.3003 11.6089C14.0256 10.6002 14.4155 9.38912 14.415 8.14677C14.415 4.87398 11.7663 2.22168 8.5 2.22168Z" fill="currentColor"></path>
                                            </svg>
                                            <span className="mt-[1px]">Github</span>
                                        </span>
                                    </span>
                                </Link>
                                <Link href="/" target="blank" passHref>
                                    <span data-size="tiny" type="button" className="relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-primary/50 dark:bg-primary/80 hover:bg-primary-light/80 dark:hover:bg-primary-light/50 text-dark dark:text-light border-primary-light/75 dark:border-primary-light/30 hover:border-primary dark:hover:border-primary-light focus-visible:outline-primary data-[state=open]:bg-primary-light dark:data-[state=open]:bg-primary-light data-[state=open]:outline-primary text-xs px-2.5 py-1 h-[26px] block lg:hidden">
                                        <span className="truncate">serverx.org.in</span>
                                    </span>
                                </Link>
                                <Link href="https://serverx.org.in/dashboard" passHref>
                                    <span data-size="tiny" type="button" className="relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-primary/50 dark:bg-primary/80 hover:bg-primary-light/80 dark:hover:bg-primary-light/50 text-dark dark:text-light border-primary-light/75 dark:border-primary-light/30 hover:border-primary dark:hover:border-primary-light focus-visible:outline-primary data-[state=open]:bg-primary-light dark:data-[state=open]:bg-primary-light data-[state=open]:outline-primary text-xs px-2.5 py-1 h-[26px] block lg:hidden">
                                        <span className="truncate">Sign in</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="inset-y-0 hidden -mr-4 items-center px-4 lg:flex">
                            <button className="text-light focus:ring-brand bg-background hover:bg-surface-100 inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset" aria-expanded="false" onClick={toggleBurgerMenu}>
                                <span className="sr-only">Open main menu</span>
                                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                                <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                    </div>
                </nav>
                <nav className='w-full items-center justify-between relative border-b border-dark/45 hidden lg:flex'>
                    <div className={`${burgerMenuActive ? "h-screen block" : "h-0 hidden"} z-50 h-16 px-44 mx-auto lg:px-16 xl:px-20 md:px-6  w-full absolute top-0 transition-all duration-500 bg-light dark:bg-dark`}>

                        <div className="absolute top-1/4">
                            <motion.ul
                                initial="closed"
                                animate={burgerMenuActive ? "open" : "closed"}
                                variants={motionVariants}
                                className={`list-none text-start ${burgerMenuActive ? 'block' : 'hidden'}`}
                            >
                                <motion.li variants={listItemVariants} className="py-4" onClick={toggleBurgerMenu}>
                                    <MobileNavLink href="/products" title="Products" className="" />
                                </motion.li>
                                <motion.li variants={listItemVariants} className="py-4" onClick={toggleBurgerMenu}>
                                    <MobileNavLink href="/developers" title="Developers" className="" />
                                </motion.li>
                                <motion.li variants={listItemVariants} className="py-4" onClick={toggleBurgerMenu}>
                                    <MobileNavLink href="/docs" title="Docs" className="" />
                                </motion.li>
                                <motion.li variants={listItemVariants} className="py-4" onClick={toggleBurgerMenu}>
                                    <MobileNavLink href="/articles" title="Articles" className="" />
                                </motion.li>
                                <motion.li variants={listItemVariants} onClick={toggleBurgerMenu} className='flex flex-col gap-2 items-center justify-center pr-8 mt-20'>
                                    <Link data-size="tiny" type="button" className="relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-light dark:text-light hover:text-light dark:hover:text-light bg-[#d73553] hover:bg-primary-light dark:hover:bg-primary-light border-light-secondary dark:border-dark-secondary focus-visible:outline-light shadow-sm text-xs px-2.5 py-1 h-[26px] lg:block" href="/dashboard">
                                        <span className="truncate">Sign in</span>
                                    </Link>
                                    <div className='flex items-center'>
                                        <Link href="https://github.com/serverx-org/server-x-101" target="_blank" data-size="tiny" className="relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border hover:bg-gray-300 dark:hover:bg-gray-300/15 shadow-none border-transparent text-xs pr-1 h-[26px] group lg:flex text-foreground dark:text-light hover:text-foreground dark:hover:text-light mr-1.5">
                                            <span className="truncate">
                                                <span className="flex items-center gap-0.5">
                                                    <svg className="w-6 h-6" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.5 2.22168C5.23312 2.22168 2.58496 4.87398 2.58496 8.14677C2.58496 10.7642 4.27962 12.9853 6.63026 13.7684C6.92601 13.8228 7.03366 13.6401 7.03366 13.4827C7.03366 13.3425 7.02893 12.9693 7.02597 12.4754C5.38041 12.8333 5.0332 11.681 5.0332 11.681C4.76465 10.996 4.37663 10.8139 4.37663 10.8139C3.83954 10.4471 4.41744 10.4542 4.41744 10.4542C5.01072 10.4956 5.32303 11.0647 5.32303 11.0647C5.85065 11.9697 6.70774 11.7082 7.04431 11.5568C7.09873 11.1741 7.25134 10.9132 7.42051 10.7654C6.10737 10.6157 4.72621 10.107 4.72621 7.83683C4.72621 7.19031 4.95689 6.66092 5.33486 6.24686C5.27394 6.09721 5.07105 5.49447 5.39283 4.67938C5.39283 4.67938 5.88969 4.51967 7.01947 5.28626C7.502 5.15466 7.99985 5.08763 8.5 5.08692C9.00278 5.08929 9.50851 5.15495 9.98113 5.28626C11.1103 4.51967 11.606 4.67879 11.606 4.67879C11.9289 5.49447 11.7255 6.09721 11.6651 6.24686C12.0437 6.66092 12.2732 7.19031 12.2732 7.83683C12.2732 10.1129 10.8897 10.6139 9.5724 10.7606C9.78475 10.9434 9.97344 11.3048 9.97344 11.8579C9.97344 12.6493 9.96634 13.2887 9.96634 13.4827C9.96634 13.6413 10.0728 13.8258 10.3733 13.7678C11.5512 13.3728 12.5751 12.6175 13.3003 11.6089C14.0256 10.6002 14.4155 9.38912 14.415 8.14677C14.415 4.87398 11.7663 2.22168 8.5 2.22168Z" fill="currentColor"></path>
                                                    </svg>
                                                    <span>
                                                        github
                                                    </span>

                                                </span>
                                            </span>
                                        </Link>

                                        <div className='text-sm flex border border-dark dark:border-light rounded-full'>
                                            <button
                                                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                                                className={`w-5 pl-1 py-0.5 mr-2 sm:mx-1 flex items-center justify-center rounded-full p-[0.2rem] ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"}`}
                                                aria-label="theme-switcher"
                                            >
                                                {
                                                    mode === "dark"
                                                        ? <MoonIcon className={"fill-dark"} />
                                                        : <MoonIcon className={"fill-dark"} />
                                                }
                                            </button>
                                            <button
                                                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                                                className={`w-5 pl-1 py-0.5 mr-2 sm:mx-1 flex items-center justify-center rounded-full p-[0.2rem] ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"}`}
                                                aria-label="theme-switcher"
                                            >
                                                {
                                                    mode === "dark"
                                                        ? <SunIcon className={"fill-dark"} />
                                                        : <SunIcon className={"fill-dark"} />
                                                }
                                            </button>
                                            <button
                                                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                                                className={`w-5 pl-1 py-0.5 sm:mx-1 flex items-center justify-center rounded-full p-[0.2rem] ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"}`}
                                                aria-label="theme-switcher"
                                            >
                                                {
                                                    mode === "dark"
                                                        ? <SunIcon className={"fill-dark"} />
                                                        : <MoonIcon className={"fill-dark"} />
                                                }
                                            </button>
                                        </div>


                                    </div>
                                </motion.li>
                            </motion.ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default MosaicraUiNavbar