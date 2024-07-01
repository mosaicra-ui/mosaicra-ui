"use client"
import { format, parseISO } from "date-fns";
import React, { useState } from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import ViewCounter from "./ViewCounter";
import styles from '@/styles/ArticlesSyntax.module.css';
import { AnimatePresence, motion } from 'framer-motion';

const mdxComponents = {
  Image: (props) => <div className={`flex flex-col items-center justify-center my-6 md:my-3 mx-0 `}><div className='border rounded-[7px] border-light-secondary dark:border-dark-secondary transition-all duration-300 ease-in-out'><img className='rounded-md !my-0' {...props} /></div><p className="text-center text-mini sourceCodePro !line-clamp-1 !my-0 w-[95%]">{props.alt}</p></div>,
  // code: (props) => <code className={` overflow-hidden   !text-sm`} {...props} />,
  a: (props) => {
    const { href, children, ...rest } = props;
    const handleClick = (e) => {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    };

    if (href.startsWith('#')) {
      return (
        <a
          className={`${styles.hLink} !no-underline hover:no-underline font-semibold text-blue-500 hover:text-blue-700 text-sm transition-all ease-in-out duration-300`}
          href={href}
          onClick={handleClick}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <a
        className={`${styles.hLink} !no-underline hover:no-underline font-semibold text-blue-500 hover:text-primary-light hover:dark:text-primary-dark text-sm transition-all ease-in-out duration-300`}
        {...props}
      >
        {children}
      </a>
    );
  },
  details: (props) => (
    <details
      className={`border-[1px] border-solid border-dark dark:border-light text-dark dark:text-light rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto text-sm ${styles.articlesContent}`}
      {...props}
    />
  ),
  summary: (props) => (
    <summary className="text-sm capitalize cursor-pointer" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-4 font-in text-sm" {...props} />
  ),
  li: (props) => (
    <li className="py-1 -ml-2" {...props} />
  ),
  h1: (props) => (
    <h1 className='border-b-2 dark:border-light border-dark w-fit border-dashed uppercase lg:pt-0 font-extrabold' {...props} />
  ),
  h2: (props) => (
    <h2 className='border-b-2 dark:border-light border-dark w-fit border-dashed uppercase lg:pt-0 font-extrabold' {...props} />
  ),
  h3: (props) => (
    <h3 className='border-b-2 dark:border-light border-dark w-fit border-dashed uppercase lg:pt-0 font-extrabold' {...props} />
  ),
  h4: (props) => (
    <h4 className='uppercase lg:pt-0  font-extrabold' {...props} />
  ),
  h5: (props) => (
    <h5 className='uppercase lg:pt-0 font-extrabold' {...props} />
  ),
  h6: (props) => (
    <h6 className='uppercase lg:pt-0 font-extrabold' {...props} />
  ),
  DropCap: ({ children, ...props }) => (
    <div className="first-letter:text-3xl sm:first-letter:text-5xl" {...props}>
      {children}
    </div>
  ),
  FileName: ({ icon, fileName, children, ...props }) => {
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
      <div className="flex flex-col items-start space-x-2 bg-codeBg-light dark:bg-codeBg-dark rounded-md transition-all duration-300 ease-in-out border border-light-secondary dark:border-dark-secondary group my-6" {...props}>
        <div className='flex items-center justify-between w-[98.5%] mt-4'>
          <div className='flex items-center justify-start py-0 pb-1 px-4 gap-2'>
            <span className="file-icon text-dark-secondary dark:text-light-secondary">
              <Image src={`../packages/svgs/icons/${icon}.svg`} alt={icon} width={24} height={24} className='!m-0' />
            </span>
            <b className='text-dark-secondary dark:text-light-secondary text-xs'>{fileName}</b>
          </div>
          <div className={`relative flex items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity`} onClick={handleCopy}>
            <span className='bg-dark/45 hover:bg-dark/95 rounded-md p-[4px] nested-group'>
              {isCopied ? (
                <Image src="../packages/svgs/copied-icon.svg" alt="Copied" width={14} height={14} className={`!m-0 ${isPopping ? 'animate-pop' : ''}`} />
              ) : (
                <Image src="../packages/svgs/copy-icon.svg" alt="Copy" width={14} height={14} className={`!m-0`} />
              )}
              {/* <span className='absolute top-[-30px] left-1/2 transform -translate-x-1/2 p-1 bg-[#353e49] border-[0.1px] border-light/45 text-white text-xs rounded opacity-0 nested-group-hover:opacity-100 transition-opacity'>
                {isCopied ? 'Copied!' : 'Copy'}
              </span> */}
            </span>
          </div>
        </div>
        <div className='w-[97.5%] py-0 !m-0 text-light' id='children-text'>
          {children}
        </div>
      </div>
    );
  },
  Tab: ({ icon, fileName, children }) => {
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
  },
  TabGroup: ({ children }) => {
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
                      <Image src={`../packages/svgs/icons/${child.props.icon}.svg`} alt={child.props.icon} width={24} height={24} className='!m-0' />
                    </span>
                    <b className='text-xs'>{child.props.fileName}</b>
                  </div>
                ))}
              </div>
              <div className='relative flex items-start cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity' onClick={handleCopy}>
                <span className='bg-bord-light/45 border border-light-secondary dark:border-dark-secondary dark:bg-dark/45 hover:bg-bord-light/95 hover:dark:bg-dark/95 rounded-md p-[4px] -mt-4 nested-group'>
                  {isCopied ? (
                    <Image src="../packages/svgs/copied-icon.svg" alt="Copied" width={14} height={14} className={`!m-0 ${isPopping ? 'animate-pop' : ''}`} />
                  ) : (
                    <Image src="../packages/svgs/copy-icon.svg" alt="Copy" width={14} height={14} className='!m-0 ' />
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
  },
};

const RenderMdx = ({ blog, className, slug: blogSlug }) => {
  const {
    image = {},
    title = "Untitled",
    tags = [],
    publishedAt = new Date(),
  } = blog;

  const MDXContent = useMDXComponent(blog.body.code);

  return (
    <>
      <div className={`${className}  col-span-8 lg:col-span-11 font-in prose sm:prose-base md:prose-lg max-w-full
    prose-blockquote:bg-accent/20 
    prose-blockquote:p-2
    prose-blockquote:px-6
    prose-blockquote:border-accent
    prose-blockquote:not-italic
    prose-blockquote:rounded-r-lg

    prose-li:marker:text-accent
    
    dark:prose-invert
    dark:prose-blockquote:border-accentDark
    dark:prose-blockquote:bg-accentDark/20
    dark:prose-li:marker:text-primary-light
    prose-li:marker:ml-1
    
    text-sm
     scroll-smooth
    `}>
        <h1
          className="uppercase font-extrabold text-2xl lg:text-2xl !leading-normal relative gradient-text w-full"
        >
          {blog.title}
        </h1>
        <div className="hidden lg:flex gap-2 text-sm">
          <time>• {format(parseISO(publishedAt), "LLLL d, yyyy")}</time>
          <span><ViewCounter slug={blogSlug} /></span>
          <div> • {blog.readingTime.text}</div>
        </div>
        <MDXContent components={mdxComponents} />
      </div>
    </>
  );
}

export default RenderMdx;
