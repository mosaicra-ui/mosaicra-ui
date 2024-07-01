import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const BlogLayoutTwo = ({ blog }) => {
  const [imgSrc, setImgSrc] = useState(blog ? `/packages${blog.url}/featured.png` : '/packages/articles/featured.png');

  const handleError = () => {
    setImgSrc('/packages/articles/featured.png');
  };

  if (!blog) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  const {
    url = "#",
    image = {},
    title = "Untitled",
    tags = [],
    publishedAt = new Date(),
  } = blog;

  const {
    blurhashDataUrl = "",
    width = 0,
    height = 0,
  } = image;

  return (
    <div className="group grid grid-cols-12 gap-4 items-center text-dark dark:text-light border-2 border-[#dfdfdf] dark:border-[#313131] hover:border-[#d4d4d4] hover:dark:border-[#505050] shadow-md dark:shadow-xl rounded-[14px] dark:bg-[#232323] bg-white h-full transition-all duration-300 ease-in-out">
      <Link
        href={url}
        className="col-span-12 lg:col-span-4 h-full rounded-t-xl lg:rounded-l-xl lg:rounded-none overflow-hidden border-b-2 border-[#dfdfdf] dark:border-[#313131] group-hover:border-[#d4d4d4] group-hover:dark:border-[#505050] transition-all duration-300 ease-in-out !m-0"
      >
        <Image
          src={imgSrc}
          onError={handleError}
          placeholder="blur"
          blurDataURL={blurhashDataUrl}
          alt={title}
          width={width}
          height={height}
          className="w-full h-fit lg:h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="col-span-12 lg:col-span-8 w-full h-full px-2 lg:px-0 pb-3 lg:py-2 lg:!text-sm">
        <div className="flex gap-2 line-clamp-1">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block uppercase text-accent hover:text-primary-light dark:text-primary-light hover:dark:text-accent font-medium text-sm sm:text-mini"
              >
                <Link href={`/articles/categories/${tag}`} className="hover:text-primary-light">{tag}</Link>
              </span>
            ))
          ) : (
            <span className="inline-block uppercase text-accent hover:text-primary-light dark:text-primary-light hover:dark:text-accent font-medium text-xs sm:text-sm">
              No Tag
            </span>
          )}
        </div>

        <Link href={url} className="inline-block my-1">
          <h2 className="!font-[200] capitalize text-lg lg:text-sm">
            <span
              className="bg-gradient-to-r from-accent/50 dark:from-primary-light/90 to-accent/50 dark:to-primary-light/90 bg-[length:0px_2px]
                group-hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 line-clamp-1"
            >
              {title}
            </span>
          </h2>
        </Link>

        <span className="inline-block w-full capitalize text-dark/65 dark:text-light/50 font-thin text-xs sm:text-xs montserrat">
          {format(new Date(publishedAt), "MMMM dd, yyyy")}
        </span>
      </div>
    </div>
  );
};

export default BlogLayoutTwo;
