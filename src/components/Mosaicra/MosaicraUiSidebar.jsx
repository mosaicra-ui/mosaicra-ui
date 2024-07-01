import React from 'react'
import Link from "next/link";

const SideNavLink = ({ href, title }) => {
    return (
        <Link
            className="flex group items-center gap-2.5 text-light-light text-sm hover:text-dark transition-all duration-300 ease-in-out hover:dark:text-light focus-visible:text-dark dark:focus-visible:text-light focus-visible:ring-2 focus-visible:outline-none focus-visible:rounded focus-visible:ring-light-lighter w-fit"
            href={`${href}`}
        >
            <div className="relative rounded-lg bg-light-secondary/40 dark:bg-dark-secondary/40  transition-all duration-300 ease-in-out p-1" style={{ width: '24px', height: '24px' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    color="currentColor"
                    fill="none"
                    stroke="currentColor"
                    className=" stroke-dark/70  transition-all duration-300 ease-in-out dark:stroke-light/70 group-hover:stroke-foreground-title group-hover:dark:stroke-light"
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
                <span className="flex gap-2 items-center text-dark/80  transition-all duration-300 ease-in-out dark:text-light/80 group-hover:text-dark dark:group-hover:text-light font-[550] text-xs">{title}
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
            </div>
        </Link>
    )
}

const SimpleSideNavLink = ({ href, title }) => {
    return (
        <Link
            className="flex group items-center gap-2.5 text-light-light text-sm hover:text-dark transition-all duration-300 ease-in-out hover:dark:text-light focus-visible:text-dark dark:focus-visible:text-light focus-visible:ring-2 focus-visible:outline-none focus-visible:rounded focus-visible:ring-light-lighter"
            href={`${href}`}
        >
            <div className="flex flex-col">
                <span className="flex gap-2 items-center text-dark/80  transition-all duration-300 ease-in-out dark:text-light/80 group-hover:text-dark dark:group-hover:text-light font-[550] text-xs">{title}
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
            </div>
        </Link>
    )
}

const MosaicraUiSidebar = () => {
    return (
        <div className="lg:hidden -mt-9">
            <aside className="sticky top-[65px] w-50 overflow-x-hidden border-b border-light-secondary dark:border-dark-secondary">
                <div
                    id='scroll-primary-serverx'
                    className={`border-l border-r w-60 border-light-secondary dark:border-dark-secondary transition-all duration-300 ease-in-out text-dark dark:text-light p-4 overflow-hidden h-[93vh] overflow-y-auto`}
                >
                    <ul className="mt-4 font-in text-sm space-y-2 text-font-light">
                        <li><SimpleSideNavLink href={`/`} title={`Home`} /></li>
                        <li><SimpleSideNavLink href={`/mosaicra-ui/getting-started`} title={`Getting Started`} /></li>
                        <div className="h-[1px] bg-bord-light dark:bg-bord-dark transition-all duration-300 ease-in-out" />
                        <li><span className="uppercase font-code text-mini text-dark dark:text-light transition-all duration-300 ease-in-out">Docs</span></li>
                        <li><SideNavLink href={`/mosaicra-ui/how-to-use`} title={`How to Use`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/customize-components`} title={`Customize Components`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/typography`} title={`Typography`} /></li>


                        <div className="h-[1px] bg-bord-light dark:bg-bord-dark transition-all duration-300 ease-in-out" />
                        <li><span className="uppercase font-code text-mini text-dark dark:text-light transition-all duration-300 ease-in-out">Components</span></li>
                        <li><SideNavLink href={`/mosaicra-ui/all-components`} title={`All Components`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/actions`} title={`Actions`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/layout`} title={`Layout`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/data-display`} title={`Data Display`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/actions`} title={`Actions`} /></li>

                        <div className="h-[1px] bg-bord-light dark:bg-bord-dark transition-all duration-300 ease-in-out" />
                        <li><span className="uppercase font-code text-mini text-dark dark:text-light transition-all duration-300 ease-in-out">Actions</span></li>
                        <li><SideNavLink href={`/mosaicra-ui/elements/buttons/repeat-button`} title={`Buttons`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/modal`} title={`Modals`} /></li>

                        <div className="h-[1px] bg-bord-light dark:bg-bord-dark transition-all duration-300 ease-in-out" />
                        <li><span className="uppercase font-code text-mini text-dark dark:text-light transition-all duration-300 ease-in-out">Layout</span></li>
                        <li><SideNavLink href={`/mosaicra-ui/layout`} title={`Layout`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/layout`} title={`Layout`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/layout`} title={`Layout`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/layout`} title={`Layout`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/layout`} title={`Layout`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/layout`} title={`Layout`} /></li>
                        <li><span className="uppercase font-code text-mini text-dark dark:text-light transition-all duration-300 ease-in-out">Data Display</span></li>
                        <li><SideNavLink href={`/mosaicra-ui/accordion`} title={`Accordion`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/collapse`} title={`Collapse`} /></li>
                        <li><SideNavLink href={`/mosaicra-ui/card`} title={`Card`} /></li>
                    </ul>
                </div>
                {/* <div className=' h-60 w-full z-1 bg-gradient-to-b from-transparent from-0% to-dark bottom-0 -translate-y-[15rem]' /> */}
            </aside>
        </div>
    )
}

export default MosaicraUiSidebar