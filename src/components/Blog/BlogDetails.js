import { format, parseISO } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { slug } from "github-slugger";
import ViewCounter from "./ViewCounter";
import Tag from "@/components/Elements/Tag";
import siteMetadata from "@/utils/siteMetaData";

const formatAuthorName = (name) => {
  return name.toLowerCase().replace(/\s+/g, '_');
}

const formatLinkAuthorName = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-');
}

const BlogDetails = ({ blog, slug: blogSlug }) => {
  const {
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

  let imageList = [siteMetadata.socialBanner];
  if (blog.image) {
    imageList =
      typeof blog.image.filePath === "string"
        ? [siteMetadata.siteUrl + blog.image.filePath.replace("../public", "")]
        : blog.image;
  }

  return (
    <div className="px-4 md:px-4 bg-[#ededed] dark:bg-[#2e2e2e] text-dark dark:text-light py-2 flex items-center justify-between flex-wrap text-sm md:text-xs font-medium rounded-lg transition-all duration-300 ease-in-out">
      <div className="flex flex-col py-2 line-clamp-1">
        <Link
          href={`../authors/${formatLinkAuthorName(blog.author)}`}
          target="_blank"
          className="flex gap-2 items-center justify-center"
        >
          <Image
            src={`/packages/authors/${formatAuthorName(blog.author)}.jpg`}
            blurDataURL={blurhashDataUrl}
            alt={blog.author}
            width={width}
            height={height}
            className="w-10 h-10 object-cover object-center rounded-full"
            priority
            sizes="100vw"
          />
          <div className="flex flex-col items-start justify-center">
            <div className="text-[10px] -my-1">Author</div>
            <div className="">{blog.author}</div>
            <div className="flex items-center justify-center gap-2 text-mini !font-thin">
              <time>• {format(parseISO(publishedAt), "LLLL d, yyyy")}</time>
              <span><ViewCounter slug={blogSlug} /></span>
              <div> • {blog.readingTime.text}</div>
            </div>
          </div>
        </Link>
      </div>
      <div id="scroll-primary-serverx2" className="space-x-2 flex  line-clamp-1 items-center justify-start overflow-x-scroll">
        <div className="flex flex-shrink-0 items-start overflow-x-auto overflow-y-hidden ">
          {tags.map((tag, index) => (
            <Tag
              key={index}
              name={tag}
              link={`/articles/categories/${slug(tag)}`}
              className="px-6 py-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
