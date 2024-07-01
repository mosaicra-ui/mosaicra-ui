import { sortBlogs } from "@/utils";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogLayoutThree from "../Blog/BlogLayoutThree";

const RecentPosts = ({ blogs }) => {
  const [visibleCount, setVisibleCount] = useState(16);

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

  const sortedBlogs = sortBlogs(blogs);

  const loadMoreBlogs = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const loadLessBlogs = () => {
    setVisibleCount(16);
  };

  return (
    <section className="w-full mt-16 sm:mt-24 md:mt-32 flex flex-col items-center justify-center">
      <div className="w-full flex justify-between">
        <h2 className="w-fit inline-block font-bold capitalize text-2xl md:text-3xl text-dark dark:text-light">
          Recent Articles
        </h2>
        <Link
          href="/categories/all"
          className="inline-block font-medium text-accent dark:text-primary-light underline underline-offset-2 text-base md:text-lg"
        >
          view all
        </Link>
      </div>

      <div className="grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-8 mt-16">
        <AnimatePresence>
          {sortedBlogs.slice(4, visibleCount).map((blog, index) => {
            if (!blog.isPublished) {
              return null;
            }
            return (
              <motion.article
                key={index}
                className="col-span-1 row-span-1 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <BlogLayoutThree blog={blog} />
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex space-x-4 z-10">
        {visibleCount < sortedBlogs.length && (
          <button
            onClick={loadMoreBlogs}
            className="px-4 py-2 text-sm md:text-xs font-medium text-white bg-accent dark:bg-primary-light rounded-lg transition-transform duration-150 ease-in-out transform hover:bg-accent-dark dark:hover:bg-primary-dark active:bg-accent-darker dark:active:bg-primary-darker active:scale-95 shadow-md active:shadow-lg"
          >
            Load More
          </button>
        )}
        {visibleCount > 16 && (
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
      </div>
    </section>
  );
};

export default RecentPosts;
