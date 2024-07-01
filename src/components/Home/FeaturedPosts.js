import { sortBlogs } from "@/utils";
import React from "react";
import BlogLayoutOne from "../Blog/BlogLayoutOne";
import BlogLayoutTwo from "../Blog/BlogLayoutTwo";

const FeaturedPosts = ({ blogs }) => {
  const sortedBlogs = sortBlogs(blogs);
  return <section className="w-full mt-16 sm:mt-14  md:mt-14">
    <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-3xl text-dark dark:text-light">Featured Articles</h2>

    <div className="grid grid-cols-6 lg:grid-cols-1 gap-4 mt-8">
      <article className="col-span-2 sm:col-span-1 row-span-1 relative">
        <BlogLayoutTwo blog={sortedBlogs[1]} />
      </article>
      <article className=" col-span-2 sm:col-span-1 row-span-1 relative">
        <BlogLayoutTwo blog={sortedBlogs[2]} />

      </article>
      <article className="col-span-2 sm:col-span-1 row-span-1 relative">
        <BlogLayoutTwo blog={sortedBlogs[3]} />

      </article>
    </div>
  </section>;
};

export default FeaturedPosts;
