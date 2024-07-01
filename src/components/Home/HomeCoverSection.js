import { sortBlogs, sortContests } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Tag from '../Elements/Tag';
import { slug } from 'github-slugger';

const AuthorName = (name) => {
    const formattedName = name.toLowerCase().replace(/\s+/g, '_');
    return formattedName;
}

const LinkAuthorName = (name) => {
    const formattedName = name.toLowerCase().replace(/\s+/g, '-');
    return formattedName;
}

const HomeCoverSection = ({ blogs }) => {
    const sortedBlogs = sortContests(blogs);
    const blog = sortedBlogs[0];
    const [isHovered, setIsHovered] = useState(false);
    const defaultImageUrl = '/packages/articles/featured.png';
    const imageUrl = blog?.url ? `/packages${blog.url}/featured.png` : defaultImageUrl;
    const [imgSrc, setImgSrc] = useState(imageUrl);

    const handleError = () => {
        setImgSrc(defaultImageUrl);
    };

    const {
        url = "#",
        image = {},
        title = "Untitled",
        tags = [],
        publishedAt = new Date(),
    } = blog;

    const {
        filePath = "",
        blurhashDataUrl = "",
        width = 0,
        height = 0,
    } = image;

    useEffect(() => {
        if (blog?.url) {
            setImgSrc(`/packages${blog.url}/featured.png`);
        } else {
            setImgSrc(defaultImageUrl);
        }
    }, [blog]);

    return (
        <div className={`w-full inline-block -mt-8 border-2 rounded-3xl transition-all duration-300 ease-in-out ${isHovered ? 'border-bord-light dark:border-bord-dark' : 'border-light-secondary dark:border-dark-secondary'}`}>
            <article className='flex flex-col items-start justify-end relative h-[60vh] sm:h-[30vh]'>
                <Image
                    src={imgSrc}
                    onError={handleError}
                    placeholder='blur'
                    blurDataURL={imgSrc}
                    alt={blog.title}
                    fill
                    className='w-full h-screeen object-top object-cover rounded-3xl md:rounded-xl z-0'
                    sizes='100vw'
                    priority
                />
                <div className='absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-dark/70 rounded-3xl md:rounded-xl z-10' />

                <div className='w-full p-4 flex flex-col md:flex-row md:items-center items-start justify-center md:justify-between z-20 text-light'>
                    {/* <Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} /> */}
                    <Link href={blog.url} className='mt-6'>
                        <h1 className='font-semibold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl'
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <span className='bg-gradient-to-r from-accent to-accent dark:from-primary-light/90 
                        dark:to-primary-light/90 bg-[length:0px_2px]
                        hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '>
                                {blog.title}
                            </span>
                        </h1>
                    </Link>
                    <p className='flex lg:hidden line-clamp-1 mt-2 md:text-lg lg:text-xl !font-thin montserrat'>
                        {blog.description}
                    </p>
                    <div className='mt-4 md:text-xs'>
                        <Link
                            href={`/authors/${LinkAuthorName(blog.author)}`}
                            target="_blank"
                            className="flex gap-2"
                        >
                            <Image
                                src={`/packages/authors/${AuthorName(blog.author)}.jpg`}
                                blurDataURL={`blurhashDataUrl`}
                                alt={blog.author}
                                width={width}
                                height={height}
                                className="w-10 h-10 md:w-8 md:h-8 object-cover object-center rounded-full"
                                priority
                                sizes="100vw"
                            />
                            <div className="flex flex-col items-start justify-center">
                                <div className="text-xs -my-1">Author</div>
                                <div className="hover:text-blue-500 hover:dark:text-primary-light font-semibold transition-all duration-200 ease-in-out">{blog.author}</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default HomeCoverSection;
