import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { motion } from "framer-motion";
import SERVERX_LOGO from '../../../public/packages/svgs/server-x.svg';
import { TwitterIcon, DiscordIcon, GithubIcon, YouTubeIcon } from "@/components/Utils/Icons/Icons";


const FooterLink = ({ href, title, onClick }) => (
    <li>
        <Link href={`/${href}`}>
            <div className="text-sm transition-colors text-foreground-light hover:text-dark dark:text-foreground dark:hover:text-light" onClick={onClick}>
                {title}
            </div>
        </Link>
    </li>
);

const Footer = () => {
    const [isScrolling, setIsScrolling] = useState(false);

    const scrollToTop = () => {
        setIsScrolling(false);

        const duration = 500; // Duration
        const start = window.pageYOffset;
        const startTime = performance.now();

        const scrollStep = (timestamp) => {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const scrollProgress = Math.min(1, elapsedTime / duration);
            const easeScrollProgress = scrollProgress;

            window.scrollTo(0, start * (1 - easeScrollProgress));

            if (elapsedTime < duration) {
                window.requestAnimationFrame(scrollStep);
            } else {
                setIsScrolling(false);
            }
        };

        window.requestAnimationFrame(scrollStep);
    };

    return (
        <main className=' bg-light dark:bg-footer transition-all duration-300 ease-in-out items-center justify-center flex pt-20'>
            <div className='container px-20 mx-auto lg:px-6 xl:px-20 md:px-16 sm:px-6'>
                <div className="relative h-[1px] mt-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-light-secondary dark:via-dark-secondary to-transparent"></div>
                </div>
                <div className=' relative py-24 sm:py-18 md:py-24 lg:py-24 flex items-start justify-between xl:block'>
                    <div className='space-y-8 xl:col-span-1 flex flex-col items-start mb-4'>
                        <Link
                            href="/"
                            className='font-bold text-3xl items-center flex uppercase gap-2'
                        >
                            <Image
                                src={SERVERX_LOGO}
                                placeholder='blur'
                                blurDataURL={`${SERVERX_LOGO}`}
                                width={`40px`}
                                height={`40px`}
                                className='w-10 h-10'
                                alt="serverx-logo"
                            />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary-light">server x</span>
                        </Link>
                        <div className="flex space-x-5 ">
                            <span className="text-foreground-light hover:text-dark dark:text-foreground dark:hover:text-light transition">
                                <span className="sr-only">Twitter</span>
                                <div className="relative w-5 h-5" >
                                    <motion.a href="https://twitter.com/server-x" target={"_blank"} className="bg-light rounded-full dark:bg-dark"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <TwitterIcon />
                                    </motion.a>
                                </div>
                            </span>
                            <span className="text-foreground-light hover:text-dark dark:text-foreground dark:hover:text-light transition">
                                <span className="sr-only">GitHub</span>
                                <div className="relative w-5 h-5" >
                                    <motion.a href="https://github.com/serverx-org" target={"_blank"} className="bg-light rounded-full dark:bg-dark"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <GithubIcon />
                                    </motion.a>
                                </div>
                            </span>
                            <span className="text-foreground-light hover:text-dark dark:text-foreground dark:hover:text-light transition">
                                <span className="sr-only">Discord</span>
                                <div className="relative w-5 h-5" >
                                    <motion.a href="https://discord.server-x" target={"_blank"} className="bg-light rounded-full dark:bg-dark"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <DiscordIcon />
                                    </motion.a>
                                </div>
                            </span>
                            <span
                                className="text-foreground-light hover:text-dark dark:text-foreground dark:hover:text-light transition">
                                <span className="sr-only">Youtube</span>
                                <div className="relative w-5 h-5" >
                                    <motion.a href="https://youtube.com/@server-x" target={"_blank"} className="bg-light rounded-full dark:bg-dark"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <YouTubeIcon />
                                    </motion.a>
                                </div>
                            </span>
                        </div>

                        <button className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-400 hover:dark:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-400 hover:dark:text-rose-300 relative bg-light dark:bg-neutral-800 h-16 w-64 border dark:border-dark-secondary text-left p-3 text-foreground dark:text-gray-50 font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-400 after:right-8 after:top-3 after:rounded-full after:blur-lg text-sm">
                            See more
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-8">
                        <div className="grid grid-cols-4 gap-28 2xl:gap-12 sm:grid-cols-2">
                            <div>
                                <h6 className="text-foreground-title dark:text-light overwrite text-base">Product</h6>
                                <ul className="mt-4 space-y-2">
                                    <FooterLink href="/mosaicra-ui" title="Mosaicra UI" onClick={scrollToTop} />
                                    <FooterLink href="/llms" title="LLMs" onClick={scrollToTop} />
                                    <FooterLink href="/alterbase" title="AlterBase" onClick={scrollToTop} />
                                    <FooterLink href="/pricing" title="Pricing" onClick={scrollToTop} />
                                </ul>
                            </div>
                            <div>
                                <h6 className="text-foreground-title dark:text-light overwrite text-base">Developers</h6>
                                <ul className="mt-4 space-y-2">
                                    <FooterLink href="/docs" title="Documentation" onClick={scrollToTop} />
                                    <FooterLink href="/changelog" title="Changelog" onClick={scrollToTop} />
                                    <FooterLink href="https://github.com/serverx-org/server-x-101/blob/master/CONTRIBUTING.md" title="Contributing" onClick={scrollToTop} />
                                    <FooterLink href="/open-source" title="Open Source" onClick={scrollToTop} />
                                    <FooterLink href="/reddit" title="Reddit" onClick={scrollToTop} />
                                    <FooterLink href="https://dev.to/server-x" title="DevTo" onClick={scrollToTop} />
                                    <FooterLink href="/rss.xml" title="RSS" onClick={scrollToTop} />
                                </ul>
                            </div>
                            <div>
                                <h6 className="text-foreground-title dark:text-light overwrite text-base">Resources</h6>
                                <ul className="mt-4 space-y-2">
                                    <FooterLink href="/support" title="Support" onClick={scrollToTop} />
                                    <FooterLink href="https://status.serverx.org.in/" title="Status" onClick={scrollToTop} />
                                    <FooterLink href="/members" title="Become a Member" onClick={scrollToTop} />
                                    <FooterLink href="/members/integrations" title="Integrations" onClick={scrollToTop} />
                                    <FooterLink href="/members/experts" title="Experts" onClick={scrollToTop} />
                                    <FooterLink href="/brand-assets" title="Brand Assets / Logos" onClick={scrollToTop} />
                                    <FooterLink href="/security" title="Security and Compliance" onClick={scrollToTop} />
                                    <FooterLink href="/legal/dpa" title="DPA" onClick={scrollToTop} />
                                    <FooterLink href="/security" title="SOC2" onClick={scrollToTop} />
                                    <FooterLink href="https://forms.serverx.org.in/hipaa2" title="HIPAA" onClick={scrollToTop} />
                                </ul>
                            </div>
                            <div>
                                <h6 className="text-foreground-title dark:text-light overwrite text-base">Company</h6>
                                <ul className="mt-4 space-y-2">
                                    <FooterLink href="/articles" title="Articles" onClick={scrollToTop} />
                                    <FooterLink href="/authors" title="Authors" onClick={scrollToTop} />
                                    <FooterLink href="/careers" title="Careers" onClick={scrollToTop} />
                                    <FooterLink href="/company" title="Company" onClick={scrollToTop} />
                                    <FooterLink href="/ga" title="General Availability" onClick={scrollToTop} />
                                    <FooterLink href="/terms" title="Terms of Service" onClick={scrollToTop} />
                                    <FooterLink href="/privacy" title="Privacy Policy" onClick={scrollToTop} />
                                    <FooterLink href="/privacy-settings" title="Privacy Settings" onClick={scrollToTop} />
                                    <FooterLink href="/aup" title="Acceptable Use Policy" onClick={scrollToTop} />
                                    <FooterLink href="/support-policy" title="Support Policy" onClick={scrollToTop} />
                                    <FooterLink href="/sla" title="Service Level Agreement" onClick={scrollToTop} />
                                    <FooterLink href="/humans.txt" title="Humans.txt" onClick={scrollToTop} />
                                    <FooterLink href="/lawyers.txt" title="Lawyers.txt" onClick={scrollToTop} />
                                    <FooterLink href="/.well-known/security.txt" title="Security.txt" onClick={scrollToTop} />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-light-secondary dark:bg-dark-secondary h-[1px] rounded-full w-full' />
                <div className='py-2 pb-20 lg:py-8 lg:pb-10  flex items-center justify-between text-mini text-foreground-light dark:text-foreground '>
                    <span className=''>&copy; serverx org</span>
                    <span>developed by{" "}
                        <Link
                            href="https://github.com/gautamankoji"
                            target="_blank"
                            className='hover:text-primary-light dark:hover:text-primary-dark transition-all ease-in-out duration-300 relative group '
                        >
                            gautamankoji
                            <span className={`h-[0.5px] inline-block bg-primary-light dark:primary-dark absolute group-hover:left-0 right-0 top-[14px] -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 hover:w-full w-0 rounded-full`}></span>
                        </Link>
                    </span>
                </div>
            </div>
        </main>
    )
}


export default Footer