import Image from 'next/image';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy as defaultStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const FileName1 = ({ icon, fileName, children, style = defaultStyle, ...props }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isPopping, setIsPopping] = useState(false);

    const handleCopy = () => {
        const range = document.createRange();
        range.selectNodeContents(document.getElementById('children-text'));
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();

        setIsCopied(true);
        setIsPopping(true);
        setTimeout(() => { setIsCopied(false); setIsPopping(false); }, 2000); // Reset the icon after 2 seconds
    };

    return (
        <div className="flex flex-col items-start space-x-2 bg-codeBg-light dark:bg-codeBg-dark rounded-md transition-all duration-300 ease-in-out border border-light-secondary dark:border-dark-secondary group w-full overflow-hidden" {...props}>
            <div className='flex items-center justify-between w-[98.5%] mt-4'>
                <div className='flex items-center justify-start py-0 pb-1 px-4 gap-2 '>
                    <span className="file-icon text-dark-secondary dark:text-light-secondary">
                        <Image src={`/packages/svgs/icons/${icon}.svg`} alt={icon} width={24} height={24} className='!m-0' />
                    </span>
                    <b className='text-dark-secondary dark:text-light-secondary text-xs transition-all duration-300 ease-in-out'>{fileName}</b>
                </div>
                <div className={`relative flex items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity`} onClick={handleCopy}>
                    <span className='bg-dark/45 hover:bg-dark/95 rounded-md p-[4px] nested-group'>
                        {isCopied ? (
                            <Image src="/packages/svgs/copied-icon.svg" alt="Copied" width={14} height={14} className={`!m-0 ${isPopping ? 'animate-pop' : ''}`} />
                        ) : (
                            <Image src="/packages/svgs/copy-icon.svg" alt="Copy" width={14} height={14} className={`!m-0`} />
                        )}
                        {/* <span className='absolute top-[-30px] left-1/2 transform -translate-x-1/2 p-1 bg-[#353e49] border-[0.1px] border-light/45 text-white text-xs rounded opacity-0 nested-group-hover:opacity-100 transition-opacity'>
                {isCopied ? 'Copied!' : 'Copy'}
              </span> */}
                    </span>
                </div>
            </div>
            <div className='w-[97.5%] py-0 !m-0 text-dark dark:text-light' id='children-text'>
                <SyntaxHighlighter language={icon} style={style}>
                    {children}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

export const FileName = ({ icon, fileName, children, style = defaultStyle, ...props }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isPopping, setIsPopping] = useState(false);

    const handleCopy = () => {
        const range = document.createRange();
        range.selectNodeContents(document.getElementById('children-text'));
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();

        setIsCopied(true);
        setIsPopping(true);
        setTimeout(() => { setIsCopied(false); setIsPopping(false); }, 2000); // Reset the icon after 2 seconds
    };

    return (
        <div className="flex flex-col items-start space-x-2 bg-codeBg-light dark:bg-codeBg-dark rounded-md transition-all duration-300 ease-in-out border border-light-secondary dark:border-dark-secondary group w-full overflow-hidden" {...props}>
            <div className='flex items-center justify-between w-[98.5%] mt-4'>
                <div className='flex items-center justify-start py-0 pb-1 px-4 gap-2 '>
                    <span className="file-icon text-dark-secondary dark:text-light-secondary">
                        <Image src={`/packages/svgs/icons/${icon}.svg`} alt={icon} width={24} height={24} className='!m-0' />
                    </span>
                    <b className='text-dark-secondary dark:text-light-secondary text-xs transition-all duration-300 ease-in-out'>{fileName}</b>
                </div>
                <div className={`relative flex items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity`} onClick={handleCopy}>
                    <span className='bg-dark/45 hover:bg-dark/95 rounded-md p-[4px] nested-group'>
                        {isCopied ? (
                            <Image src="/packages/svgs/copied-icon.svg" alt="Copied" width={14} height={14} className={`!m-0 ${isPopping ? 'animate-pop' : ''}`} />
                        ) : (
                            <Image src="/packages/svgs/copy-icon.svg" alt="Copy" width={14} height={14} className={`!m-0`} />
                        )}
                        {/* <span className='absolute top-[-30px] left-1/2 transform -translate-x-1/2 p-1 bg-[#353e49] border-[0.1px] border-light/45 text-white text-xs rounded opacity-0 nested-group-hover:opacity-100 transition-opacity'>
                {isCopied ? 'Copied!' : 'Copy'}
              </span> */}
                    </span>
                </div>
            </div>
            <div className='w-[97.5%] py-0 !m-0 text-dark dark:text-light px-2' id='children-text'>
                {children}
            </div>
        </div>
    );
}

export const Tab = ({ icon, fileName, children }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <div className="mb-2 flex items-center">
                <div className="h-5 w-5 mr-2">{icon}</div>
                <div className="text-sm">{fileName}</div>
            </div>
            <pre className="overflow-auto">
                <code>{children}</code>
            </pre>
        </div>
    );
}

export const TabGroup1 = ({ style = defaultStyle, children }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [isCopied, setIsCopied] = useState(false);
    const [isPopping, setIsPopping] = useState(false);

    const handleCopy = () => {
        const range = document.createRange();
        range.selectNodeContents(document.getElementById(`tab-${activeTab}-children-text`));
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();

        setIsCopied(true);
        setIsPopping(true);
        setTimeout(() => { setIsCopied(false); setIsPopping(false); }, 2000);
    };

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <>
            <div className='bg-codeBg-light dark:bg-codeBg-dark rounded-md transition-all duration-300 ease-in-out border border-light-secondary dark:border-dark-secondary group'>
                <div className="flex flex-col items-start bg-codeBg-light dark:bg-codeBg-dark transition-all duration-300 ease-in-out rounded-md  mb-6 mt-3">
                    <div className='flex items-center justify-between w-full px-3'>
                        <div className="flex flex-wrap w-full gap-2 ">
                            {React.Children.map(children, (child, index) => (
                                <div
                                    key={index}
                                    className={`p-1.5 pr-2 gap-2 cursor-pointer flex items-center justify-center rounded-md text-dark-secondary hover:text-dark dark:text-light-secondary hover:dark:text-light hover:bg-bord-light  hover:dark:bg-dark/65 transition-all duration-200 ease-in-out ${activeTab === index ? 'dark:bg-dark/65 bg-bord-light text-dark dark:!text-light  transition-all duration-300 ease-in-out' : 'text-dark-secondary dark:text-light-secondary'}`}
                                    onClick={() => handleTabClick(index)}
                                >
                                    <span className="file-icon text-dark-secondary dark:text-light-secondary">
                                        <Image src={`/packages/svgs/icons/${child.props.icon}.svg`} alt={child.props.icon} width={24} height={24} className='!m-0' />
                                    </span>
                                    <b className='text-xs'>{child.props.fileName}</b>
                                </div>
                            ))}
                        </div>
                        <div className='relative flex items-start cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity' onClick={handleCopy}>
                            <span className='bg-bord-light/45 border border-light-secondary dark:border-dark-secondary dark:bg-dark/45 hover:bg-bord-light/95 hover:dark:bg-dark/95 rounded-md p-[4px] -mt-4 nested-group'>
                                {isCopied ? (
                                    <Image src="/packages/svgs/copied-icon.svg" alt="Copied" width={14} height={14} className={`!m-0 ${isPopping ? 'animate-pop' : ''}`} />
                                ) : (
                                    <Image src="/packages/svgs/copy-icon.svg" alt="Copy" width={14} height={14} className='!m-0 ' />
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-start bg-codeBg-light dark:bg-codeBg-dark  transition-all duration-300 ease-in-out rounded-lg group mb-1 overflow-x-auto overflow-y-hidden -mt-6'>
                    <AnimatePresence>
                        {React.Children.map(children, (child, index) => (
                            activeTab === index && (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="text-light w-full"
                                    id={`tab-${index}-children-text`}
                                >
                                    <SyntaxHighlighter language={icon} style={style}>
                                        {child.props.children}
                                    </SyntaxHighlighter>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}

export const TabGroup = ({ style = defaultStyle, children }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [isCopied, setIsCopied] = useState(false);
    const [isPopping, setIsPopping] = useState(false);

    const handleCopy = () => {
        const range = document.createRange();
        range.selectNodeContents(document.getElementById(`tab-${activeTab}-children-text`));
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();

        setIsCopied(true);
        setIsPopping(true);
        setTimeout(() => { setIsCopied(false); setIsPopping(false); }, 2000);
    };

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <>
            <div className='bg-codeBg-light dark:bg-codeBg-dark rounded-md transition-all duration-300 ease-in-out border border-light-secondary dark:border-dark-secondary group w-full'>
                <div className="flex flex-col items-start bg-codeBg-light dark:bg-codeBg-dark transition-all duration-300 ease-in-out rounded-md  mb-6 mt-3">
                    <div className='flex items-center justify-between w-full px-3'>
                        <div className="flex flex-wrap w-full gap-2 ">
                            {React.Children.map(children, (child, index) => (
                                <div
                                    key={index}
                                    className={`p-1.5 pr-2 gap-2 cursor-pointer flex items-center justify-center rounded-md text-dark-secondary hover:text-dark dark:text-light-secondary hover:dark:text-light hover:bg-bord-light  hover:dark:bg-dark/65 transition-all duration-200 ease-in-out ${activeTab === index ? 'dark:bg-dark/65 bg-bord-light text-dark dark:!text-light  transition-all duration-300 ease-in-out' : 'text-dark-secondary dark:text-light-secondary'}`}
                                    onClick={() => handleTabClick(index)}
                                >
                                    <span className="file-icon text-dark-secondary dark:text-light-secondary">
                                        <Image src={`/packages/svgs/icons/${child.props.icon}.svg`} alt={child.props.icon} width={24} height={24} className='!m-0' />
                                    </span>
                                    <b className='text-xs'>{child.props.fileName}</b>
                                </div>
                            ))}
                        </div>
                        <div className='relative flex items-start cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity' onClick={handleCopy}>
                            <span className='bg-bord-light/45 border border-light-secondary dark:border-dark-secondary dark:bg-dark/45 hover:bg-bord-light/95 hover:dark:bg-dark/95 rounded-md p-[4px] -mt-4 nested-group'>
                                {isCopied ? (
                                    <Image src="/packages/svgs/copied-icon.svg" alt="Copied" width={14} height={14} className={`!m-0 ${isPopping ? 'animate-pop' : ''}`} />
                                ) : (
                                    <Image src="/packages/svgs/copy-icon.svg" alt="Copy" width={14} height={14} className='!m-0 ' />
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-start bg-codeBg-light dark:bg-codeBg-dark  transition-all duration-300 ease-in-out rounded-lg group mb-1 overflow-x-auto overflow-y-hidden -mt-6'>
                    <AnimatePresence>
                        {React.Children.map(children, (child, index) => (
                            activeTab === index && (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="text-light w-full"
                                    id={`tab-${index}-children-text`}
                                >
                                    {child.props.children}
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}

