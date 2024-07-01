// components/Dropdown.js

import Link from 'next/link';
import { useState } from 'react';

const Dropdown = ({title}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <ul
        data-orientation="horizontal"
        className="group flex flex-1 list-none items-center justify-center space-x-1"
        dir="ltr"
      >
        <li className="text-sm font-medium">
          <button
            id="products-trigger"
            data-state={isOpen ? 'open' : 'closed'}
            aria-expanded={isOpen}
            aria-controls="products-content"
            className={`group relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-light hover:bg-surface-300 shadow-none focus-visible:outline-border-strong border-transparent text-sm leading-4 py-2 !bg-transparent hover:text-brand-link ${isOpen ? '!text-brand-link' : ''} data-[radix-collection-item]:focus-visible:ring-2 data-[radix-collection-item]:focus-visible:ring-light-lighter data-[radix-collection-item]:focus-visible:text-light px-2 h-auto`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`lucide lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-200 ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
        </li>
      </ul>

      {isOpen && (
        <div className="absolute left-0 top-full flex justify-center mt-4">
          <div
            data-state="open"
            data-orientation="horizontal"
            className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden border bg text-popover-light shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-right-10 data-[state=open]:duration-100 data-[state=open]:ease-out data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:duration-75 md:w-[var(--radix-navigation-menu-viewport-width)] rounded-xl bg-background"
            style={{
              '--radix-navigation-menu-viewport-width': '550px',
              '--radix-navigation-menu-viewport-height': '516px',
            }}
          >
            <div
              id="products-content"
              aria-labelledby="products-trigger"
              data-orientation="horizontal"
              className="left-0 top-0 w-full data-[motion^=from-]:animate-fade-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto"
              dir="ltr"
            >
              <div className="flex flex-col xl:flex-row">
                <div className="w-[550px] xl:w-[500px] py-8 px-8 bg-background grid gap-3 grid-cols-2">
                  <div className="p-0 flex flex-col gap-6">
                    <label className="text-light-lighter text-xs uppercase tracking-widest font-mono">
                      Developers
                    </label>
                    <ul className="flex flex-col gap-4">
                      <li>
                        <Link
                          className="flex group items-center gap-2 text-light-light text-sm hover:text-light focus-visible:text-light focus-visible:ring-2 focus-visible:outline-none focus-visible:rounded focus-visible:ring-light-lighter"
                          href="/docs"
                        >
                          <div className="relative" style={{ width: '16px', height: '16px' }}>
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
                          <span>Documentation</span>
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
                      {/* Add more links similarly */}
                    </ul>
                  </div>
                  {/* More sections as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
