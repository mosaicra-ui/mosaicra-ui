import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const BlogLayoutThree = ({ blog }) => {
  const imageUrl = `/packages${blog.url}/featured.png`;
  const defaultImageUrl = '/packages/articles/featured.png';
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
  return (
    <div className="overflow-hidden group flex flex-col items-center text-dark dark:text-light border-2 border-light-secondary dark:border-dark-secondary hover:border-bord-light hover:dark:border-bord-dark shadow-md dark:shadow-xl rounded-xl dark:bg-[#232323] bg-white h-full transition-all duration-300 ease-in-out text-sm">
      <Link href={blog.url} className="rounded-t-lg overflow-hidden bg-[#232323] w-full border-b-2 border-light-secondary dark:border-dark-secondary group-hover:border-bord-light group-hover:dark:border-bord-dark transition-all duration-300 ease-in-out">
        <Image
          src={imgSrc}
          onError={handleError}
          placeholder="blur"
          blurDataURL={imgSrc}
          alt={blog.title}
          width={width}
          height={height}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col w-full mt-4 px-2 pb-2 top-0">
        <div className="flex flex-wrap gap-2 line-clamp-1">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block uppercase text-accent dark:text-primary-light hover:text-primary-light dark:hover:text-accent font-medium text-xs "
              >
                <Link href={`/articles/categories/${tag}`} className="">{tag}</Link>
              </span>
            ))
          ) : (
            <span className="inline-block uppercase text-accent dark:text-primary-light font-medium text-xs">
              No Tag
            </span>
          )}
        </div>
        <Link href={blog.url} className="inline-block my-1">
          <h2 className="font-semibold capitalize  text-base sm:text-base">
            <span
              className="bg-gradient-to-r from-accent/50 to-accent/50  dark:from-primary-light/80
              dark:to-primary-light/80
              bg-[length:0px_2px]
              group-hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
            >
              {blog.title}
            </span>
          </h2>
        </Link>

        <span className="capitalize text-dark/65 dark:text-light/50 font-rhin text-xs montserrat">
          {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
        </span>

        <div className="text-gray dark:text-light/50 mt-2 line-clamp-3 montserrat">
          {blog.description}
        </div>
      </div>
    </div>
  );
};

export default BlogLayoutThree;
