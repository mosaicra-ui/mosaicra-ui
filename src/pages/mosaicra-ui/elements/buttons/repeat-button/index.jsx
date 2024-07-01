import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { FileName, Tab, TabGroup } from "@/components/Shortcodes/Shortcodes"
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { FileName1 } from '@/components/Shortcodes/Shortcodes';

const RepeatButton = () => {
    return (
        <button className="group flex justify-center items-center p-2 gap-2 h-8 w-28 border-none bg-[#ff362b34] rounded-full cursor-pointer hover:bg-[#ff362b52]">
            <svg
                className="svg-icon group-hover:animate-spin"
                fill="none"
                height="20"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g stroke="#ff342b" strokeLinecap="round" strokeWidth="1.5">
                    <path d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468"></path>
                    <path d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986"></path>
                </g>
            </svg>
            <span className="text-[#FF342B] text-[17px] leading-[20px] font-sans tracking-wide">Repeat</span>
        </button>
    );
};

const codeBlock = `
<button class="group flex justify-center items-center p-2 gap-2 h-8 w-28 border-none bg-[#ff362b34] rounded-full cursor-pointer hover:bg-[#ff362b52]">
    <svg
        className="svg-icon group-hover:animate-spin"
        fill="none"
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g stroke="#ff342b" strokeLinecap="round" strokeWidth="1.5">
        <path d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468"></path>
        <path d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986"></path>
        </g>
    </svg>
    <span class="text-[#FF342B] text-[17px] leading-[20px] font-sans tracking-wide">Repeat</span>
</button>
`;

const tailwindConfigCodeBlock = `
<script>
    // tailwind.config.js
    module.exports = {
    theme: {
        extend: {
        keyframes: {
            spin: {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(-360deg)' },
            },
        },
        animation: {
            spin: 'spin 2s linear infinite',
        },
        },
    },
    plugins: [],
    };
</script>
`;

const SplitPane = ({ children }) => {
    const [leftWidth, setLeftWidth] = useState('50%');
    const paneRef = useRef(null);

    const handleMouseDown = (e) => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (paneRef.current) {
            const newLeftWidth = (e.clientX / paneRef.current.clientWidth) * 100;
            setLeftWidth(`${newLeftWidth}%`);
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div ref={paneRef} className="flex lg:flex-col gap-2 h-full">
            <div
                className="flex items-center justify-center bg-white rounded-md border border-light-secondary dark:border-dark-secondary transition-all duration-300 ease-in-out"
                style={{ width: leftWidth }}
            >
                {children[0]}
            </div>
            <div
                className="bg-gray-300 cursor-col-resize"
                onMouseDown={handleMouseDown}
                style={{ width: '5px' }}
            />
            <div className="flex items-center !text-light justify-center" style={{ flexGrow: 1 }}>
                {children[1]}
            </div>
        </div>
    );
};

const buttons = () => {
    // const [code, setCode] = useState('<button class="bg-blue-500 text-white px-4 py-2 rounded">Click me</button>');
    const [code, setCode] = useState(codeBlock);
    const [code2, setCode2] = useState(tailwindConfigCodeBlock);
    return (
        <>
            <div className='flex lg:flex-col gap-2 pb-10'>

                <div className='w-1/2 lg:w-full flex flex-col gap-4 items-center justify-center bg-white text-dark rounded-md border border-light-secondary dark:border-dark-secondary transition-all duration-300 ease-in-out'>
                    <RepeatButton />
                    <div dangerouslySetInnerHTML={{ __html: code }} />
                </div>
                <div className='w-1/2 lg:w-full flex items-center justify-center'>
                    {/* <FileName icon={`html`} fileName={`button.html`}>
                        <Editor
                            value={code}
                            onValueChange={(code) => setCode(code)}
                            lang='python'
                            highlight={(code) => highlight(code, languages.js)}
                            padding={10}
                            className="chroma !font-semibold leading-normal !overflow-x-auto"
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 12,
                            }}
                        />
                    </FileName> */}
                    <TabGroup>
                        <Tab icon={`html`} fileName={`button.html`}>
                            <Editor
                                value={code}
                                onValueChange={(code) => setCode(code)}
                                lang='python'
                                highlight={(code) => highlight(code, languages.js)}
                                padding={10}
                                className="chroma !font-semibold leading-normal !overflow-x-auto"
                                style={{
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    fontSize: 12,
                                }}
                            />
                        </Tab>
                        <Tab icon={`tailwind`} fileName={`tailwind.config.js`}>
                            <Editor
                                value={code2}
                                onValueChange={(code2) => setCode(code2)}
                                lang='python'
                                highlight={(code2) => highlight(code2, languages.js)}
                                padding={10}
                                className="chroma !font-semibold leading-normal !overflow-x-auto"
                                style={{
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    fontSize: 12,
                                }}
                            />
                        </Tab>
                    </TabGroup>
                </div>
            </div >
            {/* <div>

                <div className=''>
                    <div dangerouslySetInnerHTML={{ __html: code }} />
                </div>
                <Editor
                    value={code}
                    onValueChange={(code) => setCode(code)}
                    lang='python'
                    highlight={(code) => highlight(code, languages.js)}
                    padding={10}
                    className="chroma !font-semibold leading-normal !overflow-x-auto"
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
            </div> */}
        </>
    )
}

export default buttons