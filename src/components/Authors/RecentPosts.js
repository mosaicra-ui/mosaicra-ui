import { sortBlogs } from "@/utils";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogLayoutTwo from "../Blog/BlogLayoutTwo";

const RecentPosts = ({ blogs, author }) => {
    const [visibleCount, setVisibleCount] = useState(13);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedCount = localStorage.getItem("visibleCount");
            if (storedCount) {
                setVisibleCount(Number(storedCount));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("visibleCount", visibleCount);
        }
    }, [visibleCount]);

    const currAuthor = author.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    //   const sortedBlogs = sortBlogs(blogs);
    const sortedBlogs = sortBlogs(blogs.filter(blog => blog.author === currAuthor));

    const loadMoreBlogs = () => {
        setVisibleCount((prevCount) => prevCount + 3);
    };

    const loadLessBlogs = () => {
        setVisibleCount(13);
    };

    return (
        <section className="w-fullflex flex-col items-center justify-center">
            <div className="w-full flex justify-center">
                <h2 className="w-fit inline-block font-bold capitalize text-2xl md:text-3xl text-dark dark:text-light">
                    Featured Articles
                </h2>

            </div>

            <div className="grid grid-cols-6 lg:grid-cols-1 gap-4 mt-8">
                <AnimatePresence>
                    {sortedBlogs.slice(0, visibleCount).map((blog, index) => {
                        if (!blog.isPublished) {
                            return null;
                        } else if (blog.author !== author)
                            return (
                                <motion.article
                                    key={index}
                                    className="col-span-2 sm:col-span-1 row-span-1 relative"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <BlogLayoutTwo blog={blog} />
                                    {/* <div className="h-20 flex">{blog.author}<div>{currAuthor}</div></div> */}

                                </motion.article>
                            );
                    })}
                </AnimatePresence>
            </div>
            {sortedBlogs.length > 13 && (<div className="mt-8 flex space-x-4 z-10">
                {visibleCount < sortedBlogs.length && (
                    <button
                        onClick={loadMoreBlogs}
                        className="px-4 py-2 text-sm md:text-xs font-medium text-white bg-accent dark:bg-primary-light rounded-lg transition-transform duration-150 ease-in-out transform hover:bg-accent-dark dark:hover:bg-primary-dark active:bg-accent-darker dark:active:bg-primary-darker active:scale-95 shadow-md active:shadow-lg"
                    >
                        Load More
                    </button>
                )}
                {visibleCount > 13 && (
                    <button
                        onClick={loadLessBlogs}
                        className="px-4 py-2 text-sm md:text-xs font-medium text-white bg-accent dark:bg-primary-light rounded-lg transition-transform duration-150 ease-in-out transform hover:bg-accent-dark dark:hover:bg-primary-dark active:bg-accent-darker dark:active:bg-primary-darker active:scale-95 shadow-md active:shadow-lg"
                    >
                        Load Less
                    </button>
                )}
                {visibleCount >= sortedBlogs.length && (
                    <Link
                        href="/articles/categories/all"
                        className="px-4 py-2 text-sm md:text-xs font-medium text-white bg-accent dark:bg-primary-light rounded-lg transition-transform duration-150 ease-in-out transform hover:bg-accent-dark dark:hover:bg-primary-dark active:bg-accent-darker dark:active:bg-primary-darker active:scale-95 shadow-md active:shadow-lg"
                    >
                        View More
                    </Link>
                )}
            </div>)}
        </section>
    );
};

export default RecentPosts;
