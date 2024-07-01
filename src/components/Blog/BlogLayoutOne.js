import React, { useState } from "react";
import Tag from "../Elements/Tag";
import Link from "next/link";
import Image from "next/image";
import { slug } from "github-slugger";

const BlogLayoutOne = ({ blog }) => {
  const imageUrl = `/packages${blog.url}/featured.png`;
  const defaultImageUrl = '/packages/articles/featured.png';
  const [imgSrc, setImgSrc] = useState(imageUrl);

  const handleError = () => {
    setImgSrc(defaultImageUrl);
  };
  return (
    <div className="group inline-block overflow-hidden rounded-xl">
      <div
        className="absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-xl z-10
            "
      />
      <Image
        src={imgSrc}
        onError={handleError}
        placeholder="blur"
        blurDataURL={imgSrc}
        alt={blog.title}
        width={blog.image.width}
        height={blog.image.height}
        className="w-full h-full object-center object-cover rounded-xl group-hover:scale-105 transition-all ease duration-300"
        sizes="(max-width: 1180px) 100vw, 50vw"
      />

      <div className="w-full absolute bottom-0 p-4 xs:p-6 sm:p-10 z-20">
        <Tag link={`/articles/categories/${slug(blog.tags[0])}`} name={blog.tags[0]}
        className="px-6 text-xs  sm:text-sm py-1 sm:py-2 !border "
        />
        <Link href={blog.url} className="mt-6">
          <h2 className="font-bold capitalize text-sm xs:text-base sm:text-xl md:text-2xl text-light mt-2 sm:mt-4">
            <span
              className="bg-gradient-to-r from-accent to-accent bg-[length:0px_3px] dark:from-primary-light/50 dark:to-primary-light/50
                group-hover:bg-[length:100%_3px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {blog.title}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default BlogLayoutOne;
